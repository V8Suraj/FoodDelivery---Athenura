import React, { useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Testimonial = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      feedback: "Amazing food quality and fast delivery!",
      rating: 5,
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Patel",
      feedback:
        "Packaging was perfect and taste was awesome.",
      rating: 4,
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Amit Verma",
      feedback:
        "Very professional service and delicious meals.",
      rating: 5,
      image:
        "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      id: 4,
      name: "Sneha Joshi",
      feedback:
        "Loved the restaurant ambience and customer support.",
      rating: 5,
      image:
        "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 5,
      name: "Rohan Mehta",
      feedback:
        "Food arrived hot and fresh. Highly recommended!",
      rating: 4,
      image:
        "https://randomuser.me/api/portraits/men/71.jpg",
    },
    {
      id: 6,
      name: "Anjali Deshmukh",
      feedback:
        "Excellent service and tasty dishes. Will order again!",
      rating: 5,
      image:
        "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 7,
      name: "Karan Malhotra",
      feedback:
        "Quick delivery and great packaging quality.",
      rating: 4,
      image:
        "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ]);

  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const [current, setCurrent] = useState(0);

  const profileImages = [
    "https://randomuser.me/api/portraits/men/11.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
    "https://randomuser.me/api/portraits/men/13.jpg",
    "https://randomuser.me/api/portraits/women/14.jpg",
    "https://randomuser.me/api/portraits/men/15.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !feedback || rating === 0) {
      alert("Please fill all fields");
      return;
    }

    const randomImage =
      profileImages[
        Math.floor(Math.random() * profileImages.length)
      ];

    const newReview = {
      id: Date.now(),
      name,
      feedback,
      rating,
      image: randomImage,
    };

    setReviews([newReview, ...reviews]);

    setName("");
    setFeedback("");
    setRating(0);
    setCurrent(0);
  };

  const prevReview = () => {
    setCurrent(
      current === 0 ? reviews.length - 1 : current - 1
    );
  };

  const nextReview = () => {
    setCurrent(
      current === reviews.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.65)",
          padding: "40px",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#FFD700",
            marginBottom: "40px",
            fontSize: "42px",
          }}
        >
          Customer Testimonials
        </h1>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* FORM */}
          <div
            style={{
              flex: "1",
              minWidth: "320px",
              maxWidth: "450px",
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#ff7a00",
                marginBottom: "20px",
              }}
            >
              Give Your Feedback
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={30}
                    color={
                      star <= rating ? "#FFD700" : "#ccc"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>

              <textarea
                rows="5"
                placeholder="Write your feedback..."
                value={feedback}
                onChange={(e) =>
                  setFeedback(e.target.value)
                }
                style={textareaStyle}
              />

              <button type="submit" style={buttonStyle}>
                Submit Feedback
              </button>
            </form>
          </div>

          {/* REVIEWS */}
          <div
            style={{
              flex: "1",
              minWidth: "320px",
              maxWidth: "500px",
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#ff7a00",
                marginBottom: "30px",
              }}
            >
              Customer Reviews
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <button onClick={prevReview} style={navButton}>
                <FaChevronLeft />
              </button>

              <button onClick={nextReview} style={navButton}>
                <FaChevronRight />
              </button>
            </div>

            <div
              style={{
                background: "#f9f9f9",
                padding: "25px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              {/* PROFILE */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={reviews[current].image}
                  alt={reviews[current].name}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #ff7a00",
                    marginBottom: "10px",
                  }}
                />

                <h3 style={{ margin: 0, color: "#333" }}>
                  {reviews[current].name}
                </h3>
              </div>

              {/* ⭐ RATING MOVED HERE */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  marginBottom: "15px",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    color={
                      star <= reviews[current].rating
                        ? "#FFD700"
                        : "#ccc"
                    }
                  />
                ))}
              </div>

              <p style={{ color: "#555" }}>
                "{reviews[current].feedback}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* styles */
const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  resize: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg,#ff7a00,#ffb347)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const navButton = {
  background: "#ff7a00",
  color: "#fff",
  border: "none",
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Testimonial;