import React from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from './data/data';

const TopRestaurant = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10 bg-gray-100">
      <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        🌎 World Wide Famous Restaurants
        <hr className="mt-4 border-red-800 w-64 mx-auto" />
      </h1>

      <div className="flex justify-center flex-wrap gap-6">
        {data.restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
            style={{ width: '320px' }}
          >
            <div>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-[220px] object-cover"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow text-center">
              <h2 className="font-semibold text-lg">
                📍 {restaurant.location}
              </h2>

              <p className="text-orange-500 text-sm mt-1">
                <span className="text-black">User Rated: </span>
                {restaurant.rating}
              </p>

              <p className="text-orange-500 text-sm mt-1">
                <span className="text-black">Delivery Time: </span>
                {restaurant.deliveryTime}
              </p>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">
                {restaurant.description}
              </p>

              <p className="text-red-500 font-bold mt-3">
                Cost For Two: ₹{restaurant.costForTwo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRestaurant;