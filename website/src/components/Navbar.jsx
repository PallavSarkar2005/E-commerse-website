import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "./SearchBox"; 

const Navbar = ({ onToggleSidebar, cartItemCount, onSearch }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <div className="w-full h-20 bg-slate-900 shadow-xl flex items-center justify-between p-4 sticky top-0 z-30 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-full hover:bg-slate-800 transition-colors text-gray-400 hover:text-white"
          onClick={onToggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400 tracking-wide">
            Flipkart<span className="text-white font-medium italic">Plus</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-6 flex-1 justify-center px-4">
        <div className="hidden md:block w-full max-w-2xl">
           <SearchBox onSearch={onSearch} />
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-400 relative">
        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-200 text-sm font-medium hidden lg:block max-w-[100px] truncate">
                {userInfo.name}
              </span>
            </button>
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl overflow-hidden py-1 z-50"
                >
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50" onClick={() => setShowUserMenu(false)}>My Profile</Link>
                  <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login" className="px-5 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-amber-400">Login</Link>
        )}

        <Link to="/cart" className="relative p-2 hover:text-amber-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;