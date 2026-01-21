import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBoxOpen, FaCog, FaSignOutAlt, FaCheckCircle, FaTimesCircle, FaTruck, FaClock } from 'react-icons/fa';
import { BASE_URL } from '../constants';

// --- HELPER COMPONENT: GLASS INPUT ---
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

const ProfilePage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState("");
  
  // Tab State
  const [activeTab, setActiveTab] = useState('orders');

  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 1. Initial Load
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      fetchOrders();
    }
  }, [navigate]);

  // 2. Fetch Orders
  const fetchOrders = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get(`${BASE_URL}/api/orders/myorders`, config);
      setOrders(data);
      setLoadingOrders(false);
    } catch (err) {
      setErrorOrders(err.response?.data?.message || err.message);
      setLoadingOrders(false);
    }
  };

  // 3. Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateMessage(null);

    if (password && password !== confirmPassword) {
      setUpdateMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setUpdateLoading(true);
    try {
      const config = {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}` 
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/users/profile`,
        { name, email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUpdateMessage({ type: 'success', text: 'Profile Updated Successfully!' });
      setUpdateLoading(false);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setUpdateMessage({ 
        type: 'error', 
        text: err.response?.data?.message || "Update failed" 
      });
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate('/login');
  };

  // --- ANIMATIONS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans relative overflow-hidden pb-20 pt-10 px-4">
      
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        
        {/* --- LEFT SIDEBAR: PROFILE CARD --- */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-24">
            
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-blue-500 to-purple-600 p-1 shadow-lg shadow-purple-500/30 mb-4">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : <FaUser />}
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">{userInfo?.name}</h2>
              <p className="text-sm text-blue-300 font-medium">{userInfo?.email}</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'orders', label: 'My Orders', icon: <FaBoxOpen /> },
                { id: 'settings', label: 'Settings', icon: <FaCog /> }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/5">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all font-bold"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl min-h-[600px]">
            
            <AnimatePresence mode='wait'>
              
              {/* === TAB: ORDER HISTORY === */}
              {activeTab === 'orders' && (
                <motion.div 
                  key="orders"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="text-blue-400"><FaBoxOpen /></span> Order History
                  </h3>

                  {loadingOrders ? (
                    <div className="flex justify-center py-20">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : errorOrders ? (
                    <div className="bg-red-500/20 text-red-200 p-4 rounded-xl border border-red-500/50">{errorOrders}</div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      <FaBoxOpen className="mx-auto text-6xl mb-4 opacity-20" />
                      <p className="text-lg">No orders found yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <motion.div 
                          whileHover={{ scale: 1.01, backgroundColor: "rgba(30, 41, 59, 0.7)" }}
                          key={order._id} 
                          className="bg-slate-800/50 border border-white/5 rounded-2xl p-5 transition-all flex flex-col md:flex-row justify-between md:items-center gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">ID: {order._id}</span>
                              <span className="text-xs text-gray-500">• {order.createdAt.substring(0, 10)}</span>
                            </div>
                            <p className="text-xl font-bold text-white">${order.totalPrice}</p>
                          </div>

                          <div className="flex gap-3">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${order.isPaid ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                              {order.isPaid ? <FaCheckCircle /> : <FaTimesCircle />}
                              {order.isPaid ? "PAID" : "UNPAID"}
                            </div>

                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${order.isDelivered ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                              {order.isDelivered ? <FaTruck /> : <FaClock />}
                              {order.isDelivered ? "DELIVERED" : "PROCESSING"}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* === TAB: SETTINGS === */}
              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="text-blue-400"><FaCog /></span> Edit Profile
                  </h3>

                  {updateMessage && (
                      <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl mb-6 flex items-center gap-3 border ${
                              updateMessage.type === 'error' 
                              ? 'bg-red-500/20 text-red-200 border-red-500/50' 
                              : 'bg-green-500/20 text-green-200 border-green-500/50'
                          }`}
                      >
                          {updateMessage.type === 'error' ? <FaTimesCircle /> : <FaCheckCircle />}
                          {updateMessage.text}
                      </motion.div>
                  )}

                  <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassInput label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <GlassInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      
                      <div className="pt-6 border-t border-white/10">
                        <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                          <FaCog className="text-blue-400"/> Security (Leave blank to keep current)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <GlassInput label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                           <GlassInput label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={updateLoading}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 disabled:opacity-50"
                        >
                            {updateLoading ? 'Updating...' : 'Save Changes'}
                        </button>
                      </div>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ProfilePage;