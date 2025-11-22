import React from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems } = useOutletContext();
  const navigate = useNavigate();
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[$,]/g, ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    navigate("/order-confirmation");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Your Cart is Empty
        </h1>
        <p className="mb-8 text-gray-600">
          Add some products before checking out.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                  1
                </span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                  2
                </span>
                Payment Details
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="123"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>

            {/* List of Items (Scrollable if too long) */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-4 last:border-0"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-orange-500 text-white py-4 px-4 rounded-lg mt-6 font-bold text-lg hover:bg-orange-600 transition-colors shadow-md active:scale-95 transform duration-150"
            >
              Place Order
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure Checkout. By placing your order, you agree to our Terms of
              Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
