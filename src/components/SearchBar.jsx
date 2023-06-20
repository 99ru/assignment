import React, { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by name" 
        value={search} 
        onChange={handleInputChange}
        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default SearchBar;
