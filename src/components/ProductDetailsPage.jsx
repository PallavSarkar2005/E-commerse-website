import React from "react";
import { useParams, Link } from "react-router-dom";
import iphoneIcon from "../assets/images/iphone-15.jpg";
import dellIcon from "../assets/images/dell xps.jpg";

const allProducts = [
  {
    id: 1,
    name: "Apple iphone 15",
    price: "$3999",
    imageUrl: iphoneIcon,
    description: "The latest iPhone with a stunning display and A17 chip.",
  },
  {
    id: 2,
    name: "Dell xps laptop",
    price: "$4599",
    imageUrl: dellIcon,
    description: "A powerful and sleek laptop for all your professional needs.",
  },
];

const ProductDetailsPage = () => {
  const { productId } = useParams();
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        &larr;
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl text-gray-800 mb-4">{product.price}</p>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
