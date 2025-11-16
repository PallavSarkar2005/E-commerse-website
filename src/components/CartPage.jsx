import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const CartPage = () => {
  const context = useOutletContext();
  const cartItems = context?.cartItems || [];
  const removeFromCart = context?.removeFromCart || (() => {});
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[$,]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p className="text-xl text-gray-700">Your cart is currently empty.</p>
          <Link to="/" className="text-blue-500 hover:underline mt-8 inline-block">
            &larr; Start shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <Link 
              to="/checkout" 
              className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700"
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