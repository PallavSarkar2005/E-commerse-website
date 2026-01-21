import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL, USERS_URL } from "../constants";

const Sidebar = ({ isSidebarOpen, onToggleSidebar }) => {
  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Read current filters from URL on load
  useEffect(() => {
    const priceParam = searchParams.get("maxPrice");
    if (priceParam) setPriceRange(Number(priceParam));
  }, [searchParams]);

  // Handle Search
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?search=${keyword}`);
      onToggleSidebar();
    }
  };

  // Handle Price Slide
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceRange(value);
    
    // Update URL with new price filter
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("maxPrice", value);
    navigate(`/?${currentParams.toString()}`);
  };

  // Handle Category Click
  const handleCategoryClick = (category) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (category === "All") {
      currentParams.delete("category");
    } else {
      currentParams.set("category", category);
    }
    navigate(`/?${currentParams.toString()}`);
    onToggleSidebar();
  };

  // Logout Handler
  const logoutHandler = async () => {
    try {
      await axios.post(`${BASE_URL}${USERS_URL}/logout`);
      localStorage.removeItem("userInfo");
      navigate("/login");
    } catch (error) {
      console.error(error);
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  };

  // Animation Variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />

          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 h-full w-[280px] bg-slate-900/95 backdrop-blur-2xl border-r border-slate-700/50 text-gray-300 z-50 shadow-2xl flex flex-col"
          >
            {/* --- HEADER --- */}
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white tracking-wider">Filters</h1>
                <button onClick={onToggleSidebar} className="p-2 bg-slate-800 rounded-full hover:text-white">
                  ✕
                </button>
              </div>

              {/* SEARCH BAR */}
              <form onSubmit={submitHandler} className="relative group mb-4">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-amber-500 rounded-xl opacity-50 blur-[2px]"></div>
                <div className="relative flex items-center bg-slate-900 rounded-xl overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full bg-transparent text-white px-4 py-3 outline-none text-sm"
                  />
                </div>
              </form>
            </div>

            {/* --- SCROLLABLE CONTENT --- */}
            <div className="flex-1 overflow-y-auto px-4 hide-scrollbar">
              
              {/* Navigation */}
              <nav className="space-y-1 mb-8">
                {[
                  { name: "Home", path: "/" },
                  { name: "Profile", path: "/profile" },
                  { name: "Cart", path: "/cart" },
                  { name: "Settings", path: "/settings" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onToggleSidebar}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <span className="font-medium text-gray-300">{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* FUNCTIONAL FILTERS */}
              <div className="border-t border-slate-700/50 pt-6 mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
                  Filter By Price
                </h3>
                
                <div className="px-2 mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Max Price</span>
                    <span className="text-amber-400 font-bold">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {["All", "Electronics", "Camera", "Phones", "Accessories"].map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryClick(cat)}
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          (searchParams.get("category") === cat) || (cat === "All" && !searchParams.get("category"))
                            ? "bg-amber-500/20 text-amber-400 font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
              <button
                onClick={logoutHandler}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl font-semibold transition-all"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;