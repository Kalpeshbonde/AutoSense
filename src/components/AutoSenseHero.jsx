import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";

// ============================================================================
// SVG CAR COMPONENTS
// - Custom SVG illustrations for Engine and EV vehicles
// - Optimized with shadows and gradients
// ============================================================================

const EngCar = () => (
  <svg
    viewBox="0 0 240 90"
    fill="none"
    className="w-full max-w-[240px] drop-shadow-[0_6px_20px_rgba(245,158,11,0.3)]"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="86" rx="105" ry="5" fill="rgba(245,158,11,.12)" />
    
    {/* Body */}
    <rect 
      x="12" y="46" width="216" height="34" rx="9" 
      fill="rgba(245,158,11,.12)" 
      stroke="#f59e0b" 
      strokeWidth="1.7" 
    />
    
    {/* Windshield */}
    <path 
      d="M50 46 Q60 16 86 12 L168 12 Q188 15 200 46Z" 
      fill="rgba(255,255,255,.06)" 
      stroke="#f59e0b" 
      strokeWidth="1.6" 
    />
    
    {/* Interior glass */}
    <path 
      d="M60 44 Q68 20 88 17 L164 17 Q180 20 188 44Z" 
      fill="rgba(245,158,11,.1)" 
    />
    
    {/* Divider */}
    <line 
      x1="128" y1="17" x2="128" y2="44" 
      stroke="#f59e0b" 
      strokeWidth="1" 
      opacity=".3" 
    />
    
    {/* Headlight */}
    <ellipse 
      cx="215" cy="57" rx="7" ry="4.5" 
      fill="#fef3c7" 
      stroke="#f59e0b" 
      strokeWidth="1.2" 
    />
    
    {/* Taillight */}
    <ellipse 
      cx="25" cy="59" rx="6" ry="4" 
      fill="#fca5a5" 
      stroke="#f87171" 
      strokeWidth="1" 
    />
    
    {/* Bumper detail */}
    <rect 
      x="5" y="70" width="10" height="4" rx="1.2" 
      fill="#f59e0b" 
      opacity=".3" 
    />
    
    {/* Front Wheel */}
    <circle cx="64" cy="82" r="13" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.8" />
    <circle cx="64" cy="82" r="6" fill="rgba(245,158,11,.18)" stroke="#f59e0b" strokeWidth="1.2" />
    <circle cx="64" cy="82" r="2.5" fill="#f59e0b" />
    
    {/* Rear Wheel */}
    <circle cx="174" cy="82" r="13" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.8" />
    <circle cx="174" cy="82" r="6" fill="rgba(245,158,11,.18)" stroke="#f59e0b" strokeWidth="1.2" />
    <circle cx="174" cy="82" r="2.5" fill="#f59e0b" />
  </svg>
);

const EvCar = () => (
  <svg
    viewBox="0 0 240 90"
    fill="none"
    className="w-full max-w-[240px] drop-shadow-[0_6px_20px_rgba(56,189,248,0.3)]"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="86" rx="105" ry="5" fill="rgba(56,189,248,.12)" />
    
    {/* Body */}
    <rect 
      x="10" y="50" width="220" height="30" rx="8" 
      fill="rgba(56,189,248,.1)" 
      stroke="#38bdf8" 
      strokeWidth="1.7" 
    />
    
    {/* Windshield */}
    <path 
      d="M44 50 Q56 14 90 10 L172 10 Q196 13 208 50Z" 
      fill="rgba(255,255,255,.06)" 
      stroke="#38bdf8" 
      strokeWidth="1.6" 
    />
    
    {/* Interior glass */}
    <path 
      d="M56 48 Q66 18 92 14 L168 14 Q188 18 196 48Z" 
      fill="rgba(56,189,248,.12)" 
    />
    
    {/* Divider */}
    <line 
      x1="130" y1="14" x2="130" y2="48" 
      stroke="#38bdf8" 
      strokeWidth="1" 
      opacity=".28" 
    />
    
    {/* Headlight */}
    <rect 
      x="212" y="52" width="16" height="3" rx="1.5" 
      fill="#7dd3fc" 
      stroke="#38bdf8" 
      strokeWidth=".8" 
    />
    
    {/* Taillight */}
    <rect 
      x="12" y="58" width="11" height="3" rx="1.5" 
      fill="#fca5a5" 
      stroke="#f87171" 
      strokeWidth=".8" 
      opacity=".8" 
    />
    
    {/* Charging port */}
    <rect 
      x="212" y="57" width="5" height="7" rx="1.2" 
      fill="rgba(56,189,248,.3)" 
      stroke="#38bdf8" 
      strokeWidth=".8" 
    />
    
    {/* Front Wheel */}
    <circle cx="64" cy="81" r="13" fill="#0f1f3d" stroke="#38bdf8" strokeWidth="1.8" />
    <circle cx="64" cy="81" r="6" fill="rgba(56,189,248,.15)" stroke="#38bdf8" strokeWidth="1.2" />
    <circle cx="64" cy="81" r="2.5" fill="#38bdf8" />
    
    {/* Rear Wheel */}
    <circle cx="174" cy="81" r="13" fill="#0f1f3d" stroke="#38bdf8" strokeWidth="1.8" />
    <circle cx="174" cy="81" r="6" fill="rgba(56,189,248,.15)" stroke="#38bdf8" strokeWidth="1.2" />
    <circle cx="174" cy="81" r="2.5" fill="#38bdf8" />
    
    {/* Electric icon */}
    <text 
      x="120" y="36" 
      fontFamily="sans-serif" 
      fontSize="12" 
      fill="#38bdf8" 
      opacity=".28" 
      textAnchor="middle"
    >
      ⚡
    </text>
  </svg>
);

// ============================================================================
// SUB-COMPONENTS
// - Reusable UI elements for the panels
// ============================================================================

/**
 * PulsingDot - Animated status indicator
 * @param {string} color - Dot color (CSS color value)
 */
const PulsingDot = ({ color }) => (
  <motion.span
    className="inline-block w-1.5 h-1.5 rounded-full"
    style={{ background: color }}
    animate={{
      boxShadow: [
        `0 0 0 0 ${color}88`,
        `0 0 0 8px transparent`,
        `0 0 0 0 ${color}88`,
      ],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/**
 * SpecPill - Technology badge/tag
 * @param {string} label - Badge text
 * @param {string} accent - Accent color
 */
const SpecPill = ({ label, accent }) => (
  <span
    className="font-mono text-[0.52rem] tracking-wider uppercase px-2.5 py-1 rounded-full border"
    style={{
      borderColor: `${accent}55`,
      color: accent,
      background: `${accent}18`,
    }}
  >
    {label}
  </span>
);

/**
 * Metric - Statistical display
 * @param {string} val - Main value
 * @param {string} unit - Unit of measurement
 * @param {string} label - Description label
 */
const Metric = ({ val, unit, label }) => (
  <div>
    <div className="font-mono text-xl md:text-2xl font-bold leading-none text-white">
      {val}
      <span className="text-[68%] opacity-70">{unit}</span>
    </div>
    <div className="text-[0.6rem] text-white/30 mt-1">{label}</div>
  </div>
);

// ============================================================================
// VEHICLE PANEL COMPONENT
// - Individual panel for Engine or EV
// - Includes all styling, animations, and content
// ============================================================================

/**
 * VehiclePanel - Single vehicle type display panel
 * @param {string} variant - "engine" or "ev"
 */
const VehiclePanel = ({ variant }) => {
  const isEngine = variant === "engine";

  // Configuration object for each variant
  const cfg = {
    engine: {
      // Styling
      bgGradient: "from-[#1a2332] via-[#1e2d42] to-[#22334d]",
      borderClass: "border-r border-white/[0.06]",
      accent: "#f59e0b",
      accentText: "#fcd34d",
      
      // Gradient orbs (background decoration)
      orb1: "top-[-100px] left-[-80px] w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(245,158,11,0.2)_0%,transparent_65%)]",
      orb2: "bottom-[20px] right-[-40px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(251,191,36,0.12)_0%,transparent_65%)]",
      
      // Content
      icon: Activity,
      eyeLabel: "Engine Intelligence",
      title: ["BiLSTM", "Engine Health"],
      desc: "Deep learning on 8 OBD-2 sensors. Attention layers pinpoint failure signatures up to 72 hrs early.",
      car: <EngCar />,
      specs: ["BiLSTM + Attention", "8 Sensors", "AUC 0.99", "Real-time"],
      metrics: [
        { val: "99", unit: "%", label: "AUC Score" },
        { val: "72", unit: "h", label: "Early Warning" },
        { val: "8", unit: "", label: "Sensors" },
      ],
      footer: "Petrol · Diesel · Combustion Engines",
    },
    ev: {
      // Styling
      bgGradient: "from-[#0f1f3d] via-[#152847] to-[#1a3058]",
      borderClass: "",
      accent: "#38bdf8",
      accentText: "#7dd3fc",
      
      // Gradient orbs
      orb1: "top-[-100px] right-[-80px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,transparent_65%)]",
      orb2: "bottom-[20px] left-[-30px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(125,211,252,0.12)_0%,transparent_65%)]",
      
      // Content
      icon: Zap,
      eyeLabel: "Battery Intelligence",
      title: ["Stacking", "Ensemble RUL"],
      desc: "XGBoost · LightGBM · CatBoost stacked ensemble predicts remaining battery life across 42 features.",
      car: <EvCar />,
      specs: ["XGB · LGBM · CatBoost", "42 Features", "R² 0.9416"],
      metrics: [
        { val: "0.94", unit: "R²", label: "Accuracy" },
        { val: "42", unit: "", label: "Features" },
        { val: "3", unit: "×", label: "Models" },
      ],
      footer: "Battery-Electric · Hybrid · EV Vehicles",
    },
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: isEngine ? 0 : 0.2 }}
      className={`
        relative overflow-hidden 
        p-8 md:p-12 lg:p-14
        flex flex-col gap-6 md:gap-8
        min-h-[420px]
        bg-gradient-to-br ${cfg.bgGradient}
        ${cfg.borderClass}
        flex-1
      `}
    >
      {/* ====================================================================
          GRID OVERLAY - Subtle background pattern
          ==================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ====================================================================
          GRADIENT ORBS - Decorative background elements
          ==================================================================== */}
      <div className={`absolute rounded-full blur-[72px] pointer-events-none ${cfg.orb1}`} />
      <div className={`absolute rounded-full blur-[72px] pointer-events-none ${cfg.orb2}`} />

      {/* ====================================================================
          BRAND HEADER
          ==================================================================== */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-none text-white">
          Auto<span style={{ color: cfg.accent }}>Sense</span>
        </h1>
        <p className="font-mono text-[0.47rem] tracking-[0.2em] uppercase text-white/25 mt-1.5">
          AI Vehicle Intelligence
        </p>
      </div>

      {/* ====================================================================
          MAIN CONTENT BODY
          ==================================================================== */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Status indicator with label */}
        <div
          className="font-mono text-[0.52rem] tracking-[0.17em] uppercase flex items-center gap-2 mb-3.5"
          style={{ color: cfg.accent }}
        >
          <PulsingDot color={cfg.accent} />
          {cfg.eyeLabel}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-[1.85rem] font-extrabold tracking-tight leading-tight text-white mb-2">
          {cfg.title[0]}
          <br />
          {cfg.title[1]}
        </h2>

        {/* Description */}
        <p className="text-xs md:text-sm text-white/40 leading-relaxed max-w-xs mb-5">
          {cfg.desc}
        </p>

        {/* Car SVG illustration */}
        <div className="my-2 mb-5">{cfg.car}</div>

        {/* Technology spec badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {cfg.specs.map((s) => (
            <SpecPill key={s} label={s} accent={cfg.accentText} />
          ))}
        </div>

        {/* Metrics row */}
        <div className="flex gap-5 md:gap-6">
          {cfg.metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>
      </div>

      {/* ====================================================================
          FOOTER - Vehicle type information
          ==================================================================== */}
      <div className="relative z-10 pt-4 border-t border-white/[0.07] text-xs md:text-sm text-white/50 font-medium">
        {cfg.footer}
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT EXPORT
// - Renders both Engine and EV panels
// - Responsive: stacks on mobile, side-by-side on desktop
// ============================================================================

export default function AutoSenseHero() {
  return (
    <div className="flex flex-col lg:flex-row w-full font-sans">
      {/* Engine Panel */}
      <VehiclePanel variant="engine" />
      
      {/* EV Panel */}
      <VehiclePanel variant="ev" />
    </div>
  );
}