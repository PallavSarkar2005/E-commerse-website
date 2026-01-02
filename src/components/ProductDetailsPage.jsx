import React, { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useOutletContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://e-commerce-api-wine.vercel.app/api/products/${id}`
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center">Loading product details...</div>;
  if (!product)
    return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN: PRODUCT IMAGE --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          // FIXED CONTAINER: White background, rounded corners, shadow, flex centering
          className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px] max-h-[600px]"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            // FIXED IMAGE: object-contain to prevent cropping
            className="w-full h-full max-h-[500px] object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* --- RIGHT COLUMN: DETAILS --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                In Stock
              </span>
              <div className="flex items-center text-amber-400 text-sm">
                <span>★★★★☆</span>
                <span className="text-gray-400 ml-1">(128 reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mt-auto border-t border-gray-100 pt-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Price</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold border-r"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium w-12 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold border-l"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => addToCart({ ...product, quantity: qty })}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all flex items-center justify-center gap-2 text-lg active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Add to Cart
              </button>

              <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
