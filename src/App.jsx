import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import TopRestaurant from './components/TopRestaurant';
import RestaurantMenu from './components/RestaurantMenu';
import Homee from './components/Homee';
import Login from './components/Login';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const user = localStorage.getItem('user');

  return (
    <div>
      {user && <Navbar onCartClick={() => setIsCartOpen(true)} />}
      
      <Routes>
        <Route path="/" element={user ? <Homee /> : <Login />} />
        <Route path="/restaurant" element={user ? <TopRestaurant /> : <Login />} />
        <Route path="/restaurant/:id" element={user ? <RestaurantMenu /> : <Login />} />
      </Routes>

      {user && (
        <>
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
              console.log('Proceeding to checkout');
              setIsCartOpen(false);
            }}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;