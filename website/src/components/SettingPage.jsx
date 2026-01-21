import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../constants";

// --- HELPER COMPONENTS ---

const GlassInput = ({ label, type, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-blue-300 uppercase tracking-wider ml-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner backdrop-blur-sm"
    />
  </div>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors backdrop-blur-md">
    <span className="text-gray-200 font-medium">{label}</span>
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        checked ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`w-4 h-4 bg-white rounded-full shadow-md ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

// --- MAIN COMPONENT ---

const SettingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // User State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggles State
  const [toggles, setToggles] = useState({
    emailNotifs: true,
    pushNotifs: false,
    twoFactor: false,
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
    }
  }, [navigate]);

  // --- API UPDATE HANDLER ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
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

      const { data } = await axios.put(
        `${BASE_URL}/api/users/profile`,
        { name, email, password },
        config
      );

      setLoading(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setLoading(false);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Update Failed",
      });
    }
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Header Profile Card */}
            <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-1 shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {name || "User"}
                </h2>
                <p className="text-gray-400 text-sm">{email}</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <GlassInput
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <GlassInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        );

      case "security":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Change Password
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <GlassInput
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <GlassInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button
                onClick={handleUpdateProfile}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg border border-slate-600 transition-all"
              >
                Update Password
              </button>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                Two-Factor Authentication
              </h3>
              <ToggleSwitch
                label="Enable 2FA (Recommended)"
                checked={toggles.twoFactor}
                onChange={() =>
                  setToggles({ ...toggles, twoFactor: !toggles.twoFactor })
                }
              />
            </div>
          </motion.div>
        );

      case "notifications":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Notification Preferences
            </h3>
            <ToggleSwitch
              label="Email Notifications (Orders, Promos)"
              checked={toggles.emailNotifs}
              onChange={() =>
                setToggles({ ...toggles, emailNotifs: !toggles.emailNotifs })
              }
            />
            <ToggleSwitch
              label="Push Notifications (Mobile)"
              checked={toggles.pushNotifs}
              onChange={() =>
                setToggles({ ...toggles, pushNotifs: !toggles.pushNotifs })
              }
            />
          </motion.div>
        );

      case "billing":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <h3 className="text-xl font-bold text-white">Payment Methods</h3>

            {/* GLASS CREDIT CARD UI */}
            <div className="w-full max-w-sm h-56 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl backdrop-blur-md relative overflow-hidden p-6 flex flex-col justify-between group hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl -ml-10 -mb-10"></div>

              <div className="flex justify-between items-start z-10">
                <div className="text-white/80 font-bold tracking-widest text-lg">
                  HDFC BANK
                </div>
                <div className="text-white/80 italic font-serif">Visa</div>
              </div>

              <div className="z-10">
                <div className="flex gap-4 mb-2">
                  <div className="w-10 h-7 bg-yellow-400/80 rounded flex overflow-hidden">
                    <div className="w-1/2 h-full bg-orange-500/50"></div>
                  </div>
                  <div className="text-white font-mono text-xl tracking-widest drop-shadow-md">
                    •••• •••• •••• 4242
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-gray-300 uppercase tracking-widest">
                      Card Holder
                    </div>
                    <div className="text-white font-bold tracking-wide">
                      {name.toUpperCase() || "YOUR NAME"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-300 uppercase tracking-widest">
                      Expires
                    </div>
                    <div className="text-white font-bold">12/28</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors">
              <span className="text-2xl">+</span> Add New Payment Method
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans relative overflow-hidden pb-20 md:pb-0">
      
      {/* --- ANIMATED BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], rotate: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-20"
        />
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 h-full flex flex-col md:flex-row gap-8">
        
        {/* --- SIDEBAR --- */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="sticky top-24 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-8 px-2 tracking-tight">
              Settings
            </h1>
            <nav className="space-y-2">
              {[
                { id: "profile", label: "Profile", icon: "👤" },
                { id: "security", label: "Security", icon: "🔒" },
                { id: "notifications", label: "Notifications", icon: "🔔" },
                { id: "billing", label: "Billing", icon: "💳" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 text-left relative overflow-hidden group ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-xl relative z-10">{tab.icon}</span>
                  <span className="font-semibold relative z-10">
                    {tab.label}
                  </span>
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </nav>

            <div className="mt-10 pt-6 border-t border-white/5 px-2">
              <button
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-white text-sm flex items-center gap-2 transition-colors font-medium"
              >
                ← Return to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT PANEL --- */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl min-h-[600px]">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white capitalize">
                  {activeTab}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Manage preferences for {activeTab}
                </p>
              </div>
              
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 ${
                      message.type === "error"
                        ? "bg-red-500/20 text-red-200 border border-red-500/30"
                        : "bg-green-500/20 text-green-200 border border-green-500/30"
                    }`}
                  >
                    <span>{message.type === "error" ? "⚠️" : "✅"}</span>
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;