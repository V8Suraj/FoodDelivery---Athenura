import React, { useState } from "react"; // 1. useState import kiya
import { allFoodItems } from "./data/data";

const TopDishes = () => {
  // 2. Counts ko manage karne ke liye ek object state banayi
  // Jisme 'id' key hogi aur 'count' value
  const [counts, setCounts] = useState({});

  const handleIncrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1, // Agar pehle se count nahi hai toh 0 + 1
    }));
  };

  const handleDecrement = (id) => {
    if (counts[id] > 0) {
      setCounts((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        Top dishes near you
        <hr className="mt-4 border-red-800 w-64 mx-auto" />
      </h1>

      <div className="flex justify-center flex-wrap gap-6">
        {allFoodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            style={{ width: "320px" }}
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-[220px] object-cover"
              />

              {/* COUNTER CONTROLS ON IMAGE */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow-lg">
                {/* Minus Button (Sirf tab dikhega jab count > 0 ho) */}
                {counts[item.id] > 0 && (
                  <>
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-gray-800">
                      {counts[item.id]}
                    </span>
                  </>
                )}

                {/* Plus Button */}
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg cursor-pointer hover:bg-green-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-orange-500 text-sm mt-1">{item.rating} ★</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">
                {item.description}
              </p>
              <p className="text-red-500 font-bold mt-3">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDishes;