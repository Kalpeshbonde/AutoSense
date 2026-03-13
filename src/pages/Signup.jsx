import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Battery, Mail, Lock, Eye, EyeOff, User, Building, 
  Users, ArrowRight, ArrowLeft, CheckCircle, Chrome, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2
    companyName: '',
    fleetSize: '',
    primaryUseCase: [],
    // Step 3
    agreeTerms: false,
    newsletter: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false,
  });

  // Password validation
  const validatePassword = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    validatePassword(password);
  };

  const toggleUseCase = (useCase) => {
    const current = formData.primaryUseCase;
    if (current.includes(useCase)) {
      setFormData({
        ...formData,
        primaryUseCase: current.filter((c) => c !== useCase),
      });
    } else {
      setFormData({
        ...formData,
        primaryUseCase: [...current, useCase],
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleGoogleSignup = () => {
    console.log('Google signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animated-bg opacity-30" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <Battery className="w-10 h-10 text-primary-500" />
          <span className="text-3xl font-outfit font-bold gradient-text">
            PredictMaintain
          </span>
        </Link>

        {/* Main Card */}
        <div className="glass-card p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <motion.div
                    animate={{
                      scale: currentStep === step ? 1.1 : 1,
                      backgroundColor:
                        currentStep >= step
                          ? 'rgb(0, 217, 255)'
                          : 'rgba(255, 255, 255, 0.1)',
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold relative"
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <span className={currentStep >= step ? 'text-white' : 'text-gray-500'}>
                        {step}
                      </span>
                    )}
                    {currentStep === step && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary-500 rounded-full"
                      />
                    )}
                  </motion.div>
                  {step < 3 && (
                    <div className="flex-1 h-1 mx-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: currentStep > step ? '100%' : '0%',
                        }}
                        className="h-full bg-primary-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className={currentStep >= 1 ? 'text-primary-500' : 'text-gray-500'}>
                Account
              </span>
              <span className={currentStep >= 2 ? 'text-primary-500' : 'text-gray-500'}>
                Company
              </span>
              <span className={currentStep >= 3 ? 'text-primary-500' : 'text-gray-500'}>
                Confirm
              </span>
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Account Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-outfit font-bold mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-gray-400">Get started with PredictMaintain</p>
                  </div>

                  {/* Google Signup */}
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-3 glass-card p-4 hover:bg-white/5 transition-colors group"
                  >
                    <Chrome className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    <span>Sign up with Google</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input-field pl-12"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field pl-12"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handlePasswordChange}
                        className="input-field pl-12 pr-12"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Password Strength */}
                    <div className="mt-3 space-y-2">
                      {[
                        { key: 'length', label: '8+ characters' },
                        { key: 'number', label: '1 number' },
                        { key: 'special', label: '1 special character' },
                      ].map((rule) => (
                        <div key={rule.key} className="flex items-center gap-2 text-sm">
                          <CheckCircle
                            className={`w-4 h-4 ${
                              passwordStrength[rule.key] ? 'text-success' : 'text-gray-600'
                            }`}
                          />
                          <span
                            className={
                              passwordStrength[rule.key] ? 'text-gray-300' : 'text-gray-600'
                            }
                          >
                            {rule.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        className="input-field pl-12 pr-12"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-500 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="mt-2 text-sm text-danger">Passwords don't match</p>
                      )}
                  </div>

                  <button type="button" onClick={nextStep} className="w-full btn-primary">
                    Next Step
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Company Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-outfit font-bold mb-2">
                      Tell Us About Your Fleet
                    </h2>
                    <p className="text-gray-400">Help us customize your experience</p>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="input-field pl-12"
                        placeholder="Acme Corporation"
                      />
                    </div>
                  </div>

                  {/* Fleet Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fleet Size
                    </label>
                    <select
                      required
                      value={formData.fleetSize}
                      onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select fleet size...</option>
                      <option value="1-10">1-10 vehicles</option>
                      <option value="11-50">11-50 vehicles</option>
                      <option value="51-200">51-200 vehicles</option>
                      <option value="200+">200+ vehicles</option>
                    </select>
                  </div>

                  {/* Primary Use Case */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Primary Use Case <span className="text-gray-500">(Select all that apply)</span>
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'ev', label: 'Electric Vehicles (EV)', icon: Battery },
                        { value: 'normal', label: 'Normal Vehicles', icon: Users },
                        { value: 'both', label: 'Both EV and Normal', icon: Sparkles },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.primaryUseCase.includes(option.value)
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.primaryUseCase.includes(option.value)}
                            onChange={() => toggleUseCase(option.value)}
                            className="w-5 h-5 rounded border-white/10 bg-dark-500 text-primary-500 focus:ring-2 focus:ring-primary-500/20"
                          />
                          <option.icon className="w-5 h-5 text-primary-500" />
                          <span className="flex-1">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 btn-secondary"
                    >
                      <ArrowLeft className="inline-block mr-2 w-5 h-5" />
                      Back
                    </button>
                    <button type="button" onClick={nextStep} className="flex-1 btn-primary">
                      Next Step
                      <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-outfit font-bold mb-2">
                      You're Almost There!
                    </h2>
                    <p className="text-gray-400">Review and confirm your details</p>
                  </div>

                  {/* Terms */}
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        required
                        checked={formData.agreeTerms}
                        onChange={(e) =>
                          setFormData({ ...formData, agreeTerms: e.target.checked })
                        }
                        className="mt-1 w-5 h-5 rounded border-white/10 bg-dark-500 text-primary-500 focus:ring-2 focus:ring-primary-500/20"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        I agree to the{' '}
                        <a href="#" className="text-primary-500 hover:text-primary-400">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary-500 hover:text-primary-400">
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) =>
                          setFormData({ ...formData, newsletter: e.target.checked })
                        }
                        className="mt-1 w-5 h-5 rounded border-white/10 bg-dark-500 text-primary-500 focus:ring-2 focus:ring-primary-500/20"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Send me product updates and tips (optional)
                      </span>
                    </label>
                  </div>

                  {/* Account Summary */}
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Your Account Includes:</h3>
                    {[
                      '2 ML Models (EV + Normal vehicles)',
                      'Unlimited predictions',
                      'Historical analytics dashboard',
                      'Export reports (CSV/PDF)',
                      'SHAP feature importance analysis',
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 btn-secondary"
                    >
                      <ArrowLeft className="inline-block mr-2 w-5 h-5" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.agreeTerms}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                        />
                      ) : (
                        <>
                          Create Account
                          <CheckCircle className="inline-block ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-400 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-400 transition-colors"
        >
          ← Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default Signup;
