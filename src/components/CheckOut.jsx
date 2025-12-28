import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const CheckoutPage = () => {
  const { cartItems } = useOutletContext();
  const navigate = useNavigate();

  // 1. State for Form Inputs
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India"); // Default or empty

  // 2. Simple Math for Totals
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example logic
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // 3. Get User Token (We assume it's stored in localStorage after login)
    // If you haven't built Login yet, this part will fail with 401.
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("You must be logged in to place an order!");
      navigate("/login");
      return;
    }

    try {
      // 4. Create Order Object according to Backend Model
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id, // Backend expects 'product' as the ID
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod: "PayPal", // Hardcoded for now
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Send the token!
        },
      };

      // 5. Send to Backend
      const { data } = await axios.post("/api/orders", orderData, config);

      console.log("Order Created:", data);
      navigate("/order-confirmation"); // You can pass data._id if needed
    } catch (error) {
      console.error("Order failed", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Your Cart is Empty
        </h1>
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
                    Address
                  </label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    required
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section (Visual only for now) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                  2
                </span>
                Payment Method
              </h2>
              <p className="text-gray-600">PayPal or Credit Card (Integration coming soon)</p>
            </div>
          </form>
        </div>

        {/* Order Summary Side */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 border-b pb-4 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shippingPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (15%)</span>
                <span>${taxPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-orange-500 text-white py-4 px-4 rounded-lg mt-6 font-bold text-lg hover:bg-orange-600 transition-colors shadow-md"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;