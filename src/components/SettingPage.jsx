import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  
  // User Data State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Settings State (Visual only for now)
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // NOTE: You need to create this route in Backend to handle Profile Updates
      // For now, let's assume standard PUT /api/users/profile
      // Since we haven't built that specific route yet, this might 404.
      // But this is the correct frontend logic.
      const { data } = await axios.put(
        "/api/users/profile",
        { name, email, password },
        config
      );

      setLoading(false);
      setMessage({ type: "success", text: "Profile Updated Successfully" });
      
      // Update Local Storage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      // Fallback for demo if backend route missing
      setMessage({ type: "error", text: "Update Failed (Backend route needed)" });
    }
  };

  // --- SUB-COMPONENTS ---
  
  const AccountSettings = () => (
    <div className="animate-fade-in">
      <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
        {message && (
          <div className={`p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Leave blank to keep current"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">Dark Mode</p>
          <p className="text-sm text-gray-500">Easier on the eyes in low light.</p>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'Account': return <AccountSettings />;
      case 'Appearance': return <AppearanceSettings />;
      default: return (
        <div className="p-10 text-center text-gray-500">
          This section is under development.
        </div>
      );
    }
  };

  const ListItem = ({ title, subtitle, iconColor, iconPath, section }) => (
    <button 
      onClick={() => setActiveSection(section)}
      className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group border-b border-gray-50 last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconColor}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <span className="text-gray-400 group-hover:text-blue-500 transition-colors">›</span>
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex items-center mb-6">
        {activeSection && (
          <button 
            onClick={() => setActiveSection(null)}
            className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-800">
          {activeSection ? activeSection : 'Settings'}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden min-h-[500px]">
        {!activeSection ? (
          <div>
            <ListItem 
              section="Account"
              title="Account" 
              subtitle="Profile details & password" 
              iconColor="bg-blue-100 text-blue-600"
              iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
            <ListItem 
              section="Appearance"
              title="Appearance" 
              subtitle="Dark mode settings" 
              iconColor="bg-purple-100 text-purple-600"
              iconPath="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
             <ListItem 
              section="Notifications"
              title="Notifications" 
              subtitle="Manage alerts (Coming Soon)" 
              iconColor="bg-yellow-100 text-yellow-600"
              iconPath="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default SettingsPage;