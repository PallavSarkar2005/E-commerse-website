import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get User Info from Local Storage (saved during Login)
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    // 1. Redirect if not logged in
    if (!userInfo) {
      navigate('/login');
      return;
    }

    // 2. Fetch My Orders
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, userInfo]);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: USER INFO --- */}
        <div className="md:col-span-1">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-50 bg-blue-100 flex items-center justify-center text-4xl text-blue-600 font-bold">
              {/* Show Initials */}
              {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{userInfo?.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{userInfo?.email}</p>
            
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Edit Profile
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem("userInfo");
                navigate('/login');
              }}
              className="w-full mt-3 bg-red-50 border border-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ORDER HISTORY --- */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Order History
            </h3>

            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 last:pb-0 border-b last:border-0 border-gray-100">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium text-blue-600 cursor-pointer">
                        ID: {order._id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date: {order.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-gray-900">
                        ${order.totalPrice}
                      </p>
                      
                      {/* Paid Status Badge */}
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium mt-1 mr-2 ${
                        order.isPaid 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </span>

                      {/* Delivery Status Badge */}
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium mt-1 ${
                        order.isDelivered 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;