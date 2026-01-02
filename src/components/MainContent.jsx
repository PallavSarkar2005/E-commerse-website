import React, { useEffect, useState } from "react";
import axios from "axios";

// SIMPLE DEBUG COMPONENT
const MainContent = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("Idle...");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const runTestFetch = async () => {
      try {
        setStatus("Fetching from https://e-commerce-api-wine.vercel.app...");
        
        // 1. Direct Fetch - No search params, no complexity
        const { data } = await axios.get("https://e-commerce-api-wine.vercel.app/api/products");
        
        console.log("API DATA:", data);

        if (data.products) {
          setProducts(data.products);
          setStatus(`Success! Found ${data.products.length} products.`);
        } else if (Array.isArray(data)) {
          setProducts(data);
          setStatus(`Success! Found ${data.length} products.`);
        } else {
          setStatus("Data fetched, but format is weird. Check Console.");
          setErrorMsg(JSON.stringify(data));
        }

      } catch (err) {
        console.error("FETCH ERROR:", err);
        setStatus("FAILED.");
        // This will show us if it's a CORS error or 404
        setErrorMsg(err.message + (err.response ? " - " + JSON.stringify(err.response.data) : ""));
      }
    };

    runTestFetch();
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Debug Mode</h1>
      
      {/* STATUS BOX */}
      <div className={`p-4 rounded mb-6 ${errorMsg ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
        <p className="font-bold">Status: {status}</p>
        {errorMsg && <p className="font-mono text-sm mt-2 break-all">{errorMsg}</p>}
      </div>

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow bg-white">
            <img src={p.image} alt="product" className="h-32 w-full object-contain mb-2" />
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-blue-600">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;