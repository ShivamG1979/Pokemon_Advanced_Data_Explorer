// src/components/RandomPokemonButton.jsx
import { useNavigate } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';

function RandomPokemonButton() {
  const { getRandomPokemon } = usePokemon();
  const navigate = useNavigate();

  const handleRandomPokemon = () => {
    const randomPokemon = getRandomPokemon();
    if (randomPokemon) {
      navigate(`/pokemon/${randomPokemon.id}`);
    }
  };

  return (
    <button 
      className="btn btn-dark" 
      onClick={handleRandomPokemon}
      title="View random Pokémon"
    >
      <i className="bi bi-shuffle"></i>
    </button>
  );
}

export default RandomPokemonButton;
