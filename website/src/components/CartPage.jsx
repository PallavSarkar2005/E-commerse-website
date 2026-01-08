import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const CartPage = () => {
  const context = useOutletContext();
  const cartItems = context?.cartItems || [];
  const removeFromCart = context?.removeFromCart || (() => {});

  // Calculate Total
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6">
                  
                  {/* --- FIXED THUMBNAIL IMAGE --- */}
                  <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h2>
                    <p className="text-blue-600 font-semibold mt-1">${item.price}</p>
                    <p className="text-gray-400 text-sm mt-1">Quantity: {item.quantity}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-50 text-red-500 py-2 px-4 rounded-lg hover:bg-red-100 font-medium transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h2>
            <Link 
              to="/checkout" 
              className="bg-amber-400 text-slate-900 py-3 px-8 rounded-lg text-lg font-bold hover:bg-amber-500 shadow-lg hover:shadow-amber-400/30 transition-all active:scale-95"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;