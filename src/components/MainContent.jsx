import React from "react";
import { useOutletContext } from "react-router-dom";
import iphoneIcon from  "../assets/images/iphone-15.jpg";
import dellIcon from  "../assets/images/dell xps.jpg";
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
  { id: 1, name: "Apple iphone 15", price: "$3999",imageUrl: iphoneIcon },
  { id: 2, name: "Dell xps laptop", price: "$4599", imageUrl: dellIcon },
  { id: 3, name: "Hp Victus laptop", price: "$36500" },
  { id: 4, name: "Xiamomi 11s", price: "$1999" },
  { id: 5, name: "Boat Earburds", price: "$199" },
  { id: 6, name: "Mi charger", price: "$49" },
  { id: 7, name: "Boat Wired Headphones", price: "$49" },
  { id: 8, name: "Kreo Mouse", price: "$499" },
  { id: 9, name: "Hp 4 series", price: "$2999" },
  { id: 10, name: "Asus Laptop", price: "$3999" },
  { id: 11, name: "Xiamomi Powerbank", price: "$199" },
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
          <Card key={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} />
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
