import React, { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../constants";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useOutletContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-medium">Loading details...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 gap-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return to Shop</Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pb-24 md:pb-10">
      
      {/* Navigation Bar / Breadcrumbs */}
      <div className="sticky top-0 z-10 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT COLUMN: IMAGE (Sticky on Desktop) --- */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24 space-y-4"
            >
              <div className="relative aspect-square bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center p-8 group">
                <motion.img
                  key={product.image}
                  src={product.image}
                  alt={product.name}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-full h-full object-contain z-10 mix-blend-multiply"
                />
                
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Hot Deal
                </div>
              </div>

              {/* Thumbnail strip (Visual only for now) */}
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                 <div className="w-20 h-20 rounded-xl border-2 border-blue-500 p-2 bg-white cursor-pointer">
                   <img src={product.image} className="w-full h-full object-contain" alt="" />
                 </div>
                 {[1,2].map((i) => (
                   <div key={i} className="w-20 h-20 rounded-xl border border-gray-200 p-2 bg-white opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                     <img src={product.image} className="w-full h-full object-contain" alt="" />
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: PRODUCT INFO --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {"★".repeat(Math.round(product.rating || 4.5))}
                    <span className="text-gray-300">{"★".repeat(5 - Math.round(product.rating || 4.5))}</span>
                  </div>
                  <span className="text-blue-600 font-medium ml-1 underline cursor-pointer">
                    {product.numReviews || 128} Reviews
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  In Stock & Ready to Ship
                </div>
              </div>
            </div>

            {/* Price Block */}
            <div className="mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-xl text-gray-400 line-through mb-1.5">
                  ${(product.price * 1.25).toFixed(2)}
                </span>
                <span className="mb-1.5 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                  SAVE 25%
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Or pay <span className="font-semibold text-gray-900">${(product.price/4).toFixed(2)}/mo</span> with EMI.
              </p>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">About this item</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: "🚚", title: "Free Shipping", sub: "On orders over $50" },
                { icon: "🛡️", title: "Warranty", sub: "2 Years Included" },
                { icon: "🔄", title: "Returns", sub: "30 Days Policy" },
                { icon: "💳", title: "Secure", sub: "100% Protected" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <span className="text-xs font-bold text-gray-900">{item.title}</span>
                  <span className="text-[10px] text-gray-500">{item.sub}</span>
                </div>
              ))}
            </div>

            {/* MOBILE & DESKTOP ACTION BAR */}
            {/* On mobile, this sticks to bottom. On desktop, it flows normally. */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 md:static md:p-0 md:bg-transparent md:border-none">
              <div className="max-w-7xl mx-auto flex gap-4">
                
                {/* Quantity */}
                <div className="flex items-center bg-gray-100 rounded-xl h-14 px-2">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-full text-gray-500 hover:text-gray-900 text-2xl"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900 text-lg">
                    {qty}
                  </span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-full text-gray-500 hover:text-gray-900 text-2xl"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({ ...product, quantity: qty })}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-bold rounded-xl h-14 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </motion.button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;