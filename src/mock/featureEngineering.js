// src/mock/featureEngineering.js
// Builds the exact 42-feature vector the scaler + models expect.
// ORDER IS CRITICAL — must match config.pkl feature_names exactly.

export function buildFeatureVector(car) {
  const {
    SoC, SoH, Battery_Voltage, Battery_Current, Battery_Temperature,
    Charge_Cycles, Motor_Temperature, Motor_Vibration, Motor_Torque,
    Motor_RPM, Power_Consumption, Brake_Pad_Wear, Brake_Pressure,
    Reg_Brake_Efficiency, Tire_Pressure, Tire_Temperature, Suspension_Load,
    Ambient_Temperature, Ambient_Humidity, Load_Weight, Driving_Speed,
    Distance_Traveled, Idle_Time, Route_Roughness,
  } = car;

  // ── Derived features (computed from raw) ──────────────────────────────────
  const Battery_Power     = (Battery_Voltage * Math.abs(Battery_Current)) / 1000;  // kW
  const SoC_Level         = SoC / 100;
  const Motor_Power       = (Motor_Torque * Motor_RPM) / 9549;                     // kW
  const Motor_Load_Factor = Motor_Power > 0 ? Motor_Torque / (Motor_Power + 1) : 0;
  const Energy_Efficiency = Power_Consumption > 0 ? Driving_Speed / Power_Consumption : 0;
  const Speed_Power_Ratio = Battery_Power > 0 ? Driving_Speed / Battery_Power : 0;
  const Weather_Index     = (Ambient_Temperature / 50) * 0.6 + (Ambient_Humidity / 100) * 0.4;
  const Idle_Ratio        = Distance_Traveled > 0 ? Idle_Time / (Distance_Traveled + 1) : 0;
  const Load_Efficiency   = Load_Weight > 0 ? Energy_Efficiency / (Load_Weight / 100) : 0;

  // ── Rolling stats (single snapshot for demo) ─────────────────────────────
  // In production: pass a window of recent readings and compute real stats.
  const SoC_roll_mean               = SoC;
  const SoC_roll_std                = 0;
  const SoC_delta                   = 0;
  const Power_Consumption_roll_mean = Power_Consumption;
  const Power_Consumption_roll_std  = 0;
  const Power_Consumption_delta     = 0;
  const Driving_Speed_roll_mean     = Driving_Speed;
  const Driving_Speed_roll_std      = 0;
  const Driving_Speed_delta         = 0;

  // ── EXACT ORDER matching config.pkl feature_names (42 total) ─────────────
  return {
    // Raw sensors (24)
    SoC, SoH, Battery_Voltage, Battery_Current, Battery_Temperature,
    Charge_Cycles, Motor_Temperature, Motor_Vibration, Motor_Torque,
    Motor_RPM, Power_Consumption, Brake_Pad_Wear, Brake_Pressure,
    Reg_Brake_Efficiency, Tire_Pressure, Tire_Temperature, Suspension_Load,
    Ambient_Temperature, Ambient_Humidity, Load_Weight, Driving_Speed,
    Distance_Traveled, Idle_Time, Route_Roughness,
    // Derived (9) — in this exact order:
    Battery_Power, SoC_Level, Motor_Power, Motor_Load_Factor,
    Energy_Efficiency, Speed_Power_Ratio, Weather_Index, Idle_Ratio, Load_Efficiency,
    // Rolling stats (9)
    SoC_roll_mean, SoC_roll_std, SoC_delta,
    Power_Consumption_roll_mean, Power_Consumption_roll_std, Power_Consumption_delta,
    Driving_Speed_roll_mean, Driving_Speed_roll_std, Driving_Speed_delta,
  };
}

// ── UI helpers ────────────────────────────────────────────────────────────────

export function getRiskLevel(rul) {
  if (rul >= 80)  return { label: "Healthy",       color: "green"  };
  if (rul >= 56)  return { label: "Monitor",        color: "amber"  };
  if (rul >= 30)  return { label: "Need Service",   color: "orange" };
  return                  { label: "Critical",      color: "red"    };
}

export function getSectionHealth(car) {
  return {
    battery: Math.round(
      car.SoH * 0.4 +
      (100 - Math.min((car.Battery_Temperature / 60) * 100, 100)) * 0.3 +
      (100 - Math.min((car.Charge_Cycles / 1000) * 100, 100)) * 0.3
    ),
    motor: Math.round(
      (100 - Math.min((car.Motor_Temperature / 100) * 100, 100)) * 0.4 +
      (100 - Math.min((car.Motor_Vibration / 1.0) * 100, 100)) * 0.6
    ),
    brakes: Math.round(
      (100 - car.Brake_Pad_Wear) * 0.5 +
      car.Reg_Brake_Efficiency * 0.5
    ),
    tyres: Math.round(
      Math.min((car.Tire_Pressure / 38) * 100, 100) * 0.5 +
      (100 - Math.min((car.Tire_Temperature / 70) * 100, 100)) * 0.5
    ),
    suspension: Math.round(
      100 - Math.min((car.Suspension_Load / 800) * 100, 100)
    ),
  };
}