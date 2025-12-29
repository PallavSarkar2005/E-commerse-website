import React, { useEffect, useState, useRef, useCallback } from "react";
import { useOutletContext, Link } from "react-router-dom";
import ProductRow from "./ProductRow"; // <--- Make sure this is imported!
import { motion } from "framer-motion";
import axios from 'axios';

// --- Card Component ---
const Card = ({ product }) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const fetchProducts = async (pageNumber, reset = false) => {
    if (loading && !reset) return; 
    
    try {
      setLoading(true);
      // Fetch data
      const { data } = await axios.get(`/api/products?pageNumber=${pageNumber}&keyword=${searchTerm || ''}`);
      let incomingProducts = [];
      let incomingPages = 1;

      if (data.products) {
        incomingProducts = data.products;
        incomingPages = data.pages;
      } else if (Array.isArray(data)) {
        incomingProducts = data;
      }
      if (reset) {
        setProducts(incomingProducts);
      } else {
        setProducts(prev => {
          const newItems = incomingProducts.filter(
            newItem => !prev.some(existingItem => existingItem._id === newItem._id)
          );
          return [...prev, ...newItems];
        });
      }
      setTotalPages(incomingPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load & Search Reset
  useEffect(() => {
    setPage(1);
    fetchProducts(1, true);
  }, [searchTerm]);

  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchProducts(nextPage, false);
          return nextPage;
        });
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, totalPages]);

  return (
    <div className="overflow-hidden pb-20">
      {searchTerm === "" && products.length > 0 && (
        <div className="mb-12">
          <ProductRow title="Trending Now" products={products.slice(0, 8)} />
        </div>
      )}

      <div className="px-2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          {searchTerm ? (
            <>Results for <span className="text-blue-600">"{searchTerm}"</span></>
          ) : ("All Products")}
        </h2>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <div ref={lastProductElementRef} key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Card product={product} />
                  </Link>
                </div>
              );
            } else {
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <Card product={product} />
                </Link>
              );
            }
          })}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-10 w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && (
           <div className="text-center py-20">
             <p className="text-xl text-gray-500">No products found.</p>
             <button onClick={() => fetchProducts(1, true)} className="mt-4 text-blue-600 underline">
               Reload
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;