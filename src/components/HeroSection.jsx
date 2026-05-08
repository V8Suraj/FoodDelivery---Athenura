import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dishImage from '../assets/dish.png'; // Your black dish image

const FoodDeliveryHero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [confetti, setConfetti] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [imageRotation, setImageRotation] = useState({ x: 0, y: 0 });
  const [deliveryTime, setDeliveryTime] = useState(25);
  const [orderCount, setOrderCount] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  
  //  food images
  const foodImages = [
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop", // noodles
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop", // pizza
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop", // pizza slice
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop", // burger
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop", // burger with fries
    "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=400&fit=crop", // pasta
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop", // pancakes
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop", // salad bowl
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop", // tacos
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop", // sushi
  ];
  
  const foodNames = ["Noodles 🍜", "Pizza 🍕", "Pizza Slice 🍕", "Burger 🍔", "Burger & Fries 🍟", "Pasta 🍝", "Pancakes 🥞", "Salad 🥗", "Tacos 🌮", "Sushi 🍱"];

  // Auto-rotate 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodIndex((prev) => (prev + 1) % foodImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setDeliveryTime(20);
    else if (hour < 15) setDeliveryTime(25);
    else if (hour < 20) setDeliveryTime(30);
    else setDeliveryTime(35);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setTimeout(() => setPageLoaded(true), 100);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing effect
  const phrases = ["Food", "Meals", "Delivery", "Bites"];
  useEffect(() => {
    const currentPhrase = phrases[textIndex % phrases.length];
    let timeout;
    
    if (!isDeleting && typedText !== currentPhrase) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, 100);
    } else if (!isDeleting && typedText === currentPhrase) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typedText !== "") {
      timeout = setTimeout(() => {
        setTypedText(typedText.slice(0, -1));
      }, 50);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => prev + 1);
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);
 
  useEffect(() => {
    if (isMobile) return;
    
    const handleMousemove = (e) => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
        setMousePosition({ x, y });
      }
       
      if (imageRef.current && isHoveringImage) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = ((e.clientY - centerY) / 25) * -1;
        const rotateY = ((e.clientX - centerX) / 25);
        setImageRotation({ x: rotateX, y: rotateY });
      }
    };
    
    window.addEventListener('mousemove', handleMousemove);
    return () => window.removeEventListener('mousemove', handleMousemove);
  }, [isHoveringImage, isMobile]);

  const showToast = useCallback((message, type = "success") => {
    setToastMessage({ text: message, type });
    setTimeout(() => setToastMessage(null), 2600);
  }, []);

  const handleOrderNow = (e) => {
    e.stopPropagation();
    setOrderCount(prev => prev + 1);
    showToast(`✅ Order #${orderCount + 1} confirmed! Your ${foodNames[currentFoodIndex]} will arrive in ${deliveryTime} mins 🚚`, "success");
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const sparkle = {
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        };
        setSparkles(prev => [...prev, sparkle]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
        }, 800);
      }, i * 50);
    }
  };

  const handleWatchVideoClick = (e) => {
    e.stopPropagation();
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleViewOffersClick = (e) => {
    e.stopPropagation();
    showToast("🔥 Free delivery on orders above $15! 🔥", "info");
  };

  const handleContentClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
     
    if (!hasClicked) {
      setHasClicked(true);
      showToast("🎁 SURPRISE! 25% OFF on your next order! Code: AAO25", "success");
      setConfetti(true);
      setShakeEffect(true);
      setTimeout(() => {
        setConfetti(false);
        setShakeEffect(false);
      }, 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const brandBadgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        delay: 0.5
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
        delay: 1.2
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        delay: 0.8,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 relative overflow-x-hidden"> 
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(isMobile ? 50 : 100)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, rotate: 0, opacity: 1 }}
                animate={{ y: '100vh', rotate: 360, opacity: 0 }}
                transition={{ duration: 2.5, delay: Math.random() * 2, ease: "linear" }}
                className="absolute"
                style={{
                  left: Math.random() * 100 + '%',
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: Math.random() * (isMobile ? 6 : 8) + (isMobile ? 2 : 3) + 'px',
                  height: Math.random() * (isMobile ? 6 : 8) + (isMobile ? 2 : 3) + 'px',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sparkles Effect */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ scale: 1, rotate: 180, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed pointer-events-none text-base sm:text-xl z-50"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-all text-xs sm:text-sm max-w-[90vw] text-center"
          >
            <span className="break-words">{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-[95%] sm:max-w-3xl w-full bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeVideoModal} 
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white bg-black/50 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-black/70 z-10 text-sm sm:text-base"
              >
                ✕
              </motion.button>
              <div className="aspect-video">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Video" frameBorder="0" allowFullScreen></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center p-3 sm:p-4 md:p-6 overflow-hidden" ref={heroRef}> 
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-[1]"></div>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}></div>
        </div>
         
        <div className="relative z-[2] w-full max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={pageLoaded ? "visible" : "hidden"}
            className="flex flex-col-reverse lg:flex-row justify-between items-center gap-4 sm:gap-0"
          >
            {/* Left Side Content */}
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
              <div 
                ref={contentRef}
                className={`rounded-2xl transition-all duration-300 w-full cursor-pointer relative overflow-hidden ${shakeEffect ? 'animate-shake' : ''} bg-transparent`}
                style={{
                  transform: !isMobile && isHoveringContent ? `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg) translateY(-5px)` : 'none',
                  transition: 'transform 0.1s ease-out',
                }}
                onMouseEnter={() => !isMobile && setIsHoveringContent(true)}
                onMouseLeave={() => !isMobile && setIsHoveringContent(false)}
                onClick={handleContentClick}
              > 
                {ripples.map(ripple => (
                  <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 10, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute rounded-full bg-orange-400/40 pointer-events-none"
                    style={{ left: ripple.x - 15, top: ripple.y - 15, width: 30, height: 30 }}
                  />
                ))}
                
                <div className="p-4 sm:p-5 md:p-6 relative z-10">  
                  <motion.div
                    variants={brandBadgeVariants}
                    className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-2 py-0.5 sm:px-3 sm:py-2 text-xs font-bold mb-3 sm:mb-14 shadow-lg"
                  >
                    🚚 AAO - FAST DELIVERY ⚡
                  </motion.div>
                  
                  <motion.div variants={headingVariants}>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-2 sm:mb-3">
                      Craving Something 
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                        className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
                      >
                        {" "}Delicious
                      </motion.span>?
                      <br />
                      Get{" "}
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-orange-300 inline-block min-w-[80px] sm:min-w-[100px] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                      >
                        {typedText}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        >
                          |
                        </motion.span>
                      </motion.span>
                      <br />
                      <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="text-sm sm:text-base md:text-lg font-bold block mt-1 sm:mt-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
                      >
                        Taste that travels fast! 
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        className="text-xs sm:text-sm md:text-base font-medium text-gray-200 block"
                      >
                        Happiness, delivered to your door.
                      </motion.span>
                    </h1>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-7"
                  >
                    1000+ restaurants • Under {deliveryTime} mins delivery
                  </motion.p>
                   
                  <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-12 md:gap-16 lg:gap-24 mb-3 sm:mb-7">
                    {[
                      { value: "500+", label: "Restaurants" },
                      { value: "4.8★", label: "Rating" },
                      { value: `${deliveryTime}m`, label: "Delivery" }
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        custom={i}
                        variants={statsVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/10 rounded-lg px-2 py-1 text-center flex-1 sm:flex-none"
                      >
                        <div className="text-xs sm:text-sm md:text-base font-bold text-white">{stat.value}</div>
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-300 whitespace-nowrap">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                   
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4">
                    <motion.button
                      variants={buttonVariants}
                      whileHover={!isMobile ? "hover" : {}}
                      whileTap="tap"
                      onClick={handleOrderNow}
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-1.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm shadow-lg flex-1 sm:flex-none"
                    >
                      🛒 Order Now
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover={!isMobile ? "hover" : {}}
                      whileTap="tap"
                      onClick={handleViewOffersClick}
                      className="bg-white/20 border border-white/30 text-white font-semibold py-1.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      🏷️ Offers
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover={!isMobile ? "hover" : {}}
                      whileTap="tap"
                      onClick={handleWatchVideoClick}
                      className="bg-white/20 border border-white/30 text-white font-semibold py-1.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      ▶️ Watch
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side */}
            <motion.div 
              variants={imageContainerVariants}
              className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0"
            >
              <div 
                ref={imageRef}
                className="relative cursor-pointer transition-all duration-200"
                onMouseEnter={() => !isMobile && setIsHoveringImage(true)}
                onMouseLeave={() => {
                  !isMobile && setIsHoveringImage(false);
                  !isMobile && setImageRotation({ x: 0, y: 0 });
                }}
              >
                {/* Rotating Circle Container */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 mx-auto relative">
                    {/* Original Black Dish Image (Background) */}
                    <img 
                      src={dishImage}
                      alt="Black Dish"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    
                    {/* Food Image  */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFoodIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img 
                          src={foodImages[currentFoodIndex]}
                          alt={foodNames[currentFoodIndex]}
                          className="w-full h-full object-cover rounded-full"
                          style={{
                            transform: !isMobile && isHoveringImage 
                              ? `rotateX(${imageRotation.x}deg) rotateY(${imageRotation.y}deg) scale(1.05)` 
                              : 'none',
                            transition: 'transform 0.1s ease-out'
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {/* Steam effect */}
                <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5 pointer-events-none z-20">
                  <motion.div
                    animate={{ y: -15, scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="w-0.5 h-3 sm:h-4 bg-white/60 rounded-full"
                  />
                  <motion.div
                    animate={{ y: -18, scale: 1.8, opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    className="w-0.5 h-4 sm:h-6 bg-white/50 rounded-full"
                  />
                  <motion.div
                    animate={{ y: -12, scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                    className="w-0.5 h-2 sm:h-3 bg-white/60 rounded-full"
                  />
                </div>
                
                {/* Outer ring glow */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-4 border-orange-400/30 pointer-events-none"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out;
        }
        
        @media (max-width: 640px) {
          .animate-shake {
            animation: shake 0.15s ease-in-out;
          }
        }
      `}</style>
    </div>
  );
};

export default FoodDeliveryHero;