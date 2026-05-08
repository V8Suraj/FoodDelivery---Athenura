import React from "react";
import { 
  SparklesIcon, 
  ClockIcon, 
  StarIcon, 
  MapPinIcon, 
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

const Used = () => {
  const reasons = [
    { icon: <SparklesIcon />, title: "Fresh Ingredients", features: ["100% Organic produce","Sourced daily","Quality checked","Packed with nutrients"] },
    { icon: <ClockIcon />, title: "Fast Delivery", features: ["Hot & fresh meals","On-time delivery","Track your order","Prompt service"] },
    { icon: <StarIcon />, title: "Exclusive Recipes", features: ["Chef crafted dishes","Unique flavors","Seasonal specials","Beautiful presentation"] },
    { icon: <MapPinIcon />, title: "Visit Us", features: [], isMap: true, mapLink: "https://www.google.com/maps/place/Dighori,+Nagpur,+Maharashtra+440014", address: "Dighori, Nagpur, Maharashtra 440014" },
  ];

  return (
    <section style={{ textAlign: "center", padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{
        fontSize: "3.5rem",
        marginBottom: "60px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "800"
      }}>
        Why Order From Us?
      </h2>

      <div style={{ display: "flex", gap: "24px", flexWrap: "nowrap", overflowX: "auto", padding: "0 40px", justifyContent: "center" }}>
        {reasons.map((reason, index) => {
          const isVisitCard = reason.isMap;
          return (
            <div key={index} style={{
              background: isVisitCard ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#fff",
              color: isVisitCard ? "#fff" : "#1a202c",
              borderRadius: "14px",
              padding: "22px 18px",
              minWidth: "240px",
              maxWidth: "260px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05), 0 3px 8px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minHeight: "300px",
              flexShrink: 0,
              border: isVisitCard ? "none" : "1px solid rgba(99, 102, 241, 0.06)",
              position: "relative",
              overflow: "hidden",
              transform: "translateY(0px)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}>
              <div style={{
                width: "36px",
                height: "36px",
                marginBottom: "14px",
                color: isVisitCard ? "#fff" : "#667eea",
                padding: "8px",
                borderRadius: "10px",
                backgroundColor: isVisitCard ? "rgba(255,255,255,0.2)" : "rgba(102, 126, 234, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {reason.icon}
              </div>

              <h3 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "14px", color: isVisitCard ? "#fff" : "#1a202c" }}>
                {reason.title}
              </h3>

              {!isVisitCard && reason.features.map((f, i) => (
                <p key={i} style={{
                  textAlign: "left",
                  fontSize: "0.8125rem",
                  lineHeight: "1.4",
                  marginBottom: "6px",
                  color: "#4a5568",
                  padding: "4px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.03)",
                  fontWeight: "500"
                }}>{f}</p>
              ))}

              {isVisitCard && (
                <>
                  <div style={{ borderRadius: "10px", overflow: "hidden", margin: "10px 0", boxShadow: "0 3px 10px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.3)" }}>
                    <iframe
                      title="Nagpur Dighori Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.541845229821!2d79.10985461507493!3d21.10757478593365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c85a6a8f3d71%3A0x9f5e1d89b6f61f49!2sDighori%2C%20Nagpur,+Maharashtra+440014!5e0!3m2!1sen!2sin!4v1689362218456!5m2!1sen!2sin"
                      style={{ width: "100%", height: "100px", border: "none" }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div style={{ marginTop: "10px", marginBottom: "10px", fontWeight: "600", fontSize: "0.8125rem", color: "#fff" }}>
                    {reason.address}
                  </div>
                  <button style={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "#fff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.8125rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "10px",
                    boxShadow: "0 3px 10px rgba(245, 87, 108, 0.2)"
                  }}
                  onClick={() => window.open(reason.mapLink, "_blank")}>
                    Get Directions <ArrowRightIcon />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Used;