import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to home or back to where they came from
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // If already logged in, go to home
    if (localStorage.getItem("userInfo")) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // 1. Send Login Request
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      // 2. Save Token & User Info to Local Storage
      // This is what CheckoutPage looks for!
      localStorage.setItem("userInfo", JSON.stringify(data));

      // 3. Redirect
      setLoading(false);
      navigate(redirect);
      
    } catch (err) {
      setLoading(false);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -45, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Login to access your account</p>
          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="block text-xs font-medium text-indigo-200 mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-indigo-200 mb-1 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                className="mr-2 rounded bg-slate-800 border-slate-600 text-indigo-500 focus:ring-indigo-500/50"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full font-bold py-3.5 rounded-xl shadow-lg transition-all bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/25 border border-white/10 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Log In"}
          </motion.button>
        </form>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-300 text-sm">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-2 font-semibold hover:underline transition-colors text-amber-400 hover:text-amber-300"
            >
              Sign Up
            </Link>
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;