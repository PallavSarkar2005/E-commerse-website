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
    return <div className="min-h-screen flex items-center justify-center text-white">Loading product details...</div>;
  if (!product)
    return <div className="min-h-screen flex items-center justify-center text-white">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-6 transition-colors font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/10 flex items-center justify-center min-h-[400px] max-h-[600px]"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full h-full max-h-[500px] object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                In Stock
              </span>
              <div className="flex items-center text-amber-400 text-sm">
                <span>★★★★☆</span>
                <span className="text-gray-400 ml-1">({product.numReviews || 0} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mt-auto border-t border-white/10 pt-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Price</p>
                <p className="text-4xl font-bold text-blue-400">
                  ${product.price}
                </p>
              </div>

              <div className="flex items-center border border-gray-600 rounded-lg bg-slate-800">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-slate-700 text-white font-bold border-r border-gray-600"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium w-12 text-center text-white">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 hover:bg-slate-700 text-white font-bold border-l border-gray-600"
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;