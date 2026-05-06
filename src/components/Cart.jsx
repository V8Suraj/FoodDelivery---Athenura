import React, { useState, useEffect } from 'react';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Gaming Laptop',
      brand: 'ASUS',
      price: 999.99,
      originalPrice: 1299.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
      inStock: true,
      color: 'Black',
      storage: '512GB SSD'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      brand: 'Sony',
      price: 199.99,
      originalPrice: 249.99,
      quantity: 2,
      image: 'https://via.placeholder.com/100',
      inStock: true,
      color: 'White',
      storage: null
    },
    {
      id: 3,
      name: 'Smartphone',
      brand: 'Samsung',
      price: 699.99,
      originalPrice: 799.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
      inStock: true,
      color: 'Phantom Black',
      storage: '128GB'
    }
  ]);

  const [saveForLater, setSaveForLater] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(10);
 
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
   
  const total = subtotal - discount + shippingCost;

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
 
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
 
  const moveToSaveForLater = (item) => {
    setCartItems(cartItems.filter(i => i.id !== item.id));
    setSaveForLater([...saveForLater, item]);
  };
 
  const moveToCart = (item) => {
    setSaveForLater(saveForLater.filter(i => i.id !== item.id));
    setCartItems([...cartItems, item]);
  };
 
  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      alert('Coupon applied! 10% discount added.');
    } else if (couponCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      alert('Coupon applied! 20% discount added.');
    } else if (couponCode === 'FREESHIP') {
      setShippingCost(0);
      alert('Free shipping applied!');
    } else {
      alert('Invalid coupon code');
    }
  };
 
  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    alert('Proceeding to checkout!');
    if (onCheckout) onCheckout();
    onClose();
  };
 
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  };
 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <> 
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />
 
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 md:w-[480px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      > 
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              Clear All
            </button>
          )}
        </div>
 
        <div className="flex flex-col h-[calc(100%-70px)]">
          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 && saveForLater.length === 0 ? (
              // Empty Cart State
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-4" />
                </svg>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.brand}</p>
                            {item.color && (
                              <p className="text-xs text-gray-500">Color: {item.color}</p>
                            )}
                            {item.storage && (
                              <p className="text-xs text-gray-500">Storage: {item.storage}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                            {item.originalPrice && (
                              <p className="text-xs text-gray-400 line-through">${item.originalPrice}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity */}
                          <div className="flex items-center gap-1 border border-gray-200 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => moveToSaveForLater(item)}
                              className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-xs text-red-500 hover:text-red-600 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
 
                {saveForLater.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Save for Later ({saveForLater.length})
                    </h3>
                    <div className="space-y-3">
                      {saveForLater.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.brand}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-gray-800">${item.price}</p>
                                <button
                                  onClick={() => moveToCart(item)}
                                  className="text-xs text-blue-500 hover:text-blue-600"
                                >
                                  Move to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
 
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-4 shadow-lg">
              {/* Coupon Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-md transition-colors duration-300"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  SAVE10, SAVE20, FREESHIP
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-gray-800 text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;