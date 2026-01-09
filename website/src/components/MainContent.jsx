import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-500">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Latest Products
        </h2>
        <span className="text-sm text-gray-500 hidden md:block">
          Scroll for more &rarr;
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No products found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-6 px-4 w-max mx-auto md:mx-0">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="min-w-[260px] md:min-w-[300px] bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group snap-center"
              >
                <div className="h-56 w-full p-6 flex items-center justify-center bg-gray-50 group-hover:bg-white transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors text-lg">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <span className="text-amber-500 text-sm mr-1">★</span>
                    <span className="text-sm font-medium text-gray-600">{product.rating || 4.5}</span>
                    <span className="text-xs text-gray-400 ml-2">({product.numReviews || 0} reviews)</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-xl font-extrabold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default MainContent;