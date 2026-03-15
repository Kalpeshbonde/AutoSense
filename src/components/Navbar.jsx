import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Battery, Home, Activity, BarChart3, History, Settings, 
  Bell, User, LogOut, Menu, X, Sun, Moon, ChevronDown, Clock, CheckCircle
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme toggle state (for future light mode implementation)
  const [darkMode, setDarkMode] = useState(true);
  
  // User dropdown menu state
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Notifications dropdown state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Navbar styling changes on scroll
  const [scrolled, setScrolled] = useState(false);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Effect 1: Handle scroll behavior for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect 2: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Effect 3: Close dropdowns when clicking outside (accessibility)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen || notificationsOpen) {
        // Close menus if clicked outside
        const target = event.target;
        if (!target.closest('.user-menu') && !target.closest('.notifications-menu')) {
          setUserMenuOpen(false);
          setNotificationsOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen, notificationsOpen]);

  // ============================================================================
  // DATA CONFIGURATION
  // ============================================================================
  
  // Navigation items - Main menu links
  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: Home,
      description: 'Fleet overview'
    },
    { 
      path: '/predict', 
      label: 'Predict', 
      icon: Activity,
      description: 'Run predictions',
      // Submenu for different prediction types
      submenu: [
        { path: '/predict/ev', label: 'EV Battery', icon: Battery },
        { path: '/predict/normal', label: 'Normal Vehicle', icon: Activity },
      ]
    },
    { 
      path: '/history', 
      label: 'History', 
      icon: History,
      description: 'Past predictions'
    },
    { 
      path: '/analytics', 
      label: 'Analytics', 
      icon: BarChart3,
      description: 'Insights & reports'
    },
  ];

  // Mock notifications - Replace with real API data in production
  const notifications = [
    { 
      id: 1, 
      type: 'warning', 
      title: 'Battery Low Alert',
      message: 'Vehicle #EV-1234 needs attention',
      time: '5m ago',
      icon: Battery,
      color: 'warning'
    },
    { 
      id: 2, 
      type: 'success', 
      title: 'Prediction Complete',
      message: 'Batch analysis finished',
      time: '1h ago',
      icon: CheckCircle,
      color: 'success'
    },
  ];

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  // Logout handler - Clears token and redirects to homepage
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close mobile menu when navigating
  const handleMobileNavClick = (hasSubmenu) => {
    if (!hasSubmenu) {
      setMobileMenuOpen(false);
    }
  };

  // Toggle notification dropdown
  const handleNotificationToggle = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false); // Close user menu if open
  };

  // Toggle user menu dropdown
  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false); // Close notifications if open
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <>
      {/* ====================================================================
          MAIN NAVBAR - Fixed position, glassmorphic design
          - Changes style on scroll for better visibility
          - Responsive padding and spacing
          ==================================================================== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-card mx-2 md:mx-4 mt-2 md:mt-4 px-3 md:px-6 py-2 shadow-2xl' 
            : 'bg-dark-600/80 backdrop-blur-xl px-3 md:px-6 py-2 md:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            
            {/* ================================================================
                LOGO SECTION - Brand identity with animated battery icon
                ================================================================ */}
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 md:gap-3 group relative"
            >
              <div className="relative">
                {/* Animated Battery Icon - Subtle rotation effect */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Battery className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-primary-500 group-hover:text-primary-400 transition-colors" />
                </motion.div>
                
                {/* Pulsing Glow Effect - Desktop only for performance */}
                <motion.div
                  className="hidden md:block absolute inset-0 bg-primary-500/30 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                />
              </div>
              
              {/* Brand Name and Tagline */}
              <div>
                <span className="text-lg md:text-xl lg:text-2xl font-outfit font-bold gradient-text">
                  AutoSense
                </span>
                {/* Tagline - Hidden on small screens */}
                <span className="text-xs text-gray-500 hidden xl:block">
                  AI-Powered Fleet Management
                </span>
              </div>
            </Link>

            {/* ================================================================
                DESKTOP NAVIGATION - Horizontal menu for large screens
                - Hidden on mobile (< 1024px)
                - Shows on desktop (lg:flex)
                ================================================================ */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                
                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={!hasSubmenu ? item.path : '#'}
                      onClick={(e) => hasSubmenu && e.preventDefault()}
                      className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-xl transition-all relative overflow-hidden ${
                        isActive
                          ? 'text-primary-400'
                          : 'text-gray-400 hover:text-primary-500'
                      }`}
                    >
                      {/* Hover Background Glow */}
                      <motion.div
                        className="absolute inset-0 bg-primary-500/10 rounded-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Icon */}
                      <item.icon className="w-4 h-4 xl:w-5 xl:h-5 relative z-10" />
                      
                      {/* Label & Description */}
                      <div className="relative z-10">
                        <div className="font-medium text-sm xl:text-base">{item.label}</div>
                        {/* Description - Only on extra large screens */}
                        <div className="text-xs text-gray-500 hidden 2xl:block">
                          {item.description}
                        </div>
                      </div>
                      
                      {/* Dropdown Indicator for submenu items */}
                      {hasSubmenu && (
                        <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 relative z-10 transition-transform group-hover:rotate-180" />
                      )}
                      
                      {/* Active Tab Indicator - Animated bottom line */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                    
                    {/* Dropdown Submenu - Appears on hover */}
                    {hasSubmenu && (
                      <div className="absolute top-full mt-2 left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                        <div className="glass-card p-2 min-w-[200px] shadow-xl">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.path}
                              to={subitem.path}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                            >
                              <subitem.icon className="w-4 h-4 text-primary-500" />
                              <span className="text-gray-300">{subitem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ================================================================
                RIGHT SIDE ACTIONS - Theme, Notifications, User Menu, Mobile Toggle
                - Always visible, scales responsively
                ================================================================ */}
            <div className="flex items-center gap-2 md:gap-3">
              
              {/* ==============================================================
                  THEME TOGGLE - Switch between light/dark mode
                  - Hidden on small mobile screens to save space
                  ============================================================== */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="hidden sm:flex w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 items-center justify-center transition-colors relative overflow-hidden"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* ==============================================================
                  NOTIFICATIONS BUTTON - Shows notification dropdown
                  - Includes badge with notification count
                  ============================================================== */}
              <div className="relative notifications-menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNotificationToggle}
                  className="relative w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  
                  {/* Notification Count Badge */}
                  {notifications.length > 0 && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-danger rounded-full flex items-center justify-center text-xs font-bold"
                    >
                      {notifications.length}
                    </motion.span>
                  )}
                </motion.button>

                {/* Notifications Dropdown Panel */}
                <AnimatePresence>
                  {notificationsOpen && (
                    <>
                      {/* Mobile backdrop - close on click */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setNotificationsOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/20 z-40"
                      />
                      
                      {/* Dropdown content */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 sm:w-80 glass-card p-3 md:p-4 max-h-96 overflow-y-auto custom-scrollbar z-50"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <h3 className="font-outfit font-bold text-base md:text-lg">Notifications</h3>
                          <button className="text-xs text-primary-500 hover:text-primary-400 transition-colors">
                            Mark all read
                          </button>
                        </div>

                        {/* Notification List */}
                        {notifications.length > 0 ? (
                          <div className="space-y-2">
                            {notifications.map((notif, index) => (
                              <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  {/* Notification Icon */}
                                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-${notif.color}/10 flex items-center justify-center flex-shrink-0`}>
                                    <notif.icon className={`w-4 h-4 md:w-5 md:h-5 text-${notif.color}`} />
                                  </div>
                                  {/* Notification Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-xs md:text-sm">{notif.title}</div>
                                    <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">{notif.message}</div>
                                    <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {notif.time}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No new notifications</p>
                          </div>
                        )}

                        {/* Footer */}
                        <button className="w-full mt-3 md:mt-4 text-xs md:text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors">
                          View all notifications
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* ==============================================================
                  USER MENU - Avatar with dropdown menu
                  - Shows user info and settings
                  - Hidden on mobile < sm, visible on sm+
                  ============================================================== */}
              <div className="relative user-menu hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUserMenuToggle}
                  className="flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="User menu"
                >
                  {/* User Avatar */}
                  <div className="relative">
                    <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg md:rounded-xl flex items-center justify-center">
                      <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    {/* Online Status Indicator */}
                    <span className="absolute bottom-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-success rounded-full border-2 border-dark-600" />
                  </div>
                  
                  {/* User Info - Hidden on smaller screens */}
                  <div className="hidden md:block text-left">
                    <div className="text-xs md:text-sm font-semibold">{user?.name || 'User'}</div>
                    <div className="text-xs text-gray-500">{user?.email || ''}</div>
                  </div>
                  
                  {/* Dropdown Arrow - Hidden on mobile */}
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400 hidden md:block" />
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      {/* Mobile backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setUserMenuOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/20 z-40"
                      />
                      
                      {/* Dropdown content */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 md:w-64 glass-card p-2 z-50"
                      >
                        {/* User Information */}
                        <div className="px-3 md:px-4 py-2 md:py-3 border-b border-white/10 mb-2">
                          <div className="font-semibold text-sm md:text-base">{user?.name || 'User'}</div>
                          <div className="text-xs md:text-sm text-gray-400 truncate">{user?.email || ''}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="badge-success text-xs">Pro Plan</span>
                            <span className="text-xs text-gray-500">• 1 vehicles</span>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                        >
                          <User className="w-4 h-4 text-primary-500" />
                          <span>Profile Settings</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                        >
                          <Settings className="w-4 h-4 text-primary-500" />
                          <span>Preferences</span>
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-white/10 my-2" />

                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-danger/10 text-danger transition-colors text-sm"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* ==============================================================
                  MOBILE MENU TOGGLE - Hamburger button for mobile navigation
                  - Visible only on mobile (< 1024px)
                  - Triggers slide-in menu
                  ============================================================== */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ====================================================================
          MOBILE MENU - Full-height slide-in panel for mobile navigation
          - Slides in from right on mobile
          - Includes all nav items, submenu, and user actions
          - Backdrop overlay to close menu
          ==================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay - Click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm glass-card z-50 lg:hidden overflow-y-auto custom-scrollbar"
            >
              <div className="p-4 md:p-6">
                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <Battery className="w-7 h-7 md:w-8 md:h-8 text-primary-500" />
                  <span className="text-lg md:text-xl font-outfit font-bold gradient-text">
                    AutoSense
                  </span>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1 md:space-y-2 mb-6">
                  {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                      <div key={item.path}>
                        {/* Main Nav Item */}
                        <Link
                          to={item.path}
                          onClick={() => handleMobileNavClick(item.submenu)}
                          className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-primary-500/10 text-primary-500'
                              : 'text-gray-400 hover:text-primary-500 hover:bg-white/5'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="font-medium text-sm md:text-base">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </Link>

                        {/* Submenu Items */}
                        {item.submenu && (
                          <div className="ml-3 md:ml-4 mt-1 md:mt-2 space-y-1">
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm text-gray-400 hover:text-primary-500 hover:bg-white/5 transition-colors"
                              >
                                <sub.icon className="w-4 h-4" />
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* User Info Section - Always visible in mobile menu */}
                <div className="border-t border-white/10 pt-4 md:pt-6">
                  <div className="flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">{user?.name || 'User'}</div>
                      <div className="text-xs md:text-sm text-gray-400">{user?.email || ''}</div>
                    </div>
                  </div>

                  {/* Mobile Menu Actions */}
                  <div className="mt-3 md:mt-4 space-y-1 md:space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-danger/10 text-danger transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
