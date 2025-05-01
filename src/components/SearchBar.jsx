// src/components/SearchBar.jsx
import { useState } from 'react';
import usePokemon from '../hooks/usePokemon';

function SearchBar() {
  const { handleSearch } = usePokemon();
  const [searchInput, setSearchInput] = useState('');

  const onInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearch(value);
  };

  return (
    <div className="search-container">
      <div className="input-group">
        <span className="input-group-text border-dark bg-black text-white">
          <i className="bi bi-search"></i>
        </span>
        <input 
          type="text" 
          className="form-control border-dark search-input"
          placeholder="Search Pokémon by name..." 
          value={searchInput}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;