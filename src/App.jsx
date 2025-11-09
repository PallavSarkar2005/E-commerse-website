import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onToggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onToggleSearch={handleSearch}
      />

      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <main className="w-full p-8 bg-gray-100">
          <Outlet context={{searchTerm: searchTerm}} />

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
