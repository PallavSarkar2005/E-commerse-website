import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({
  onToggleSidebar,
  searchTerm,
  setSearchTerm,
  onToggleSearch,
  cartItemCount,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const navigate = useNavigate();

  // 1. Get User Info from LocalStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <div className="w-full h-20 bg-slate-900 shadow-xl flex items-center justify-between p-4 sticky top-0 z-30 border-b border-slate-800">
      
      {/* --- LEFT: LOGO & SIDEBAR --- */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-full hover:bg-slate-800 transition-colors text-gray-400 hover:text-white"
          onClick={onToggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        
        {/* FIX: Link Logo to Home */}
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400 tracking-wide cursor-pointer">
            Flipkart<span className="text-white font-medium italic">Plus</span>
          </h1>
        </Link>
      </div>

      {/* --- MIDDLE: SEARCH BAR --- */}
      <div className="flex items-center gap-6 flex-1 justify-center px-4">
        <div className="relative w-full max-w-2xl hidden md:block">
          <motion.input
            type="text"
            placeholder="Search for premium products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            animate={{
              boxShadow: focused
                ? "0px 0px 18px rgba(251, 191, 36, 0.7)"
                : "0px 0px 0px rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
            className="w-full p-2.5 pl-4 pr-12 rounded-lg border border-slate-700 bg-slate-800 text-gray-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all shadow-inner"
          />
          <button
            className="absolute right-0 top-0 h-full px-4 text-slate-500 hover:text-amber-400 transition-colors"
            onClick={onToggleSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- RIGHT: ICONS & USER MENU --- */}
      <div className="flex items-center gap-3 text-gray-400 relative">
        
        {/* 2. CONDITIONAL RENDERING: Login vs User Menu */}
        {userInfo ? (
          // LOGGED IN STATE
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-200 text-sm font-medium hidden lg:block max-w-[100px] truncate">
                {userInfo.name}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-1 z-50"
                >
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Settings
                  </Link>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // GUEST STATE
          <Link
            to="/login"
            className="px-5 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm shadow-lg shadow-white/10"
          >
            Login
          </Link>
        )}

        {/* Dark Mode Toggle */}
        <motion.button
          className="p-2 rounded-full hover:bg-slate-800 text-gray-400 hover:text-amber-400 transition-all ml-2"
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Toggle Dark Mode"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDarkMode ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
          </motion.div>
        </motion.button>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-slate-800 text-gray-300 hover:text-amber-400 transition-all group"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg ring-2 ring-slate-900">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="font-medium hidden sm:block tracking-wide">Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;