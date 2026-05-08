import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onCartClick, cartItemCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  const searchRef = useRef(null);
  const profileRef = useRef(null);
 
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Offers', href: '/offers' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  // Animation variants
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const searchPanelVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const profileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const cartIconVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.2, 1],
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* Top Bar  */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>MG Road, Indore - 452001</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-4" />
              </svg>
              <span>Free delivery above ₹500</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>Follow us:</span>
              <div className="flex gap-3">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-orange-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f text-sm"></i>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-orange-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram text-sm"></i>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-orange-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter text-sm"></i>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
 
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-orange-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center gap-2">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-2xl"
                >
                  🍔
                </motion.div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  FoodieExpress
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navLinkVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
 
            <div className="flex items-center gap-3">
              {/* Location */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex items-center gap-1 text-gray-700 hover:text-orange-500 text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Indore</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              {/* Search */}
              <div className="relative" ref={searchRef}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>

                {/* Search Panel -mobile */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      variants={searchPanelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={isMobile 
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md" 
                        : "absolute top-full right-0 mt-2 w-80"
                      }
                      style={isMobile ? { zIndex: 1000 } : {}}
                    >
                      {/* Mobile Overlay Background */}
                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/50"
                          onClick={() => setIsSearchOpen(false)}
                          style={{ zIndex: -1 }}
                        />
                      )}
                      
                      <div className="bg-white rounded-xl shadow-2xl border border-orange-100 overflow-hidden">
                        {/* Mobile Search Header */}
                        {isMobile && (
                          <div className="flex items-center justify-between p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                            <h3 className="text-lg font-semibold text-gray-800">Search</h3>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setIsSearchOpen(false)}
                              className="p-1 text-gray-500 hover:text-orange-500"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </motion.button>
                          </div>
                        )}
                        
                        <form onSubmit={handleSearch} className="p-4">
                          <motion.input
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            type="text"
                            placeholder="Search for restaurants or dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full px-4 py-2 bg-orange-50 text-gray-800 placeholder-gray-400 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 ${isMobile ? 'text-base py-3' : ''}`}
                            autoFocus
                          />
                          {isMobile && (
                            <motion.button
                              type="submit"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                            >
                              Search
                            </motion.button>
                          )}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`${isMobile ? 'mt-5' : 'mt-3 pt-2 border-t border-orange-100'}`}
                          >
                            <p className="text-xs text-gray-400 mb-2">Popular searches:</p>
                            <div className="flex flex-wrap gap-2">
                              {['Pizza', 'Burger', 'Biryani', 'Sushi', 'Pasta'].map((s, idx) => (
                                <motion.button
                                  key={s}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 + idx * 0.05 }}
                                  onClick={() => {
                                    setSearchQuery(s);
                                    if (isMobile) {
                                      setTimeout(() => {
                                        handleSearch(new Event('submit'));
                                      }, 100);
                                    }
                                  }} 
                                  className={`text-xs text-gray-500 hover:text-orange-500 transition-colors px-2 py-1 bg-orange-50 rounded-full hover:bg-orange-100 ${isMobile ? 'px-3 py-2 text-sm' : ''}`}
                                >
                                  {s}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      variants={profileMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-orange-100 overflow-hidden z-50"
                    >
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center"
                          >
                            <span className="text-white text-lg">👤</span>
                          </motion.div>
                          <div>
                            <p className="text-gray-800 font-medium">Guest User</p>
                            <p className="text-gray-400 text-xs">Sign in for offers</p>
                          </div>
                        </div>
                      </motion.div>
                      <div className="py-2">
                        {[
                          { to: "/profile", icon: "fa-user", label: "My Profile", color: "text-gray-600" },
                          { to: "/orders", icon: "fa-box", label: "My Orders", color: "text-gray-600" },
                          { to: "/offers", icon: "fa-tag", label: "Offers", color: "text-gray-600" }
                        ].map((item, idx) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            whileHover={{ x: 5 }}
                          >
                            <Link to={item.to} className={`flex items-center gap-3 px-4 py-2 ${item.color} hover:bg-orange-50 hover:text-orange-600 transition-colors`}>
                              <i className={`fas ${item.icon}`}></i>
                              <span>{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 }}
                          whileHover={{ x: 5 }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.button
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={cartItemCount > 0 ? "animate" : "initial"}
                variants={cartIconVariants}
              >
                <i className="fas fa-shopping-cart text-lg group-hover:scale-110 transition-transform"></i>
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <motion.svg 
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-orange-100">
                  <div className="flex flex-col space-y-3">
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 10 }}
                      >
                        <Link
                          to={link.href}
                          className="text-gray-700 hover:text-orange-500 py-2 transition-colors block"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                    {[
                      { to: "/profile", label: "My Profile" },
                      { to: "/orders", label: "My Orders" }
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navLinks.length + idx) * 0.05 }}
                        whileHover={{ x: 10 }}
                      >
                        <Link 
                          to={item.to} 
                          className="text-gray-700 hover:text-orange-500 py-2 transition-colors block" 
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;