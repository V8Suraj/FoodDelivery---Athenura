import React from "react";
import { menuitemsdata } from "./data/data";

const Menuitems = () => {
  return (
    <div className="w-full bg-gray-100 px-6 py-10 overflow-hidden">

      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 text-center">
        Explore our menu
      </h1>

      <p className="text-gray-500 mb-6 text-lg md:text-xl text-center">
        Choose from a diverse menu featuring a delectable array of dishes.
      </p>
      <div className="relative w-full overflow-hidden cursor-pointer">
        <div className="flex gap-8 w-max animate-scroll">
          
          {/* Here the array is trippled copy why ? because of animationm and moving motion*/}
          {[...menuitemsdata, ...menuitemsdata, ...menuitemsdata,...menuitemsdata].map((item, index) => (
            <div key={index} className="flex flex-col items-center min-w-[120px]">
              
              <div className="w-20 md:w-24 lg:w-28 aspect-square rounded-full overflow-hidden border">
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-2 text-sm">{item.name}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Menuitems;
