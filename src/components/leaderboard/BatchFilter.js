// src/components/leaderboard/BatchFilter.js

import React, { useState } from 'react';
import './BatchFilter.css';

const BatchFilter = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('all');

  // YE SAB BATCHES HAIN
  const batches = [
    { value: 'all', label: 'All Batches' },
    { value: 'fall-2021', label: 'Fall 2021' },
    { value: 'spring-2021', label: 'Spring 2021' },
    { value: 'fall-2022', label: 'Fall 2022' },
    { value: 'spring-2022', label: 'Spring 2022' },
    { value: 'fall-2023', label: 'Fall 2023' },
    { value: 'spring-2023', label: 'Spring 2023' },
    { value: 'fall-2024', label: 'Fall 2024' },
    { value: 'spring-2024', label: 'Spring 2024' },
  ];

  const handleClick = (value) => {
    setSelected(value);
    onFilter(value); // Ye parent ko batata hai
    setIsOpen(false);
  };

  return (
    <div className="batch-filter">
      <button className="filter-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-calendar-alt"></i> Batch
        <i className={`fas fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="dropdown">
          {batches.map((batch) => (
            <div
              key={batch.value}
              className={`dropdown-item ${selected === batch.value ? 'active' : ''}`}
              onClick={() => handleClick(batch.value)}
            >
              {batch.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BatchFilter;