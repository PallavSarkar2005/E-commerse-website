import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductRow = ({ title, products }) => {
  const sliderRef = useRef(null);
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };
  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className="my-8 relative group">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="relative flex items-center">
        <button
          onClick={slideLeft}
          className="absolute left-0 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 border border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide flex gap-4 px-2 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hides scrollbar in Firefox/IE
        >
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <motion.div
                className="min-w-[260px] h-[340px] bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 pointer-events-none"
                />
                <h3 className="text-lg font-semibold text-gray-900 truncate whitespace-normal line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold mt-auto text-xl">
                  {product.price}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
        <button
          onClick={slideRight}
          className="absolute right-0 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-4 border border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
