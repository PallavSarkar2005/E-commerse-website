import React, { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { clearCart } = useOutletContext();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (clearCart) {
      clearCart();
    }

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 5);
  const deliveryString = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans relative overflow-hidden flex items-center justify-center p-4">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.15}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-[150px] opacity-10"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-10"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full bg-slate-800/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 mb-8 shadow-lg shadow-green-500/30"
        >
          <FaCheckCircle className="text-6xl text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed">
          Thank you for your purchase. We've received your order and are getting
          it ready for shipment.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaBoxOpen className="text-9xl text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <p className="text-xs text-blue-300 uppercase font-bold tracking-wider mb-2">
                Order ID
              </p>
              <p className="text-xl font-mono font-bold text-white tracking-wide">
                #{orderId}
              </p>
            </div>

            <div>
              <p className="text-xs text-blue-300 uppercase font-bold tracking-wider mb-2">
                Estimated Delivery
              </p>
              <p className="text-xl font-bold text-white flex items-center gap-3">
                <span className="p-2 bg-green-500/20 rounded-lg text-green-400">
                  <FaTruck />
                </span>
                {deliveryString}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              <span className="text-green-400">Confirmed</span>
              <span className="text-blue-400">Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "35%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-3"
            >
              <FaHome /> Return Home
            </motion.button>
          </Link>

          <Link to="/profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-3"
            >
              Track Order <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
