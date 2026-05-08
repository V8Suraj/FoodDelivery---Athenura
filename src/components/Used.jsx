import React, { useState, useEffect } from "react";
import { SparklesIcon, ClockIcon, StarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Used = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const features = [
    {
      icon: <SparklesIcon style={{ width: "35px", height: "35px", color: "#FF7F50" }} />,
      title: "Premium Quality",
      description: "We use only the freshest ingredients sourced locally to ensure top-notch quality in every dish."
    },
    {
      icon: <ClockIcon style={{ width: "35px", height: "35px", color: "#FF7F50" }} />,
      title: "Fast Delivery",
      description: "Enjoy your favorite meals delivered hot and fresh within 30 minutes.",
      countdown: true
    },
    {
      icon: <StarIcon style={{ width: "35px", height: "35px", color: "#FF7F50" }} />,
      title: "Customer Favorites",
      description: "Our dishes are loved by thousands of happy customers, with an average rating of 4.8★."
    },
    {
      icon: <MapPinIcon style={{ width: "35px", height: "35px", color: "#fff" }} />,
      title: "Visit Our Location",
      description: "Come experience our cozy restaurant in Maharashtra - 440014, with authentic flavors and a warm atmosphere.",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.541845229821!2d79.10985461507493!3d21.10757478593365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c85a6a8f3d71%3A0x9f5e1d89b6f61f49!2sDighori%2C%20Nagpur,+Maharashtra+440014!5e0!3m2!1sen!2sin!4v1689362218456!5m2!1sen!2sin",
      directions: "https://www.google.com/maps/dir/?api=1&destination=Dighori,+Nagpur,+Maharashtra+440014"
    }
  ];

  const [flipped, setFlipped] = useState(Array(features.length).fill(false));
  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <section
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: "60px 20px",
        maxWidth: "1400px",
        margin: "40px auto",
        borderRadius: "25px",
        overflow: "hidden",
        color: "#fff",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
        background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('/restaurant-interior.jpg') center/cover no-repeat",
      }}
    >
      <h2 style={{ fontSize: "2.8rem", fontWeight: "700", marginBottom: "20px", textAlign: "center", textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
        Why Choose Us?
      </h2>
      <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto 50px", textAlign: "center", textShadow: "1px 1px 5px rgba(0,0,0,0.6)" }}>
        Fresh ingredients, fast delivery, and great taste every time.
      </p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleFlip(index)}
            style={{ flex: "1 1 220px", minWidth: "220px", maxWidth: "280px", perspective: "1000px" }}
          >
            <motion.div
              animate={{ rotateY: flipped[index] ? 180 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "relative",
                width: "100%",
                height: "300px", // same height for all cards
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                background: feature.title === "Visit Our Location" ? "#D2691E" : "rgba(255,255,255,0.95)",
                color: feature.title === "Visit Our Location" ? "#fff" : "#333",
                transformStyle: "preserve-3d",
                cursor: "pointer",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* Front */}
              <div style={{ backfaceVisibility: "hidden", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <motion.div whileHover={{ rotate: 20 }} style={{ width: "50px", height: "50px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: feature.title === "Visit Our Location" ? "#A0522D" : "#fff7e6" }}>
                  {feature.icon}
                </motion.div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "10px" }}>{feature.title}</h3>
                {/* Stylish front description */}
                <div style={{ backgroundColor: "#fffbe6", color: "#333", padding: "8px 12px", borderRadius: "10px", fontWeight: "600", fontStyle: "italic", fontSize: "0.9rem", textAlign: "center", letterSpacing: "0.5px", boxShadow: "0 3px 8px rgba(0,0,0,0.15)", width: "90%" }}>
                  {feature.description}
                  {feature.countdown && <p style={{ fontWeight: "700", marginTop: "5px" }}>Delivery in {formatTime(timeLeft)}</p>}
                </div>
              </div>

              {/* Back */}
              <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "6px", overflowY: "auto", textAlign: "center" }}>
                {feature.title === "Visit Our Location" && (
                  <div style={{ width: "100%", borderRadius: "14px", backgroundColor: "#fff", color: "#000", padding: "10px", boxShadow: "0 6px 18px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    {/* Description sign */}
                    <div style={{ backgroundColor: "#fffbe6", color: "#333", padding: "6px 10px", borderRadius: "10px", fontWeight: "600", fontStyle: "italic", fontSize: "0.85rem", textAlign: "center", letterSpacing: "0.5px", boxShadow: "0 3px 6px rgba(0,0,0,0.15)", width: "95%" }}>
                      {feature.description}
                    </div>
                    {/* Smaller map */}
                    <iframe src={feature.map} width="100%" height="100" style={{ border: "0", borderRadius: "10px", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" }} allowFullScreen loading="lazy" title="Restaurant Map"></iframe>
                    <a href={feature.directions} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: "8px", backgroundColor: "#FFD700", color: "#8B4513", fontWeight: "700", textDecoration: "none", width: "80%", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFC300"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#FFD700"}>
                      Get Directions
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Used;

