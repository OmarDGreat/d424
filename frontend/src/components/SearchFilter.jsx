import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Call the onSearch function passed as a prop
  };

  return (
    <div className="search-filter mb-4">
      <input
        type="text"
        className="input"
        placeholder="Search products..."
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchFilter;
