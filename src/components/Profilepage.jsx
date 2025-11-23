import React from 'react';

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2023",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    avatar: "https://placehold.co/150x150/3b82f6/ffffff?text=JD"
  };

  const recentOrders = [
    { id: "#ORD-7752", date: "Oct 24, 2023", total: "$3,999.00", status: "Delivered" },
    { id: "#ORD-7751", date: "Oct 10, 2023", total: "$49.00", status: "Processing" },
    { id: "#ORD-7750", date: "Sep 12, 2023", total: "$199.00", status: "Delivered" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="md:col-span-1">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-50"
            />
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">Member since {user.joinDate}</p>
            
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Email Address</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Phone</label>
                <p className="text-gray-900 font-medium">{user.phone}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Shipping Address</label>
                <p className="text-gray-900 font-medium">{user.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Recent Orders
            </h3>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 last:pb-0 border-b last:border-0 border-gray-100">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-blue-600 hover:underline cursor-pointer">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-gray-900">{order.total}</p>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium mt-1 ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-blue-600 text-sm font-semibold hover:underline text-center">
              View All Orders
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;