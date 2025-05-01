// src/views/PokemonListView.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SortControls from '../components/SortControls';
import ItemsPerPageSelector from '../components/ItemsPerPageSelector';
import RandomPokemonButton from '../components/RandomPokemonButton';

function PokemonListView() {
  const { 
    paginatedPokemon, 
    loading, 
    error, 
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    setCurrentPage
  } = usePokemon();

  return (
    <div className="pokemon-list-view">
      <div className="controls-container mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <SearchBar />
          </div>
          <div className="col-md-6">
            <div className="d-flex gap-2">
              <TypeFilter />
              <Link to="/favorites" className="btn btn-outline-dark">
                <i className="bi bi-heart-fill me-1"></i> Favorites
              </Link>
              <Link to="/compare" className="btn btn-outline-dark">
                <i className="bi bi-bar-chart-fill me-1"></i> Compare
              </Link>
              <RandomPokemonButton />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <SortControls />
          </div>
          <div className="col-md-6 text-end">
            <ItemsPerPageSelector 
              itemsPerPage={itemsPerPage} 
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </div>
      </div>
      
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && paginatedPokemon.length === 0 && (
        <div className="alert alert-info rounded-4 shadow-sm">No Pokémon found matching your search criteria.</div>
      )}
      {!loading && !error && paginatedPokemon.length > 0 && (
        <>
          <PokemonList pokemon={paginatedPokemon} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default PokemonListView;
