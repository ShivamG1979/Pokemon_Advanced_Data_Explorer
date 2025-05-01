// src/hooks/usePokemon.js
import { useContext } from 'react';
import PokemonContext from '../contexts/PokemonContext';

const usePokemon = () => {
  return useContext(PokemonContext);
};

export default usePokemon;
