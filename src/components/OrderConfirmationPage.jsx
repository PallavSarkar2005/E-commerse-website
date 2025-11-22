import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const orderId = Math.floor(10000 + Math.random() * 900000);
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
          Thank you for your purchase. We've received your order and will begin
          processing it right away.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
          <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Order Number
              </p>
              <p className="text-lg font-semibold text-gray-900">#{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Estimated Delivery
              </p>
              <p className="text-lg font-semibold text-green-600">
                {deliveryString}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Shipping To:</p>
            <p className="text-gray-900 font-medium">John Doe</p>
            <p className="text-gray-600">123 Main Street, Apt 4B</p>
            <p className="text-gray-600">New York, NY 10001</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
          >
            Continue Shopping
          </Link>

          <button className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            View Order Status
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
