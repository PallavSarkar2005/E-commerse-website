import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';

// FINAL FIX: Hardcoded URL for Deployment
const API_BASE_URL = "https://e-commerce-api-wine.vercel.app";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const sp = new URLSearchParams(location.search); 
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      
      // Using full URL here
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate(redirect);
      
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4">{error}</div>}
        
        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="text-xs font-medium text-indigo-200 uppercase">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="name@example.com" required />
          </div>
          <div>
            <label className="text-xs font-medium text-indigo-200 uppercase">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" required />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full font-bold py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
            {loading ? "Signing In..." : "Log In"}
          </motion.button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-300 text-sm">Don't have an account? <Link to="/signup" className="ml-2 font-semibold text-amber-400 hover:underline">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;