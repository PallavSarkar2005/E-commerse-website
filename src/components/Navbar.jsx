import React from "react";
import { Link } from "react-router-dom";
import menuIcon from "../assets/images/menu.png";
import cartIcon from "../assets/images/shopping-cart.png";
const Navbar = ({ onToggleSidebar, searchTerm, setSearchTerm, onToggleSearch }) => {
  return (
    <>
      <div className="w-full h-20 bg-slate-500 flex items-center p-4 sticky top-0 z-20">

        <button className=" h-15 p-2 rounded" onClick={onToggleSidebar}><img src={menuIcon} alt="Menu" className="h-6 w-6" />
        </button>
        
        <div className="flex items-center gap-4 ">
          
          <h1 className="text-3xl font-medium ml-11 ">Flipkart</h1>
          
          <input
            type="text"
            placeholder="Search products......"
            className="p-3 rounded-lg focus:outline-none text-black w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="h-15 p-2 bg-slate-200 rounded" onClick={onToggleSearch}>Search</button>

        </div>
        <Link to="/cart" className="p-2 rounded ml-auto"><img src={cartIcon} alt="Cart" className="h-8 w-8" /></Link>
      </div>
    </>
  );
};

export default Navbar;
