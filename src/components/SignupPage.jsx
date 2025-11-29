import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 45, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -45, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join Flipkart Plus today</p>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">First Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500" 
                placeholder="John" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500" 
                placeholder="Doe" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500" 
              placeholder="name@example.com" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500" 
              placeholder="••••••••" 
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full font-bold py-3.5 rounded-xl shadow-lg transition-all bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-orange-500/25"
          >
            Sign Up
          </motion.button>
        </form>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?
            <Link to="/login" className="ml-2 font-semibold hover:underline transition-colors text-amber-400 hover:text-amber-300">
              Log In
            </Link>
          </p>
          <div className="mt-4">
            <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;