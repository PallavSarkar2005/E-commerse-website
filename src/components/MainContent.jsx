import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import ProductRow from "./ProductRow";
import { motion } from "framer-motion";
import axios from 'axios';

// --- Vertical Card Component ---
const Card = ({ product }) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* FIXED IMAGE CONTAINER:
         1. bg-white: Clean white background
         2. flex items-center justify-center: Centers the image
         3. p-4: Adds padding so image doesn't touch edges
      */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          // FIXED IMAGE STYLING:
          // object-contain: Ensures whole image is visible
          // max-h/max-w: Prevents it from overflowing
          className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1">
        {product.name}
      </h3>
      <p className="text-blue-600 font-bold text-xl mt-auto">${product.price}</p>

      <button className="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
        View Details
      </button>
    </motion.div>
  );
};

const MainContent = () => {
  const { searchTerm } = useOutletContext();
  const [products, setProducts] = useState([]);

  // Fetch products from backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="overflow-hidden pb-20">
      {/* --- SECTION 1: HORIZONTAL SCROLL (Pass real data) --- */}
      {searchTerm === "" && (
        <div className="mb-12">
          <ProductRow title="Trending Now" products={products} />
        </div>
      )}

      {/* --- SECTION 2: VERTICAL SCROLL --- */}
      <div className="px-2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          {searchTerm ? (
            <>
              <span>Results for</span>
              <span className="text-blue-600">"{searchTerm}"</span>
            </>
          ) : (
            "All Products"
          )}
        </h2>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <Card product={product} />
            </Link>
          ))}
        </div>

        {/* No Results State */}
        {filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-xl text-gray-500 mb-4">
              No products found for "{searchTerm}"
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 font-medium hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;