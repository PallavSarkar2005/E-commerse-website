import React, { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
  // 1. Get the ID from the URL (renamed variable to match standard)
  const { id } = useParams(); 
  const { addToCart } = useOutletContext();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Note: We use 'id' from useParams, not 'productId'
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Sending the whole object is usually safer
    }
  };

  if (loading) return <div className="text-center p-10 text-xl">Loading...</div>;

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back
      </Link>

      <div className="grid grid-cols-1 gap-3">
        {/* Image Section */}
        <div className="bg-white flex justify-center rounded-lg p-6 shadow-sm">
          <img
            src={product.image} // UPDATED: field is 'image', not 'imageUrl'
            alt={product.name}
            className="w-96 h-auto object-cover rounded-lg"
          />
        </div>

        {/* Title & Price Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl text-gray-800 mb-4">${product.price}</p> {/* Added $ sign */}
          
          <div className="flex items-center mb-4">
             <span className={product.countInStock > 0 ? "text-green-600" : "text-red-600"}>
               {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
             </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <button
              className={`w-full text-white p-3 rounded-lg text-lg ${
                product.countInStock === 0 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
            <button 
              className="w-full bg-orange-500 text-white p-3 rounded-lg text-lg hover:bg-orange-600"
              disabled={product.countInStock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Description</h1>
          <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">
            {product.description}
          </p>
        </div>

        {/* NOTE: The sections below (Box, Technical Details) are hidden 
           if the data doesn't exist in the database yet. 
        */}
        {product.box && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">What's in the box?</h1>
            <p className="text-gray-700">{product.box}</p>
          </div>
        )}

        {(product.technicaldetails || product.additionalinfo) && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
              {product.technicaldetails && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Technical Details</h2>
                  <p className="whitespace-pre-wrap">{product.technicaldetails}</p>
                </div>
              )}
              {product.additionalinfo && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
                  <p className="whitespace-pre-wrap">{product.additionalinfo}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Customer reviews ({product.numReviews})
          </h1>
          {/* We can map reviews here later */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;