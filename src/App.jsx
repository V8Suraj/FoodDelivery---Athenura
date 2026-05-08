// <<<<<<< FoodItemsListed
import React, { useState } from 'react'
// =======
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'; 
import Cart from './components/Cart';
import TopRestaurant from './components/TopRestaurant';
import RestaurantMenu from './components/RestaurantMenu';
import  Homee from './components/Homee';
import Login from './components/Login';


  
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
// >>>>>>> main
  // ✅ localStorage check
  const user = localStorage.getItem('user');

  return (
    <div>
      {user &&<Navbar onCartClick={() => setIsCartOpen(true)} />}
      <Routes>
        <Route path="/" element={user ? <Homee /> : <Login />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/offers" element={<Offers />} /> */}
        {/* <Route path="/blogs" element={<Blogs />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/cart" element={<Cart />} />  */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/orders" element={<Orders />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/restaurant" element={user ? <TopRestaurant/> : <Login/> } />
        <Route path="/restaurant/:id" element={user ?<RestaurantMenu /> : <Login/>} />
      </Routes>

      {user && (<Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          console.log('Proceeding to checkout');
          // navigate('/checkout');
          setIsCartOpen(false);
        }} 
        />
        )}
    </div>
  );
}
 
export default App
