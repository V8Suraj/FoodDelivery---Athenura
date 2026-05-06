import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Herosection from './components/HeroSection';
import Navbar from './components/Navbar'; 
import Cart from './components/Cart';
 
const Home = () => (
  <div>
    <Herosection />
  </div>
)
  
const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return ( 
    <div>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} /> 
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/offers" element={<Offers />} /> */}
        {/* <Route path="/blogs" element={<Blogs />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/cart" element={<Cart />} />  */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/orders" element={<Orders />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
       
      <Cart
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          console.log('Proceeding to checkout'); 
          // navigate('/checkout');
          setIsCartOpen(false);
        }}
      />
    </div>
  )
}
 
export default App