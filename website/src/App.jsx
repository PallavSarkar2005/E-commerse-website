import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Meta from "./components/Meta"; 

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

  const addToCart = (product) => {
    if (!product || !product._id) return;

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
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <HelmetProvider>
      <Meta />     
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar
          onToggleSidebar={toggleSidebar}
          onSearch={setSearchTerm} 
          cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
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
                clearCart: clearCart,
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
    </HelmetProvider>
  );
}

export default App;