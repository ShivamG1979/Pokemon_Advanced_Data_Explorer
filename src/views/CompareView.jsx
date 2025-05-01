// src/views/CompareView.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';
import LoadingSpinner from '../components/LoadingSpinner';
import StatBar from '../components/StatBar';

function CompareView() {
  const { pokemonData, loading } = usePokemon();
  const [selectedPokemon1, setSelectedPokemon1] = useState('');
  const [selectedPokemon2, setSelectedPokemon2] = useState('');

  const pokemon1 = useMemo(() => {
    if (!selectedPokemon1) return null;
    return pokemonData.find(p => p.id === parseInt(selectedPokemon1));
  }, [selectedPokemon1, pokemonData]);

  const pokemon2 = useMemo(() => {
    if (!selectedPokemon2) return null;
    return pokemonData.find(p => p.id === parseInt(selectedPokemon2));
  }, [selectedPokemon2, pokemonData]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="compare-view">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Compare Pokémon</h2>
        <Link to="/" className="btn btn-outline-dark">
          <i className="bi bi-arrow-left me-1"></i> Back to List
        </Link>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="pokemon1" className="form-label">First Pokémon</label>
          <select 
            id="pokemon1" 
            className="form-select border-dark" 
            value={selectedPokemon1}
            onChange={(e) => setSelectedPokemon1(e.target.value)}
          >
            <option value="">Select a Pokémon</option>
            {pokemonData.map(p => (
              <option key={p.id} value={p.id}>
                #{p.id} {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="pokemon2" className="form-label">Second Pokémon</label>
          <select 
            id="pokemon2" 
            className="form-select border-dark" 
            value={selectedPokemon2}
            onChange={(e) => setSelectedPokemon2(e.target.value)}
          >
            <option value="">Select a Pokémon</option>
            {pokemonData.map(p => (
              <option key={p.id} value={p.id}>
                #{p.id} {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(pokemon1 || pokemon2) && (
        <div className="comparison-result mt-4">
          <div className="row">
            <div className="col-md-6">
              {pokemon1 ? (
                <div className="card border-dark h-100">
                  <div className="card-header bg-black text-white text-center">
                    <h3 className="mb-0">#{pokemon1.id} {pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h3>
                  </div>
                  <div className="card-body text-center">
                    <img 
                      src={pokemon1.officialArtwork || pokemon1.image} 
                      alt={pokemon1.name} 
                      className="pokemon-compare-image mb-3" 
                    />
                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {pokemon1.types.map(type => (
                        <span 
                          key={`${pokemon1.id}-${type}`} 
                          className="badge bg-dark"
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      ))}
                    </div>
                    <div className="stats-container">
                      <StatBar label="HP" value={pokemon1.stats.hp} maxValue={255} />
                      <StatBar label="Attack" value={pokemon1.stats.attack} maxValue={255} />
                      <StatBar label="Defense" value={pokemon1.stats.defense} maxValue={255} />
                      <StatBar label="Special Attack" value={pokemon1.stats.special_attack} maxValue={255} />
                      <StatBar label="Special Defense" value={pokemon1.stats.special_defense} maxValue={255} />
                      <StatBar label="Speed" value={pokemon1.stats.speed} maxValue={255} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-light border h-100 d-flex align-items-center justify-content-center">
                  Select a Pokémon to compare
                </div>
              )}
            </div>
            <div className="col-md-6">
              {pokemon2 ? (
                <div className="card border-dark h-100">
                  <div className="card-header bg-black text-white text-center">
                    <h3 className="mb-0">#{pokemon2.id} {pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h3>
                  </div>
                  <div className="card-body text-center">
                    <img 
                      src={pokemon2.officialArtwork || pokemon2.image} 
                      alt={pokemon2.name} 
                      className="pokemon-compare-image mb-3" 
                    />
                    <div className="d-flex justify-content-center gap-2 mb-3">
                      {pokemon2.types.map(type => (
                        <span 
                          key={`${pokemon2.id}-${type}`} 
                          className="badge bg-dark"
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      ))}
                    </div>
                    <div className="stats-container">
                      <StatBar label="HP" value={pokemon2.stats.hp} maxValue={255} />
                      <StatBar label="Attack" value={pokemon2.stats.attack} maxValue={255} />
                      <StatBar label="Defense" value={pokemon2.stats.defense} maxValue={255} />
                      <StatBar label="Special Attack" value={pokemon2.stats.special_attack} maxValue={255} />
                      <StatBar label="Special Defense" value={pokemon2.stats.special_defense} maxValue={255} />
                      <StatBar label="Speed" value={pokemon2.stats.speed} maxValue={255} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-light border h-100 d-flex align-items-center justify-content-center">
                  Select a Pokémon to compare
                </div>
              )}
            </div>
          </div>

          {pokemon1 && pokemon2 && (
            <div className="comparison-summary card border-dark mt-4">
              <div className="card-header bg-black text-white">
                <h3 className="mb-0">Comparison Summary</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <h4>Stats Comparison</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Stat</th>
                          <th>{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</th>
                          <th>{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</th>
                          <th>Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>HP</td>
                          <td>{pokemon1.stats.hp}</td>
                          <td>{pokemon2.stats.hp}</td>
                          <td className={pokemon1.stats.hp > pokemon2.stats.hp ? 'text-success' : pokemon1.stats.hp < pokemon2.stats.hp ? 'text-danger' : ''}>
                            {pokemon1.stats.hp - pokemon2.stats.hp}
                          </td>
                        </tr>
                        <tr>
                          <td>Attack</td>
                          <td>{pokemon1.stats.attack}</td>
                          <td>{pokemon2.stats.attack}</td>
                          <td className={pokemon1.stats.attack > pokemon2.stats.attack ? 'text-success' : pokemon1.stats.attack < pokemon2.stats.attack ? 'text-danger' : ''}>
                            {pokemon1.stats.attack - pokemon2.stats.attack}
                          </td>
                        </tr>
                        <tr>
                          <td>Defense</td>
                          <td>{pokemon1.stats.defense}</td>
                          <td>{pokemon2.stats.defense}</td>
                          <td className={pokemon1.stats.defense > pokemon2.stats.defense ? 'text-success' : pokemon1.stats.defense < pokemon2.stats.defense ? 'text-danger' : ''}>
                            {pokemon1.stats.defense - pokemon2.stats.defense}
                          </td>
                        </tr>
                        <tr>
                          <td>Special Attack</td>
                          <td>{pokemon1.stats.special_attack}</td>
                          <td>{pokemon2.stats.special_attack}</td>
                          <td className={pokemon1.stats.special_attack > pokemon2.stats.special_attack ? 'text-success' : pokemon1.stats.special_attack < pokemon2.stats.special_attack ? 'text-danger' : ''}>
                            {pokemon1.stats.special_attack - pokemon2.stats.special_attack}
                          </td>
                        </tr>
                        <tr>
                          <td>Special Defense</td>
                          <td>{pokemon1.stats.special_defense}</td>
                          <td>{pokemon2.stats.special_defense}</td>
                          <td className={pokemon1.stats.special_defense > pokemon2.stats.special_defense ? 'text-success' : pokemon1.stats.special_defense < pokemon2.stats.special_defense ? 'text-danger' : ''}>
                            {pokemon1.stats.special_defense - pokemon2.stats.special_defense}
                          </td>
                        </tr>
                        <tr>
                          <td>Speed</td>
                          <td>{pokemon1.stats.speed}</td>
                          <td>{pokemon2.stats.speed}</td>
                          <td className={pokemon1.stats.speed > pokemon2.stats.speed ? 'text-success' : pokemon1.stats.speed < pokemon2.stats.speed ? 'text-danger' : ''}>
                            {pokemon1.stats.speed - pokemon2.stats.speed}
                          </td>
                        </tr>
                        <tr className="table-secondary">
                          <td><strong>Total</strong></td>
                          <td><strong>{Object.values(pokemon1.stats).reduce((a, b) => a + b, 0)}</strong></td>
                          <td><strong>{Object.values(pokemon2.stats).reduce((a, b) => a + b, 0)}</strong></td>
                          <td className={Object.values(pokemon1.stats).reduce((a, b) => a + b, 0) > Object.values(pokemon2.stats).reduce((a, b) => a + b, 0) ? 'text-success' : Object.values(pokemon1.stats).reduce((a, b) => a + b, 0) < Object.values(pokemon2.stats).reduce((a, b) => a + b, 0) ? 'text-danger' : ''}>
                            <strong>{Object.values(pokemon1.stats).reduce((a, b) => a + b, 0) - Object.values(pokemon2.stats).reduce((a, b) => a + b, 0)}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-4">
                    <h4>Type Comparison</h4>
                    <div className="mb-3">
                      <p><strong>{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}:</strong> {pokemon1.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}</p>
                      <p><strong>{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}:</strong> {pokemon2.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}</p>
                    </div>
                    <h4>Physical Comparison</h4>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Height</td>
                          <td>{pokemon1.height} m</td>
                          <td>{pokemon2.height} m</td>
                        </tr>
                        <tr>
                          <td>Weight</td>
                          <td>{pokemon1.weight} kg</td>
                          <td>{pokemon2.weight} kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-4">
                    <h4>Abilities</h4>
                    <div className="row">
                      <div className="col-6">
                        <h5>{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h5>
                        <ul className="list-group">
                          {pokemon1.abilities.map((ability, idx) => (
                            <li key={idx} className="list-group-item border-dark">
                              {ability.charAt(0).toUpperCase() + ability.slice(1).replace('-', ' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-6">
                        <h5>{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h5>
                        <ul className="list-group">
                          {pokemon2.abilities.map((ability, idx) => (
                            <li key={idx} className="list-group-item border-dark">
                              {ability.charAt(0).toUpperCase() + ability.slice(1).replace('-', ' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CompareView;