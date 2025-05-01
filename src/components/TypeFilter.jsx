// src/components/TypeFilter.jsx
import React, { useEffect, useRef } from 'react';
import usePokemon from '../hooks/usePokemon';
import { Dropdown } from 'bootstrap';

function TypeFilter() {
  const { pokemonTypes, selectedTypes, handleTypeFilter, clearSelectedTypes } = usePokemon();
  const dropdownRef = useRef(null);
  const dropdownInstanceRef = useRef(null);

  // Initialize Bootstrap dropdown
  useEffect(() => {
    if (dropdownRef.current) {
      dropdownInstanceRef.current = new Dropdown(dropdownRef.current);
    }
    
    return () => {
      if (dropdownInstanceRef.current) {
        dropdownInstanceRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="dropdown">
      <button 
        ref={dropdownRef}
        className="btn btn-dark dropdown-toggle" 
        type="button" 
        id="typeFilterDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {selectedTypes.length === 0 ? 'Filter by Type' : `${selectedTypes.length} type(s) selected`}
      </button>
      <ul className="dropdown-menu dropdown-menu-light border-dark  p-2" aria-labelledby="typeFilterDropdown">
        {pokemonTypes.map(type => (
          <li key={type}>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="checkbox"
                id={`type-${type}`}
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeFilter(type)}
              />
              <label className="form-check-label text-black" htmlFor={`type-${type}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            </div>
          </li>
        ))}
        {selectedTypes.length > 0 && (
          <li className="mt-2">
            <button 
              className="btn btn-sm btn-outline-dark w-100"
              onClick={clearSelectedTypes}
            >
              Clear All
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default TypeFilter;