import React from "react";

const Sidebar = ({isSidebarOpen}) => {
  return (
    <>
      <div
        className={`h-full w-64 bg-gradient-to-b from-blue-300 to-purple-400 transition-transform duration-500 ease-in-out fixed top-20 left-0 z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold text-pink-900">Dashboard</h1>
        <ul>
          <li>
            <a href="#" className="text-rose-700">
              Home
            </a>     
          </li>
          <li>
            <a href="#" className="text-rose-700">
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="text-rose-700">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="text-rose-700">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="text-rose-700">
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
