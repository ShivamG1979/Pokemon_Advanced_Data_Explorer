// src/components/EvolutionChain.jsx
import { Link } from 'react-router-dom';

function EvolutionChain({ chain, pokemonData }) {
  // Find the Pokemon data for each evolution in the chain
  const evolutionData = chain.map(evolution => {
    const matchingPokemon = pokemonData.find(p => p.name === evolution.name);
    return matchingPokemon || { name: evolution.name, id: null };
  });

  return (
    <div className="evolution-chain">
      <div className="row justify-content-center">
        {evolutionData.map((pokemon, index) => (
          <div key={pokemon.name} className="col-md-4 text-center">
            {pokemon.id ? (
              <Link to={`/pokemon/${pokemon.id}`} className="evolution-link">
                <div className="card border-dark mb-3">
                  <div className="card-body">
                    <img 
                      src={pokemon.image} 
                      alt={pokemon.name} 
                      className="evolution-sprite mb-2" 
                    />
                    <p className="mb-0">#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="card border-dark mb-3">
                <div className="card-body">
                  <div className="placeholder-image mb-2"></div>
                  <p className="mb-0">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                  <small className="text-muted">(Not available)</small>
                </div>
              </div>
            )}
            
            {index < evolutionData.length - 1 && (
              <div className="evolution-arrow">
                <i className="bi bi-arrow-right"></i>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;