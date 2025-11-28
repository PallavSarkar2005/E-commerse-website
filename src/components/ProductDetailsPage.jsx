import React from "react";
import { allProducts } from "../data.js";
import { useParams, Link, useOutletContext } from "react-router-dom";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { addToCart } = useOutletContext();
  const product = allProducts.find((p) => p.id === parseInt(productId));
  if (!product) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Product Not Found </h1>
        <Link
          to="/"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          &larr;
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  return (
    <div className="max-w-4xl mx-auto ">
      {/* <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr;
      </Link> */}
      <div className="grid grid-cols-1 gap-3  ">
        <div className="bg-white flex justify-center rounded-lg p-6 shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-96 h-auto object-cover rounded-lg"
          />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-3xl text-gray-800 mb-4">{product.price}</p>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <button
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="w-full bg-orange-500 text-white p-3 rounded-lg text-lg hover:bg-orange-600">
              Buy Now
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Description</h1>
          <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">
            {product.description}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            What's in the box?
          </h1>
          <p className="text-gray-700">{product.box}</p>

          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
            From the manufacturer
          </h1>
          <div className="flex justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className=" w-96 h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className=" bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold mb-2">Technical Details</h2>
              <p className="whitespace-pre-wrap">{product.technicaldetails}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Additional Information
              </h2>
              <p className="whitespace-pre-wrap">{product.additionalinfo}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Customer reviews & say
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
