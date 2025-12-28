import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { clearCart } = useOutletContext(); // Get clearCart function
  
  // 1. Get the Real Order ID passed from Checkout
  const orderId = location.state?.orderId || "Processing...";

  // 2. Clear the cart when this page loads (since purchase is done)
  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, []); // Run once on mount

  // Calculate delivery date (5 days from now)
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 5);
  const deliveryString = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
          <svg
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. We have received your order.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
          <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Order ID
              </p>
              {/* Show Real MongoDB ID */}
              <p className="text-sm font-mono font-semibold text-gray-900 break-all">
                {orderId}
              </p>
            </div>
            <div className="text-right pl-4">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Est. Delivery
              </p>
              <p className="text-lg font-semibold text-green-600">
                {deliveryString}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Status:</p>
            <p className="text-gray-900 font-medium">Processing</p>
            <p className="text-xs text-gray-400 mt-2">
              (You can view detailed history in your profile soon)
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;