import React, { useState, useCallback, useEffect, useRef } from 'react';
import hero from '../assets/hero.png';
import apple from '../assets/apple.png';
import milk from '../assets/milk.avif';

const FreshDeliveryPromo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
   
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [isBlackOverlay, setIsBlackOverlay] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [imageRotation, setImageRotation] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
 
  const productImages = [
    { src: apple, name: "Fresh Apples", emoji: "🍎", tag: "Crisp & Juicy" },
    { src: milk, name: "Fresh Milk", emoji: "🥛", tag: "Rich in Calcium" } 
  ];

  const phrases = ["Groceries", "Essentials", "Fresh Food", "Daily Needs"];
  
  // Typing effect
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
    const interval = setInterval(() => {
      setIsImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
        setTimeout(() => {
          setIsImageTransitioning(false);
        }, 100);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  }, [productImages.length]);
 
  useEffect(() => {
    const handleMousemove = (e) => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
       
      if (imageRef.current && isHoveringImage) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = ((e.clientY - centerY) / 20) * -1;
        const rotateY = ((e.clientX - centerX) / 20);
        setImageRotation({ x: rotateX, y: rotateY });
      }
    };
    
    window.addEventListener('mousemove', handleMousemove);
    return () => window.removeEventListener('mousemove', handleMousemove);
  }, [isHoveringImage]);

  const showToast = useCallback((message, type = "success") => {
    setToastMessage({ text: message, type });
    setTimeout(() => setToastMessage(null), 2600);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast("✨ Welcome back to YourStore!", "success");
    setPulseEffect(true);
    setTimeout(() => setPulseEffect(false), 500);
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
    showToast("🎉 Special offers are coming soon! Stay tuned!", "info");
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
     
    setIsBlackOverlay(true);
    setTimeout(() => setIsBlackOverlay(false), 500);
     
    if (!hasClicked) {
      setHasClicked(true);
      
      //  on click for sparkles effect
      const newSparkles = [];
      for (let i = 0; i < 8; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 60,
        });
      }
      setSparkles(prev => [...prev, ...newSparkles]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.includes(s)));
      }, 800);
      
      setConfetti(true);
      setShakeEffect(true);
      showToast("🎉 SURPRISE! You're a VIP shopper! 25% off your next order!", "success");
      setTimeout(() => {
        setConfetti(false);
        setShakeEffect(false);
      }, 3000);
    }
  };

  const currentProduct = productImages[currentImageIndex];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden"> 
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(150)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 2 + 's',
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: Math.random() * 12 + 4 + 'px',
                  height: Math.random() * 12 + 4 + 'px',
                  top: '-20px'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sparkles Effect */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none text-xl animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          ✨
        </div>
      ))}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
          <i className={`fas ${toastMessage.type === 'success' ? 'fa-check-circle text-green-400' : 'fa-info-circle text-blue-400'}`}></i>
          <span className="font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Video Modal  */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeVideoModal}
        >
          <div 
            className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeVideoModal}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-all z-10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Promotional Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-600 to-green-500">
              <p className="text-white text-center font-semibold">🎬 Fresh Delivery Experience - Watch How We Deliver Happiness! 🚚</p>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      {/* <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 cursor-pointer" onClick={scrollToHero}>
              <h1 className="text-2xl font-bold text-green-600">
                <i className="fas fa-leaf mr-1"></i>YourStore
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={scrollToHero} className="text-gray-700 hover:text-green-600 transition duration-200 font-medium">Home</button>
              <button onClick={handleViewOffersClick} className="text-gray-700 hover:text-green-600 transition duration-200 font-medium">Offers</button>
              <a href="#" className="text-gray-700 hover:text-green-600 transition duration-200 font-medium">Contact</a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none text-2xl">
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          </div>
           
          {isOpen && (
            <div className="md:hidden pb-5 space-y-3 transition-all">
              <button onClick={scrollToHero} className="block w-full text-left py-2 text-gray-700 hover:text-green-600">Home</button>
              <button onClick={handleViewOffersClick} className="block w-full text-left py-2 text-gray-700 hover:text-green-600">Offers</button>
              <a href="#" className="block py-2 text-gray-700 hover:text-green-600">Contact</a>
            </div>
          )}
        </div>
      </nav> */}

      {/* Hero Section  */}
      <div className="relative w-full min-h-screen flex items-center justify-start p-5 overflow-hidden" ref={heroRef}> 
        <img 
          src={hero}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        /> 
        <div className="absolute inset-0 w-full h-full bg-black/60 z-[1]" />
         
        {isBlackOverlay && (
          <div className="absolute inset-0 w-full h-full bg-black z-[3] animate-fade-out"></div>
        )}
         
        <div className="relative z-[2] w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
            
            {/*  Left Side */}
            <div className="w-full lg:w-1/2">
              <div 
                ref={contentRef}
                className={`rounded-2xl transition-all duration-300 w-full cursor-pointer relative overflow-hidden ${shakeEffect ? 'animate-shake' : ''} backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl`}
                style={{
                  transform: isHoveringContent 
                    ? `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg) translateY(-10px)` 
                    : `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`,
                  transition: 'transform 0.1s ease-out',
                }}
                onMouseEnter={() => setIsHoveringContent(true)}
                onMouseLeave={() => setIsHoveringContent(false)}
                onClick={handleContentClick}
              > 
                {ripples.map(ripple => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/40 animate-ripple pointer-events-none"
                    style={{
                      left: ripple.x - 20,
                      top: ripple.y - 20,
                      width: 40,
                      height: 40,
                    }}
                  />
                ))}
                 
                {pulseEffect && (
                  <div className="absolute inset-0 bg-green-400/30 animate-pulse-fast pointer-events-none"></div>
                )}
                
                <div className="p-6 sm:p-8 md:p-10 relative z-10"> 
                  <div className="inline-flex items-center bg-green-500/90 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-6 hover:scale-105 transition-transform cursor-pointer">
                    🚚 FRESH DELIVERIES DAILY
                    <span className="ml-2 text-xs">✨</span>
                  </div>
                  
                  {/* Typing */}
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                    Your One Stop
                    <br />
                    For Everything You
                    <br />
                    Need:{" "}
                    <span className="text-green-300 inline-block min-w-[160px]">
                      {typedText}
                      <span className="animate-blink text-green-300">|</span>
                    </span>
                  </h2>
                  
                  <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
                    All your daily essentials, farm-fresh groceries, and home needs -
                    <br />
                    delivered right to your door within minutes.
                  </p>
                   
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="text-center transition-all duration-200 hover:scale-110">
                      <div className="text-2xl font-bold text-white flex items-center gap-1 justify-center">
                        <span>📦</span>
                        <span>10,000+</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">Products</div>
                    </div>
                    <div className="h-8 w-px bg-white/30"></div>
                    <div className="text-center transition-all duration-200 hover:scale-110">
                      <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1 justify-center">
                        <span>⭐</span>
                        <span>Premium</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">Quality</div>
                    </div>
                    <div className="h-8 w-px bg-white/30"></div>
                    <div className="text-center transition-all duration-200 hover:scale-110">
                      <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1 justify-center">
                        <span>⏱️</span>
                        <span>30-Min</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">Delivery</div>
                    </div>
                  </div>
                   
                  <div className="flex flex-wrap gap-3 justify-start">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast("Let's go shopping! Best deals waiting for you!", "success");
                      }}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 relative overflow-hidden group text-sm whitespace-nowrap"
                    >
                      <span className="relative z-10">Get Started</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewOffersClick(e);
                      }}
                      className="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-green-400 text-white hover:text-green-300 font-semibold py-2.5 px-5 rounded-full transition-all duration-200 hover:shadow-xl active:scale-95 text-sm whitespace-nowrap"
                    >
                      View Special Offers
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWatchVideoClick(e);
                      }}
                      className="group bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-green-400 text-white hover:text-green-300 font-semibold py-2.5 px-5 rounded-full transition-all duration-200 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500 group-hover:bg-green-400 flex items-center justify-center transition-all duration-200 shadow-md">
                        <i className="fas fa-play text-white text-xs ml-0.5"></i>
                      </div>
                      <span>Watch Video</span>
                    </button>
                  </div>
                  
                  {/*  Counter */}
                  <div className="mt-6 text-center">
                    <div className="text-xs text-gray-400 transition-all duration-300 hover:opacity-100" style={{ opacity: hasClicked ? 0.5 : 0.8 }}>
                      {!hasClicked && "💡 Click anywhere on the card for a VIP surprise! 💡"}
                      {hasClicked && "🎉 You're now a VIP member! Enjoy 25% off! 🎉"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rotating Image Section  */}
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <div
                ref={imageRef}
                className="relative cursor-pointer transition-all duration-200"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => {
                  setIsHoveringImage(false);
                  setImageRotation({ x: 0, y: 0 });
                }}
                style={{
                  transform: `perspective(1000px) rotateX(${imageRotation.x}deg) rotateY(${imageRotation.y}deg) scale(${isHoveringImage ? 1.05 : 1})`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="relative"> 
                  <img 
                    src={currentProduct.src}
                    alt={currentProduct.name}
                    className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain rounded-2xl transition-all duration-300 ${isImageTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    style={{
                      filter: 'drop-shadow(0 20px 15px rgba(0,0,0,0.3))',
                    }}
                  />
                  
                  {/* Floating Elements around the image */}
                  <div className="absolute -top-4 -right-4 animate-float">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg">
                      <span className="text-white text-xl">{currentProduct.emoji}</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 animate-float-delayed">
                    <div className="bg-orange-500 rounded-full p-2 shadow-lg">
                      <span className="text-white text-xl">🥬</span>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -right-6 animate-pulse-slow">
                    <div className="bg-yellow-500 rounded-full p-1 shadow-lg">
                      <span className="text-white text-sm">✨</span>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-6 animate-pulse-slow" style={{ animationDelay: '1s' }}>
                    <div className="bg-red-500 rounded-full p-1 shadow-lg">
                      <span className="text-white text-sm">❤️</span>
                    </div>
                  </div>
                  
                  {/* Progress bar*/}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32">
                    <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full animate-progress"></div>
                    </div>
                  </div>
                </div>
                 
                <div className="text-center mt-6">
                  <p className="text-white text-sm font-semibold bg-black/40 inline-block px-4 py-1 rounded-full">
                    {currentProduct.tag} {currentProduct.emoji}
                  </p>
                </div>
                
                {/* Image counter indicator */}
                <div className="flex justify-center gap-2 mt-3">
                  {productImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentImageIndex 
                          ? 'w-6 bg-green-500' 
                          : 'w-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsImageTransitioning(true);
                        setTimeout(() => {
                          setCurrentImageIndex(idx);
                          setTimeout(() => {
                            setIsImageTransitioning(false);
                          }, 100);
                        }, 200);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeOut {
          0% { opacity: 0; }
          10% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }
        
        @keyframes ripple {
          from { transform: scale(0); opacity: 0.7; }
          to { transform: scale(12); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 0.3s ease-in-out;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
        
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confettiFall 3s linear forwards;
          position: absolute;
          pointer-events: none;
        }
        
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(180deg); opacity: 0; }
        }
        .animate-sparkle {
          animation: sparkle 0.8s ease-out forwards;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s linear infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default FreshDeliveryPromo;