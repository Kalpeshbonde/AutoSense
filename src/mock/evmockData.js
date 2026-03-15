// src/mock/evMockData.js
// Mock OBD2 sensor data for EV fleet — 3 vehicles: Healthy, Warning, Critical
// In production, these values stream in real-time from the OBD2 port.
// Derived/engineered features are computed in featureEngineering.js

const evMockData = [
    {
    id: "ev-001",
    carName: "Tesla Model 3",
    carCompany: "Tesla",
    year: 2022,
    status: "healthy", // used for UI badge
    lastUpdated: "2025-03-15T10:32:00Z",

    // --- Battery ---
    SoC: 82,                    // State of Charge (%)
    SoH: 94,                    // State of Health (%)
    Battery_Voltage: 396.4,     // V
    Battery_Current: -18.2,     // A (negative = discharging)
    Battery_Temperature: 28.5,  // °C
    Charge_Cycles: 187,         // count

    // --- Motor ---
    Motor_Temperature: 52.3,    // °C
    Motor_Vibration: 0.12,      // mm/s
    Motor_Torque: 142.0,        // Nm
    Motor_RPM: 3200,            // RPM
    Power_Consumption: 14.8,    // kWh/100km

    // --- Brakes ---
    Brake_Pad_Wear: 12,         // % worn
    Brake_Pressure: 2.1,        // MPa
    Reg_Brake_Efficiency: 91.2, // % regen efficiency

    // --- Tyres ---
    Tire_Pressure: 36.2,        // PSI
    Tire_Temperature: 34.1,     // °C

    // --- Suspension ---
    Suspension_Load: 420,       // kg

    // --- Environment ---
    Ambient_Temperature: 26.0,  // °C
    Ambient_Humidity: 58,       // %

    // --- Trip ---
    Load_Weight: 210,           // kg
    Driving_Speed: 68.4,        // km/h
    Distance_Traveled: 128.5,   // km
    Idle_Time: 4.2,             // min
    Route_Roughness: 0.18,      // 0–1 scale
  },

  {
    id: "ev-002",
    carName: "Tata Nexon EV",
    carCompany: "Tata",
    year: 2021,
    status: "warning",
    lastUpdated: "2025-03-15T10:28:00Z",

    // --- Battery ---
    SoC: 41,
    SoH: 74,
    Battery_Voltage: 358.1,
    Battery_Current: -31.6,
    Battery_Temperature: 41.8,
    Charge_Cycles: 512,

    // --- Motor ---
    Motor_Temperature: 74.6,
    Motor_Vibration: 0.38,
    Motor_Torque: 98.5,
    Motor_RPM: 4100,
    Power_Consumption: 19.4,

    // --- Brakes ---
    Brake_Pad_Wear: 48,
    Brake_Pressure: 2.8,
    Reg_Brake_Efficiency: 73.5,

    // --- Tyres ---
    Tire_Pressure: 31.4,
    Tire_Temperature: 46.2,

    // --- Suspension ---
    Suspension_Load: 580,

    // --- Environment ---
    Ambient_Temperature: 34.5,
    Ambient_Humidity: 72,

    // --- Trip ---
    Load_Weight: 340,
    Driving_Speed: 82.1,
    Distance_Traveled: 241.0,
    Idle_Time: 12.7,
    Route_Roughness: 0.44,
  },

  {
    id: "ev-003",
    carName: "MG ZS EV",
    carCompany: "MG Motor",
    year: 2020,
    status: "critical",
    lastUpdated: "2025-03-15T10:25:00Z",

    // --- Battery ---
    SoC: 18,
    SoH: 58,
    Battery_Voltage: 321.7,
    Battery_Current: -48.3,
    Battery_Temperature: 56.4,
    Charge_Cycles: 891,

    // --- Motor ---
    Motor_Temperature: 91.2,
    Motor_Vibration: 0.74,
    Motor_Torque: 61.0,
    Motor_RPM: 5400,
    Power_Consumption: 27.6,

    // --- Brakes ---
    Brake_Pad_Wear: 81,
    Brake_Pressure: 3.4,
    Reg_Brake_Efficiency: 51.3,

    // --- Tyres ---
    Tire_Pressure: 26.1,
    Tire_Temperature: 61.8,

    // --- Suspension ---
    Suspension_Load: 710,

    // --- Environment ---
    Ambient_Temperature: 38.2,
    Ambient_Humidity: 85,

    // --- Trip ---
    Load_Weight: 460,
    Driving_Speed: 94.7,
    Distance_Traveled: 389.2,
    Idle_Time: 22.3,
    Route_Roughness: 0.71,
  },
];

export default evMockData;