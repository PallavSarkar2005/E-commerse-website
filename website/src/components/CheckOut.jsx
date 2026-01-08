import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

// FINAL FIX: Hardcoded URL for Deployment
const API_BASE_URL = "https://e-commerce-api-wine.vercel.app"; 

const CheckoutPage = () => {
  const { cartItems } = useOutletContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    0
  );
  
  const shippingPrice = itemsPrice > 100 ? 0 : 10; 
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("You must be logged in to place an order!");
      navigate("/login?redirect=/checkout");
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod: "PayPal",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);

      console.log("Order Created:", data);
      navigate(`/order-confirmation/${data._id}`);
    } catch (error) {
      console.error("Order failed", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Go Shopping</Link>
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
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded" />
                <input required type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border rounded" />
                <input required type="text" placeholder="Zip Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full p-2 border rounded" />
                <input required type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-2 border rounded" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Payment Method</h2>
              <p className="text-gray-600">PayPal or Credit Card</p>
            </div>
          </form>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>${itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${taxPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-bold border-t pt-2"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
            </div>
            <button type="submit" form="checkout-form" className="w-full bg-orange-500 text-white py-4 px-4 rounded-lg mt-6 font-bold hover:bg-orange-600">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;