import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (keyword.length > 1) {
        try {
          const response = await fetch(`/api/products?keyword=${keyword}`);
          const data = await response.json();
          setSuggestions(data.products || []);
        } catch (error) {
          console.error("Search error:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    setKeyword(''); 
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative w-full max-w-2xl" style={{ zIndex: 100 }}>
      <form onSubmit={submitHandler} className="relative w-full">
        <motion.input
          type="text"
          placeholder="Search for premium products..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          animate={{
            boxShadow: focused
              ? "0px 0px 18px rgba(251, 191, 36, 0.7)"
              : "0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.3 }}
          className="w-full p-2.5 pl-4 pr-12 rounded-lg border border-slate-700 bg-slate-800 text-gray-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all shadow-inner"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 text-slate-500 hover:text-amber-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </form>
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {suggestions.slice(0, 5).map((product) => (
              <div
                key={product._id}
                onClick={() => handleSuggestionClick(product._id)}
                className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-contain rounded bg-white/5 p-1"
                />
                <div>
                  <p className="text-gray-200 text-sm font-medium">{product.name}</p>
                  <div className='flex items-center gap-2'>
                    <p className="text-amber-400 text-xs font-bold">${product.price}</p>
                    {product.brand && <span className='text-xs text-gray-500'>| {product.brand}</span>}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;