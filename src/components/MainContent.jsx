import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { allProducts } from "../data.js";
import ProductRow from "./ProductRow";
import { motion } from "framer-motion";

// --- Vertical Card Component ---
const Card = ({ name, price, imageUrl }) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1">
        {name}
      </h3>
      <p className="text-blue-600 font-bold text-xl mt-auto">{price}</p>

      <button className="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
        View Details
      </button>
    </motion.div>
  );
};

const MainContent = () => {
  const { searchTerm } = useOutletContext();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-hidden pb-20">
      {/* --- SECTION 1: HORIZONTAL SCROLL --- */}
      {searchTerm === "" && (
        <div className="mb-12">
          <ProductRow title="Trending Now" products={allProducts} />
        </div>
      )}

      {/* --- SECTION 1: VERTICAL SCROLL --- */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            </Link>
          ))}
        </div>

        {/* --- SECTION 2: HORIZONTAL SCROLL --- */}
        <div className="overflow-hidden pb-20">
          {searchTerm === "" && (
            <div className="mb-12">
              <ProductRow title="Trending Now" products={allProducts} />
            </div>
          )}
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              </Link>
            ))}
          </div>

          {/* No Results State */}
          {filteredProducts.length === 0 && searchTerm.length > 0 && (
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
    </div>
  );
};

export default MainContent;
