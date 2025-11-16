import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { allProducts } from "./data.js";

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

  const addToCart = (productId) => {
    const productToAdd = allProducts.find((p) => p.id === productId);
    if (!productToAdd) return;
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
    console.log("Product added to cart!");
  };
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onToggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onToggleSearch={handleSearch}
        cartItemCount={cartItems.length}
      />

      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <main className="w-full p-8 bg-gray-100">
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
    </div>
  );
}
export default App;
