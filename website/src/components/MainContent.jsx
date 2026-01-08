import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://my-ecommerce-backend.vercel.app";

const MainContent = () => {
  const { searchTerm } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/products`);
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
    <div className="max-w-7xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 px-4">
        Latest Products
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden flex flex-col group"
            >
              <div className="h-48 w-full p-4 flex items-center justify-center bg-gray-50 group-hover:bg-white transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded">
                    {product.rating} ★
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
