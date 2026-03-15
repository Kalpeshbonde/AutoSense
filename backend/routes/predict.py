# backend/routes/predict.py

import pickle
import joblib
import numpy as np
import pandas as pd                # ← fixes "X does not have valid feature names" warning
from pathlib import Path
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

router   = APIRouter()
security = HTTPBearer()

BASE = Path(__file__).parent.parent / "models"

# ── Load models at startup ────────────────────────────────────────────────────
_load_error = None

try:
    scaler     = joblib.load(BASE / "scaler.pkl")
    classifier = joblib.load(BASE / "best_classifier.pkl")
    regressor  = joblib.load(BASE / "best_regressor.pkl")

    with open(BASE / "config.pkl", "rb") as f:
        config = pickle.load(f)

    FEATURE_NAMES = config["feature_names"]
    RUL_THRESHOLD = float(config["rul_threshold"])

    print(f"[EV] Models loaded ✓  features={len(FEATURE_NAMES)}  threshold={RUL_THRESHOLD:.1f}d")

except FileNotFoundError as e:
    _load_error = f"Model file not found: {e}. Place pkl files in backend/models/"
    scaler = regressor = classifier = config = None
    FEATURE_NAMES = []; RUL_THRESHOLD = 56.1
    print(f"[EV] {_load_error}")

except Exception as e:
    _load_error = str(e)
    scaler = regressor = classifier = config = None
    FEATURE_NAMES = []; RUL_THRESHOLD = 56.1
    print(f"[EV] ERROR — {_load_error}")


# ── Request schema (42 features, exact order from config.pkl) ─────────────────
class EVPredictRequest(BaseModel):
    # Raw sensors (24)
    SoC: float;  SoH: float;  Battery_Voltage: float;  Battery_Current: float
    Battery_Temperature: float;  Charge_Cycles: float
    Motor_Temperature: float;  Motor_Vibration: float
    Motor_Torque: float;  Motor_RPM: float;  Power_Consumption: float
    Brake_Pad_Wear: float;  Brake_Pressure: float;  Reg_Brake_Efficiency: float
    Tire_Pressure: float;  Tire_Temperature: float;  Suspension_Load: float
    Ambient_Temperature: float;  Ambient_Humidity: float;  Load_Weight: float
    Driving_Speed: float;  Distance_Traveled: float
    Idle_Time: float;  Route_Roughness: float
    # Derived (9)
    Battery_Power: float;  SoC_Level: float;  Motor_Power: float
    Motor_Load_Factor: float;  Energy_Efficiency: float;  Speed_Power_Ratio: float
    Weather_Index: float;  Idle_Ratio: float;  Load_Efficiency: float
    # Rolling stats (9)
    SoC_roll_mean: float;  SoC_roll_std: float;  SoC_delta: float
    Power_Consumption_roll_mean: float;  Power_Consumption_roll_std: float
    Power_Consumption_delta: float
    Driving_Speed_roll_mean: float;  Driving_Speed_roll_std: float
    Driving_Speed_delta: float


# ── Helpers ───────────────────────────────────────────────────────────────────
def risk_label(rul: float) -> str:
    if rul >= 80:  return "Healthy"
    if rul >= 56:  return "Monitor"
    if rul >= 30:  return "Need Service"
    return "Critical"


# ── POST /predict/ev ──────────────────────────────────────────────────────────
@router.post("/predict/ev")
async def predict_ev(
    payload: EVPredictRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    if regressor is None:
        raise HTTPException(status_code=503, detail=_load_error or "Models not loaded.")

    # Build DataFrame with named columns — silences LightGBM/sklearn warnings
    data = payload.dict()
    try:
        X_df = pd.DataFrame([data], columns=FEATURE_NAMES)
    except KeyError as e:
        raise HTTPException(status_code=422, detail=f"Missing feature: {e}")

    # Scale using the same named DataFrame
    X_scaled = pd.DataFrame(
        scaler.transform(X_df),
        columns=FEATURE_NAMES
    )

    rul      = float(max(0.0, round(regressor.predict(X_scaled)[0], 1)))
    risk_cls = int(classifier.predict(X_scaled)[0])

    try:
        proba      = classifier.predict_proba(X_scaled)[0]
        confidence = round(float(max(proba)) * 100, 1)
    except Exception:
        confidence = None

    return {
        "rul_days":         rul,
        "risk_label":       risk_label(rul),
        "risk_class":       risk_cls,
        "risk_class_label": "At Risk" if risk_cls == 0 else "Healthy",
        "confidence_pct":   confidence,
        "rul_threshold":    RUL_THRESHOLD,
        "reg_r2":           round(config.get("reg_r2",  0), 4),
        "clf_auc":          round(config.get("clf_auc", 0), 4),
        "model":            config.get("best_reg_model", "Stacking Ensemble"),
    }


# ── GET /predict/ev/status ────────────────────────────────────────────────────
@router.get("/predict/ev/status")
async def ev_model_status():
    return {
        "loaded":        regressor is not None,
        "error":         _load_error,
        "feature_count": len(FEATURE_NAMES),
        "rul_threshold": RUL_THRESHOLD,
    }