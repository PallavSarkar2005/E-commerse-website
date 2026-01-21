import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL, USERS_URL } from "../constants";
import SearchBox from "./SearchBox";

const Navbar = ({ onToggleSidebar, cartItemCount, onSearch }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [language, setLanguage] = useState("EN");
  
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = async () => {
    try {
      await axios.post(`${BASE_URL}${USERS_URL}/logout`);
      localStorage.removeItem("userInfo");
      setShowUserMenu(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      localStorage.removeItem("userInfo");
      setShowUserMenu(false);
      navigate("/login");
    }
  };

  return (
    <nav className="w-full h-20 bg-slate-900 shadow-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 border-b border-slate-800">
      
      {/* --- LEFT: TOGGLE & LOGO --- */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          onClick={onToggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </motion.button>
        
        <Link to="/" className="group">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col leading-none"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-amber-400 tracking-wide group-hover:text-amber-300 transition-colors">
              Flipkart<span className="text-white font-medium italic">Plus</span>
            </h1>
            <span className="text-[10px] text-gray-500 tracking-widest group-hover:text-blue-400 transition-colors uppercase font-bold">Explore Plus</span>
          </motion.div>
        </Link>
      </div>

      {/* --- MIDDLE: SEARCH BAR --- */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <div className="w-full max-w-2xl transform transition-all hover:scale-[1.01] relative z-50">
           {/* Passing dark mode styling prop if your SearchBox supports it, otherwise it sits in a dark container */}
           <div className="bg-slate-800 rounded-lg p-1 border border-slate-700 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400 transition-all shadow-inner">
              <SearchBox onSearch={onSearch} />
           </div>
        </div>
      </div>

      {/* --- RIGHT: ACTIONS --- */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Language Selector */}
        <div className="relative hidden md:block">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium border border-transparent hover:border-slate-700 px-2 py-1 rounded-lg"
          >
            <span>{language}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-70">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-1 z-50"
              >
                {['EN', 'ES', 'FR', 'DE'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${language === lang ? 'text-amber-400 font-bold' : 'text-gray-300'}`}
                  >
                    {lang}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Admin Button (Only if Admin) */}
        {userInfo && userInfo.isAdmin && (
          <Link to="/admin/dashboard" className="hidden lg:block">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold rounded-md shadow-lg shadow-red-900/40 flex items-center gap-1"
            >
              Admin
            </motion.div>
          </Link>
        )}

        {/* Cart Icon */}
        <Link to="/cart" className="relative group p-2">
          <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 group-hover:text-amber-400 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5c.07.286-.06.586-.343.642a.576.576 0 00-.406.406 5 5 0 01-9.986 0 .576.576 0 00-.406-.406.58.58 0 01-.343-.642l1.263-5a.5.5 0 01.486-.39h8.385a.5.5 0 01.486.39z" />
            </svg>
          </motion.div>
          <AnimatePresence>
            {cartItemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow border border-slate-900"
              >
                {cartItemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* User Menu */}
        {userInfo ? (
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-700 bg-slate-800 hover:border-amber-500/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-sm shadow-lg group-hover:bg-amber-400">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-300 text-sm font-medium hidden md:block max-w-[80px] truncate group-hover:text-white">
                {userInfo.name.split(" ")[0]}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{userInfo.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-slate-800 hover:text-amber-400 transition-colors" onClick={() => setShowUserMenu(false)}>
                       Profile
                    </Link>
                    <Link to="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-slate-800 hover:text-amber-400 transition-colors" onClick={() => setShowUserMenu(false)}>
                       My Orders
                    </Link>
                    {userInfo.isAdmin && (
                      <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors lg:hidden" onClick={() => setShowUserMenu(false)}>
                         Admin Panel
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-800 pt-1 mt-1">
                    <button onClick={logoutHandler} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                      Log Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm shadow-lg"
            >
              Login
            </motion.button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;