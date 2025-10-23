import React, { useState } from "react";
import "./SearchBar.css";
import { MdFilterList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/alumni?name=${searchText}`);

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name , campus or graduation year..."
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <button className="filter-btn" onClick={handleSearch}>
        <MdFilterList className="filter-icon" />
        Filters
      </button>

      <div className="search-results">
        {results.map((item) => (
          <div key={item._id}>
            {item.name} | {item.batch} | {item.campus} | {item.graduationYear}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
