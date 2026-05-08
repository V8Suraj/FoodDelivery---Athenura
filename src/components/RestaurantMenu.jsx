import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { data } from "./data/data";

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = data.restaurants.find((r) => r.id === id);

  const [cart, setCart] = useState({});

  if (!restaurant) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        <h2 className="text-2xl">Restaurant not found 🚫</h2>
      </div>
    );
  }

  const handleAdd = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleRemove = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pb-28">

      {/* 🔥 HEADER */}
      <div className="relative h-[250px] w-full">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white/10 backdrop-blur-md p-3 rounded-full hover:scale-110 transition"
        >
          <ArrowLeft />
        </button>

        {/* Restaurant Info */}
        <div className="absolute bottom-5 left-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-300 text-sm">{restaurant.cuisine}</p>
        </div>
      </div>

      {/* 🔥 MENU */}
      <div className="px-5 mt-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        <div className="flex flex-col gap-6">
          {restaurant.menu.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:scale-[1.02] transition"
            >
              {/* LEFT TEXT */}
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {item.description}
                </p>

                <p className="mt-3 font-semibold text-lg">₹{item.price}</p>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-28 h-28">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* ADD BUTTON / COUNTER */}
                {cart[item.id] > 0 ? (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-black flex items-center gap-3 px-3 py-1 rounded-full shadow-lg">
                    <button onClick={() => handleRemove(item.id)}>
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-sm">
                      {cart[item.id]}
                    </span>
                    <button onClick={() => handleAdd(item.id)}>
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdd(item.id)}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full font-semibold hover:bg-red-600 hover:text-white transition"
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 CART BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white text-black rounded-full px-6 py-3 flex justify-between items-center shadow-2xl">
          <span className="font-bold">{totalItems} items added</span>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:scale-105 transition">
            View Cart →
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;