import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  onToggleSidebar,
  searchTerm,
  setSearchTerm,
  onToggleSearch,
  cartItemCount,
}) => {
  return (
    <>
      <div className="w-full h-20 bg-slate-900 shadow-xl flex items-center justify-between p-4 sticky top-0 z-20 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full hover:bg-slate-800 transition-colors text-gray-400 hover:text-white"
            onClick={onToggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400 tracking-wide cursor-pointer">
            Flipkart<span className="text-white font-medium italic">Plus</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 flex-1 justify-center px-4">
          <div className="relative w-full max-w-2xl hidden md:block">
            <input
              type="text"
              placeholder="Search for premium products..."
              className="w-full p-2.5 pl-4 pr-12 rounded-lg border border-slate-700 bg-slate-800 text-gray-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute right-0 top-0 h-full px-4 text-slate-500 hover:text-amber-400 transition-colors"
              onClick={onToggleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="hidden lg:block px-6 py-2 bg-transparent border border-slate-600 text-gray-300 font-medium rounded-lg hover:border-amber-400 hover:text-amber-400 transition-all hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]">
              Login
            </button>
            <button
              className="p-2 rounded-full hover:bg-slate-800 hover:text-amber-400 transition-all"
              title="User"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            <button
              className="p-2 rounded-full hover:bg-slate-800 hover:text-amber-400 transition-all"
              title="Become a Seller"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z"
                />
              </svg>
            </button>
          </div>
        </div>
        <Link
          to="/cart"
          className="flex items-center gap-2 p-2 px-4 rounded-lg hover:bg-slate-800 text-gray-300 hover:text-amber-400 transition-all group"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg ring-2 ring-slate-900">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="font-medium hidden sm:block tracking-wide">
            Cart
          </span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
