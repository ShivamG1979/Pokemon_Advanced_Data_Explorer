// src/views/FavoritesView.jsx
import { Link } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';
import PokemonList from '../components/PokemonList';
import LoadingSpinner from '../components/LoadingSpinner';

function FavoritesView() {
  const { favoritePokemon, loading } = usePokemon();

  return (
    <div className="favorites-view">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Favorite Pokémon</h2>
        <Link to="/" className="btn btn-outline-dark">
          <i className="bi bi-arrow-left me-1"></i> Back to List
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : favoritePokemon.length === 0 ? (
        <div className="alert alert-info">
          <h4>No favorites yet!</h4>
          <p>Click the heart icon on any Pokémon to add it to your favorites.</p>
          <Link to="/" className="btn btn-dark mt-2">Explore Pokémon</Link>
        </div>
      ) : (
        <PokemonList pokemon={favoritePokemon} />
      )}
    </div>
  );
}

export default FavoritesView;