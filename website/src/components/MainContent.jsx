import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../constants";

const MainContent = () => {
  const { searchTerm } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        if (data.products) {
          setProducts(data.products);
        } else if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-16 h-16 bg-blue-600 rounded-full blur-xl mb-4"
        />
        <p className="text-gray-900 font-bold tracking-widest uppercase text-sm">Loading Store</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* 1. HERO BANNER - FULL WIDTH */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Animated Background Mesh */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-[120px] opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4"
          >
            NEXT GEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">STORE</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
          >
            Experience the future of shopping with our curated collection of premium products.
          </motion.p>
        </div>
      </div>

      {/* 2. FEATURED ROW (Full Width Scroll) */}
      <div className="w-full bg-gray-50 border-b border-gray-200 py-10">
        <div className="px-6 md:px-10 mb-6 flex items-end justify-between">
          <div>
            <span className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-1 block">Don't Miss Out</span>
            <h2 className="text-3xl font-bold text-gray-900">Featured Drops</h2>
          </div>
          <div className="hidden md:flex gap-2 text-gray-400 text-sm">
            <span>Scroll</span> <span>&rarr;</span>
          </div>
        </div>

        <div className="w-full overflow-x-auto hide-scrollbar px-6 md:px-10 pb-8">
          <div className="flex gap-6 w-max">
            {filteredProducts.slice(0, 8).map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="relative group w-[300px] h-[400px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex-shrink-0"
              >
                <div className="absolute inset-0 p-8 flex items-center justify-center bg-gray-100 group-hover:bg-white transition-colors duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-xl mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-lg">${product.price}</span>
                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. THE WALL OF PRODUCTS (Full Width Grid) */}
      <div className="w-full px-4 md:px-8 py-16 bg-white">
        <div className="flex items-center justify-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase border-b-4 border-blue-600 pb-2">
            All Products
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found matching your search.</div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <Link
                  to={`/product/${product._id}`}
                  className="block group relative bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                >
                  {/* Image Area - Taller Aspect Ratio */}
                  <div className="aspect-[3/4] p-6 flex items-center justify-center relative overflow-hidden">
                     <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Floating Add Button */}
                    <button className="absolute bottom-4 right-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  {/* Info Area */}
                  <div className="p-4 pt-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      <div className="flex items-center text-xs text-amber-500 font-medium">
                        ★ {product.rating || 4.5}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 0px;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default MainContent;