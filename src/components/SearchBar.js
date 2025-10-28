import React, { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onFilter, searchText, setSearchText }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const batches = Array.from({ length: 16 }, (_, i) => 2010 + i); // 2010–2025

  return (
    <div className="search-container">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="filter-wrapper">
        <button
          className="filter-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MdFilterList className="filter-icon" />
          Filters
        </button>

        {showDropdown && (
          <div className="filter-dropdown">
            {batches.map((batch) => (
              <div
                key={batch}
                className="filter-item"
                onClick={() => {
                  setShowDropdown(false);
                  onFilter(batch);
                }}
              >
                {batch}
              </div>
            ))}
            <div
              className="filter-item"
              onClick={() => {
                setShowDropdown(false);
                onFilter(null); // clear batch filter
              }}
            >
              All 
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
