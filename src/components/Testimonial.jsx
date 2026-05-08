import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]); // All reviews
  const [name, setName] = useState("");       // Name input
  const [reviewText, setReviewText] = useState(""); // Review input
  const [rating, setRating] = useState(0);    // Selected rating
  const [hover, setHover] = useState(0);      // Hover effect for stars

  // Function to post a new review
  const handleSubmit = () => {
    if (!name || !reviewText || rating === 0) return; // Do nothing if fields are empty
    const newReview = { id: Date.now(), name, text: reviewText, rating };
    setReviews([newReview, ...reviews]); // Add new review to top
    setName(""); setReviewText(""); setRating(0); // Reset form
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px 20px 40px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#fff", fontSize: "2.5rem", fontWeight: "700", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>What Our Customers Are Saying</h1>
        <p style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto", color: "#fff", fontSize: "1.1rem", opacity: "0.95" }}>
          Read real stories from our customers and share your own experience.
        </p>
      </div>

      <div style={{ display: "flex", gap: "30px", maxWidth: "1200px", margin: "0 auto", flexWrap: "wrap" }}>
        {/* Feedback Form */}
        <div style={{ flex: 1, minWidth: "280px", background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", padding: "40px", borderRadius: "25px", color: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "10px", fontWeight: "600" }}>Share Your Story</h2>
          <p style={{ marginBottom: "30px", opacity: "0.9" }}>We value your feedback! Let us know how we did.</p>

          {/* Name input */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", marginBottom: "20px", padding: "15px", borderRadius: "12px", border: "none", fontSize: "1rem", background: "rgba(255,255,255,0.9)" }}
          />

          {/* Star Rating */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", alignItems: "center" }}>
            <span>Rating:</span>
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    value={starValue}
                    onClick={() => setRating(starValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    color={starValue <= (hover || rating) ? "#fbbf24" : "#ccc"}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    style={{ cursor: "pointer" }}
                  />
                </label>
              );
            })}
          </div>

          {/* Review textarea */}
          <textarea
            placeholder="Share your experience with us..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{ width: "100%", padding: "15px", borderRadius: "12px", marginBottom: "20px", border: "none", resize: "none", fontSize: "1rem", minHeight: "120px", background: "rgba(255,255,255,0.9)" }}
          />

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%", padding: "15px", borderRadius: "12px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", border: "none", color: "#fff",
              fontWeight: "600", cursor: "pointer", fontSize: "1.1rem", transition: "transform 0.2s ease"
            }}
          >
            Post Review
          </button>
        </div>

        {/* Reviews Display */}
        <div style={{ flex: 2, minWidth: "300px", background: "rgba(255,255,255,0.95)", padding: "40px", borderRadius: "25px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "25px", fontWeight: "600", color: "#1e3a8a" }}>Customer Reviews</h3>

          {reviews.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#666", fontSize: "1.1rem" }}>
              No reviews yet. Be the first to share your story!
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginTop: "20px" }}>
            {reviews.map((r) => (
              <div key={r.id} style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%)", padding: "25px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: "transform 0.3s ease" }}>
                {/* Avatar + Name */}
                <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
                  <div style={{
                    width: "50px", height: "50px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    fontWeight: "700", fontSize: "1.2rem", boxShadow: "0 5px 15px rgba(102,126,234,0.4)"
                  }}>
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#1e3a8a" }}>{r.name}</h4>
                    <div style={{ display: "flex", gap: "3px", marginTop: "5px" }}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < r.rating ? "#fbbf24" : "#ddd"} size={14} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Review text */}
                <p style={{ fontSize: "1rem", color: "#444", lineHeight: "1.6" }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;