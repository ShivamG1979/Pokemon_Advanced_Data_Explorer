// src/contexts/PokemonContext.jsx
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [favorites, setFavorites] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Fetch list of first 150 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon list');
        }
        const data = await response.json();
        setTotalCount(data.count);
        
        // Fetch detailed data for each Pokémon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            return detailResponse.json();
          })
        );
        
        // Extract relevant information and format it
        const formattedPokemonData = pokemonDetails.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          officialArtwork: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types.map(type => type.type.name),
          stats: {
            hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
            attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
            defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
            special_attack: pokemon.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
            special_defense: pokemon.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
            speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
          },
          height: pokemon.height / 10, // Convert to meters
          weight: pokemon.weight / 10, // Convert to kg
          abilities: pokemon.abilities.map(ability => ability.ability.name),
          moves: pokemon.moves.slice(0, 10).map(move => move.move.name), // Get first 10 moves
          species_url: pokemon.species.url
        }));
        
        setPokemonData(formattedPokemonData);
        
        // Extract unique types for the filter dropdown
        const types = new Set();
        formattedPokemonData.forEach(pokemon => {
          pokemon.types.forEach(type => types.add(type));
        });
        setPokemonTypes(Array.from(types).sort());
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Get evolution chain
  const fetchEvolutionChain = useCallback(async (speciesUrl) => {
    try {
      const speciesResponse = await fetch(speciesUrl);
      if (!speciesResponse.ok) throw new Error('Failed to fetch species data');
      const speciesData = await speciesResponse.json();
      
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      if (!evolutionResponse.ok) throw new Error('Failed to fetch evolution data');
      const evolutionData = await evolutionResponse.json();
      
      const chain = [];
      let currentEvolution = evolutionData.chain;
      
      // Process the evolution chain
      while (currentEvolution) {
        if (currentEvolution.species) {
          chain.push({
            name: currentEvolution.species.name,
            url: currentEvolution.species.url
          });
        }
        
        // Move to the next evolution
        currentEvolution = currentEvolution.evolves_to && currentEvolution.evolves_to.length > 0 
          ? currentEvolution.evolves_to[0] 
          : null;
      }
      
      return chain;
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      return [];
    }
  }, []);

  // Filter and sort Pokémon based on search term, selected types, and sort options
  useEffect(() => {
    const filterAndSortPokemon = () => {
      // Filter by search term and types
      let filtered = pokemonData.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTypes = selectedTypes.length === 0 || 
                            selectedTypes.every(type => pokemon.types.includes(type));
        return matchesSearch && matchesTypes;
      });
      
      // Sort the filtered data
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        
        if (sortOption === 'id') {
          comparison = a.id - b.id;
        } else if (sortOption === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortOption === 'hp') {
          comparison = a.stats.hp - b.stats.hp;
        } else if (sortOption === 'attack') {
          comparison = a.stats.attack - b.stats.attack;
        } else if (sortOption === 'defense') {
          comparison = a.stats.defense - b.stats.defense;
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
      
      setFilteredPokemon(filtered);
    };
    
    filterAndSortPokemon();
  }, [searchTerm, selectedTypes, pokemonData, sortOption, sortDirection]);

  // Handle searching
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle type filtering
  const handleTypeFilter = useCallback((type) => {
    setSelectedTypes(prev => {
      // If type is already selected, remove it
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } 
      // Otherwise add it
      return [...prev, type];
    });
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Add clearSelectedTypes function
  const clearSelectedTypes = useCallback(() => {
    setSelectedTypes([]);
    setCurrentPage(1); // Reset to first page when clearing filters
  }, []);

  // Handle sorting
  const handleSort = useCallback((option) => {
    if (option === sortOption) {
      // Toggle direction if clicking the same option
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new option and default to ascending
      setSortOption(option);
      setSortDirection('asc');
    }
  }, [sortOption]);

  // Handle favorites toggle
  const toggleFavorite = useCallback((pokemonId) => {
    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(pokemonId)) {
        newFavorites = prev.filter(id => id !== pokemonId);
      } else {
        newFavorites = [...prev, pokemonId];
      }
      
      // Save to localStorage
      localStorage.setItem('pokemonFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Get favorite Pokémon
  const favoritePokemon = useMemo(() => {
    return pokemonData.filter(pokemon => favorites.includes(pokemon.id));
  }, [pokemonData, favorites]);

  // Get random Pokémon
  const getRandomPokemon = useCallback(() => {
    if (pokemonData.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    return pokemonData[randomIndex];
  }, [pokemonData]);

  // Get paginated Pokémon
  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredPokemon.length / itemsPerPage);
  }, [filteredPokemon.length, itemsPerPage]);

  // Provide the context value
  const contextValue = {
    pokemonData,
    filteredPokemon,
    paginatedPokemon,
    searchTerm,
    selectedTypes,
    loading,
    error,
    pokemonTypes,
    currentPage,
    itemsPerPage,
    sortOption,
    sortDirection,
    favorites,
    favoritePokemon,
    totalPages,
    totalCount,
    handleSearch,
    handleTypeFilter,
    clearSelectedTypes,  // Add the new function to the context value
    handleSort,
    toggleFavorite,
    getRandomPokemon,
    setCurrentPage,
    setItemsPerPage,
    fetchEvolutionChain
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;