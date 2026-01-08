import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword);
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex w-full">
      <input
        type="text"
        name="q"
        value={keyword}
        onChange={handleChange}
        placeholder="Search for products, brands and more"
        className="w-full px-4 py-2.5 rounded-l-lg text-gray-700 bg-white border-none focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-r-lg transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBox;