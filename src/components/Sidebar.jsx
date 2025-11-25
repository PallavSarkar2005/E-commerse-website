import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <div
      className={`

        h-screen  w-64 bg-slate-900 border-r border-slate-800
        text-gray-300
        transition-transform duration-500 ease-in-out
        fixed top-20 left-0 z-30
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col h-full p-4 pt-4 overflow-y-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-amber-400 mb-4">Dashboard</h1>
          <nav>
            <ul>
              <li className="mb-2 border-t">
                <a href="#" className="block p-2 rounded hover:bg-white/20">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/profile"
                  className="block p-2 rounded hover:bg-white/20"
                >
                  Profile
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded hover:bg-white/20">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/settings"
                  className="block p-2 rounded hover:bg-white/20"
                >
                  Settings
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded hover:bg-white/20">
                  Log Out
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="my-4 border-t">
          <h1 className="text-lg font-bold text-amber-400 mb-2">Price Range</h1>
          <input
            type="range"
            className="w-full accent-amber-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#">Special offers</a>
              </li>
              <li className="block p-2 rounded hover:bg-white/20">Trendings</li>
              <li className="block p-2 rounded hover:bg-white/20">
                Women Fashion
              </li>
              <li className="block p-2 rounded hover:bg-white/20">
                Men fashion
              </li>
              <li className="block p-2 rounded hover:bg-white/20">
                Smart Phones
              </li>
              <li className="block p-2 rounded hover:bg-white/20">
                Electronic
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto border-t">
          <h1 className="text-xl font-bold text-amber-400 mb-2">
            Help & Settings
          </h1>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded hover:bg-white/20">
                  Your Account
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded hover:bg-white/20">
                  Settings
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded hover:bg-white/20">
                  Log Out
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
