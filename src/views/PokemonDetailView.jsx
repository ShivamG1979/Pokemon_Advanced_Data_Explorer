// src/views/PokemonDetailView.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import StatBar from '../components/StatBar';
import EvolutionChain from '../components/EvolutionChain';

function PokemonDetailView() {
  const { id } = useParams();
  const { pokemonData, loading, error, favorites, toggleFavorite, fetchEvolutionChain } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loadingEvolution, setLoadingEvolution] = useState(false);

  useEffect(() => {
    if (pokemonData.length > 0) {
      const foundPokemon = pokemonData.find(p => p.id === parseInt(id) || p.name === id);
      if (foundPokemon) {
        setPokemon(foundPokemon);
        
        // Fetch evolution chain
        setLoadingEvolution(true);
        fetchEvolutionChain(foundPokemon.species_url)
          .then(chain => {
            setEvolutionChain(chain);
            setLoadingEvolution(false);
          })
          .catch(() => {
            setEvolutionChain([]);
            setLoadingEvolution(false);
          });
      }
    }
  }, [id, pokemonData, fetchEvolutionChain]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return <ErrorMessage message="Pokémon not found" />;

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="pokemon-detail-view">
      <div className="mb-3">
        <Link to="/" className="btn btn-outline-dark">
          <i className="bi bi-arrow-left me-1"></i> Back to List
        </Link>
      </div>

      <div className="card shadow-lg border-dark">
        <div className="card-header bg-black text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <button 
            className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-light'}`}
            onClick={() => toggleFavorite(pokemon.id)}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5 text-center">
              <img 
                src={pokemon.officialArtwork || pokemon.image} 
                alt={pokemon.name} 
                className="img-fluid pokemon-detail-image mb-3"
              />
              <div className="d-flex justify-content-center gap-2 mb-3">
                {pokemon.types.map(type => (
                  <span 
                    key={`${pokemon.id}-${type}`} 
                    className="badge bg-dark"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
              <div className="pokemon-physical-stats">
                <p><strong>Height:</strong> {pokemon.height} m</p>
                <p><strong>Weight:</strong> {pokemon.weight} kg</p>
              </div>
            </div>
            <div className="col-md-7">
              <h3 className="mb-3">Stats</h3>
              <div className="stats-container mb-4">
                <StatBar label="HP" value={pokemon.stats.hp} maxValue={255} />
                <StatBar label="Attack" value={pokemon.stats.attack} maxValue={255} />
                <StatBar label="Defense" value={pokemon.stats.defense} maxValue={255} />
                <StatBar label="Special Attack" value={pokemon.stats.special_attack} maxValue={255} />
                <StatBar label="Special Defense" value={pokemon.stats.special_defense} maxValue={255} />
                <StatBar label="Speed" value={pokemon.stats.speed} maxValue={255} />
              </div>
              
              <h3 className="mb-3">Abilities</h3>
              <div className="abilities-container mb-4">
                <ul className="list-group">
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index} className="list-group-item border-dark">
                      {ability.charAt(0).toUpperCase() + ability.slice(1).replace('-', ' ')}
                    </li>
                  ))}
                </ul>
              </div>
              
              <h3 className="mb-3">Moves</h3>
              <div className="moves-container">
                <div className="row row-cols-2 g-2">
                  {pokemon.moves.map((move, index) => (
                    <div key={index} className="col">
                      <div className="badge bg-light text-dark w-100 p-2 border">
                        {move.charAt(0).toUpperCase() + move.slice(1).replace('-', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="evolution-section mt-4">
            <h3 className="mb-3">Evolution Chain</h3>
            {loadingEvolution ? (
              <div className="text-center"><LoadingSpinner size="sm" /></div>
            ) : evolutionChain.length <= 1 ? (
              <p>This Pokémon does not evolve.</p>
            ) : (
              <EvolutionChain chain={evolutionChain} pokemonData={pokemonData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailView;
