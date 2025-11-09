import React from "react";
import { useOutletContext, Link } from "react-router-dom";

const Card = ({ name, price, imageUrl }) => {
  return (
    <>
      <div className="bg-slate-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <img src= {imageUrl} alt= {name} className="w-full h-40 object-cover rounded-md mb-4" />
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-gray-800 mt-2">{price}</p>
      </div>
    </>
  );
};
const allProducts = [
  { id: 1, name: "Apple iphone 15", price: "$3999", imageUrl: "https://placehold.co/600x400/3498db/ffffff?text=iPhone+15" },
  { id: 2, name: "Dell xps laptop", price: "$4599", imageUrl: "https://placehold.co/600x400/2ecc71/ffffff?text=Dell+XPS" },
  { id: 3, name: "Hp Victus laptop", price: "$36500", imageUrl: "https://placehold.co/600x400/e74c3c/ffffff?text=HP+Victus" },
  { id: 4, name: "Xiamomi 11s", price: "$1999", imageUrl: "https://placehold.co/600x400/f39c12/ffffff?text=Xiaomi+11s" },
  { id: 5, name: "Boat Earburds", price: "$199", imageUrl: "https://placehold.co/600x400/9b59b6/ffffff?text=Boat+Earbuds" },
  { id: 6, name: "Mi charger", price: "$49", imageUrl: "https://placehold.co/600x400/34495e/ffffff?text=Mi+Charger" },
  { id: 7, name: "Boat Wired Headphones", price: "$49", imageUrl: "https://placehold.co/600x400/1abc9c/ffffff?text=Boat+Headphones" },
  { id: 8, name: "Kreo Mouse", price: "$499", imageUrl: "https://placehold.co/600x400/e67e22/ffffff?text=Kreo+Mouse" },
  { id: 9, name: "Hp 4 series", price: "$2999", imageUrl: "https://placehold.co/600x400/d35400/ffffff?text=HP+4+Series" },
  { id: 10, name: "Asus Laptop", price: "$3999", imageUrl: "https://placehold.co/600x400/c0392b/ffffff?text=Asus+Laptop" },
  { id: 11, name: "Xiamomi Powerbank", price: "$199", imageUrl: "https://placehold.co/600x400/8e44ad/ffffff?text=Powerbank" },
];

const MainContent = () => {

  const {searchTerm} = useOutletContext();
   const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
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
      {filteredProducts.length === 0 && searchTerm.length > 0 && (
        <p className="p-2 text-gray-500">
          No products found for "{searchTerm}"
        </p>
      )}
    </div>
  );
};


export default MainContent;
