import React from 'react';
import { Link } from 'react-router-dom';

const ProductRow = ({ title, products }) => {
  return (
    <div className="px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <Link 
            to={`/product/${product._id}`} 
            key={product._id} 
            className="min-w-[200px] md:min-w-[240px] bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex-shrink-0"
          >
            <div className="h-40 w-full mb-3 flex items-center justify-center p-2">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-800 line-clamp-1 text-sm">
              {product.name}
            </h3>
            <p className="text-green-600 font-bold mt-1">
              ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductRow;