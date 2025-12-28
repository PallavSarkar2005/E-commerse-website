import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  // UPDATED: Now accepts the full 'product' object, not just an ID
  const addToCart = (product) => {
    if (!product || !product._id) return; // Safety check

    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    console.log("Product added to cart:", product.name);
  };

  // UPDATED: Filters by _id
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar
        onToggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onToggleSearch={handleSearch}
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} // Shows total quantity, not just unique items
      />

      <div className="flex flex-1">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <main className="w-full p-4 md:p-8 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
          <Outlet
            context={{
              searchTerm: searchTerm,
              addToCart: addToCart,
              cartItems: cartItems,
              removeFromCart: removeFromCart,
            }}
          />
        </main>
      </div>

      <Footer />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default App;