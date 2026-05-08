import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import leaf from "../assets/leaf.png";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUp,
} from "lucide-react";

export default function RestaurantFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    "Starters",
    "Main Course",
    "Beverages",
    "Desserts",
    "Combo Meals",
    "Chef's Special"
  ];

  const exploreItems = [
    "Home",
    "About Us",
    "Menu",
    "Special Offers",
    "Gallery",
    "Contact Us"
  ];
 
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: 0.6
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      color: "#d4a24c",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 12
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 5,
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

  const scrollButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
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

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerVariants}
      className="bg-black text-white w-full relative overflow-hidden"
    >
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
      ></motion.div>

      {/* leaf Image */}
      <motion.img
        src={leaf}
        alt="basil"
        initial={{ opacity: 0, x: 100, rotate: 45 }}
        whileInView={{ opacity: 0.9, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        className="absolute top-0 right-0 w-32 opacity-90"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16"> 
        <div className="flex flex-col lg:flex-row lg:flex-nowrap flex-wrap gap-8 lg:gap-12">
           
          <motion.div 
            variants={logoVariants}
            className="lg:w-1/4 w-full"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-serif font-bold leading-none"
            >
              Flavoria
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="tracking-[8px] text-[#d4a24c] text-lg mt-2"
            >
              RESTAURANT
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl md:text-3xl italic font-light mt-6"
            >
              Good Food, Great Mood
            </motion.p>
            <motion.div 
              variants={lineVariants}
              className="flex items-center mt-4"
            >
              <div className="w-16 h-[2px] bg-[#d4a24c]"></div>
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-2 h-2 rounded-full bg-[#d4a24c] mx-2"
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                className="w-2 h-2 rounded-full bg-[#d4a24c]"
              />
            </motion.div>
          </motion.div>
 
          <motion.div 
            variants={itemVariants}
            className="lg:w-[15%] w-full"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#d4a24c] text-xl md:text-2xl font-serif font-semibold"
            >
              EXPLORE
            </motion.h2>
            <motion.div 
              variants={lineVariants}
              className="w-12 h-[2px] bg-[#d4a24c] mt-2 mb-5"
            />
            <ul className="space-y-3 text-base md:text-lg">
              {exploreItems.map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  className="cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
 
          <motion.div 
            variants={itemVariants}
            className="lg:w-[30%] w-full"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[#d4a24c] text-xl md:text-2xl font-serif font-semibold"
            >
              OUR MENU
            </motion.h2>
            <motion.div 
              variants={lineVariants}
              className="w-12 h-[2px] bg-[#d4a24c] mt-2 mb-5"
            /> 
            <div className="flex flex-wrap gap-6 text-base md:text-lg">
              {menuItems.map((item, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  className="cursor-pointer whitespace-nowrap"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
 
          <motion.div 
            variants={itemVariants}
            className="lg:w-[30%] w-full"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#d4a24c] text-xl md:text-2xl font-serif font-semibold"
            >
              CONTACT US
            </motion.h2>
            <motion.div 
              variants={lineVariants}
              className="w-12 h-[2px] bg-[#d4a24c] mt-2 mb-5"
            />
            
            <div className="space-y-4 text-base md:text-lg">
              <motion.div 
                custom={0}
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <MapPin className="text-[#d4a24c] mt-1 flex-shrink-0" size={20} />
                <p className="leading-relaxed">
                  123, Foodie Street,
                  <br />
                  Mumbai, India - 400001
                </p>
              </motion.div>

              <motion.div 
                custom={1}
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Phone className="text-[#d4a24c] flex-shrink-0" size={20} />
                <motion.p 
                  whileHover={{ x: 5 }}
                  className="group-hover:text-[#d4a24c] transition-colors"
                >
                  +91 98765 43210
                </motion.p>
              </motion.div>

              <motion.div 
                custom={2}
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Mail className="text-[#d4a24c] flex-shrink-0" size={20} />
                <motion.p 
                  whileHover={{ x: 5 }}
                  className="group-hover:text-[#d4a24c] transition-colors break-all"
                >
                  hello@flavoria.com
                </motion.p>
              </motion.div>

              <motion.div 
                custom={3}
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                className="flex items-start gap-3 group"
              >
                <Clock3 className="text-[#d4a24c] mt-1 flex-shrink-0" size={20} />
                <p className="leading-relaxed">
                  Mon - Sun
                  <br />
                  11:00 AM - 11:00 PM
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
 
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6"> 
            <div className="flex gap-4">
              {[
                { href: "#", color: "#1877F2", icon: "fab fa-facebook-f", label: "Facebook" },
                { href: "#", color: "#E4405F", icon: "fab fa-instagram", label: "Instagram" },
                { href: "#", color: "#1DA1F2", icon: "fab fa-twitter", label: "Twitter" },
                { href: "#", color: "#FF0000", icon: "fab fa-youtube", label: "YouTube" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  custom={index}
                  variants={socialIconVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  whileTap="tap"
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 shadow-lg"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <i className={`${social.icon} text-white text-lg`}></i>
                </motion.a>
              ))}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-400 text-sm text-center"
            >
              © 2024 Flavoria Restaurant. All rights reserved.
            </motion.p>
            
            <motion.button
              variants={scrollButtonVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#d4a24c] hover:bg-[#b88a3a] flex items-center justify-center shadow-lg"
              aria-label="Scroll to top"
            >
              <i className="fas fa-arrow-up text-white text-sm"></i>
            </motion.button>
          </div>
        </motion.div>
      </div>
 
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#d4a24c] to-transparent rounded-full"
      />
    </motion.footer>
  );
}