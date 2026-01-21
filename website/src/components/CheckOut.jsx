import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import { ORDERS_URL } from "../constants";

const GlassInput = ({ label, type, value, onChange, placeholder, required }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-blue-300 uppercase tracking-wider ml-1">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner backdrop-blur-sm"
    />
  </div>
);

const CheckoutPage = () => {
  const { cartItems, clearCart } = useOutletContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login?redirect=/checkout");
    }
  }, [navigate]);

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
      alert("You must be logged in!");
      navigate("/login");
      return;
    }

    setLoading(true);

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

    try {
      const { data } = await axios.post(
        ORDERS_URL, 
        orderData,
        config
      );

      if (clearCart) clearCart();

      if (data && data._id) {
        navigate(`/order-confirmation/${data._id}`);
      } else {
        alert("Order successful but no ID returned. Redirecting home.");
        navigate('/');
      }

    } catch (error) {
      console.error("Order Error Details:", error);

      let errorMsg = "Something went wrong.";
      if (error.response) {
        errorMsg = `Server Error: ${error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        errorMsg = "Network Error: Could not connect to backend. Check if your server is running.";
      } else {
        errorMsg = error.message;
      }

      alert(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl max-w-md w-full">
          <FaShoppingCart className="text-6xl text-blue-400 mx-auto mb-6 opacity-50" />
          <h1 className="text-2xl font-bold text-white mb-4">Cart Empty</h1>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg"
            >
              Go Shopping
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans relative overflow-hidden pb-20 pt-10 px-4">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20" />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder}>

              <motion.div variants={itemVariants} className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-blue-400"><FaMapMarkerAlt /></span> Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassInput label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" required />
                  <GlassInput label="City" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
                  <GlassInput label="Postal / Zip Code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Zip Code" required />
                  <GlassInput label="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-blue-400"><FaCreditCard /></span> Payment Method
                </h2>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-white text-xl">PayPal</span>
                  </div>
                  <FaCheckCircle className="text-blue-400 text-xl" />
                </div>
              </motion.div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="text-blue-400"><FaShoppingCart /></span> Order Summary
              </h2>

              <div className="space-y-3 border-b border-white/10 pb-4 text-sm font-medium text-gray-300">
                <div className="flex justify-between"><span>Subtotal</span><span>${itemsPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>${shippingPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${taxPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-bold text-white pt-2"><span>Total</span><span className="text-amber-400">${totalPrice.toFixed(2)}</span></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full mt-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>Place Order</>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;