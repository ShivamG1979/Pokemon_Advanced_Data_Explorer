// src/components/SortControls.jsx
import usePokemon from '../hooks/usePokemon';

function SortControls() {
  const { sortOption, sortDirection, handleSort } = usePokemon();

  return (
    <div className="sort-controls">
      <div className="btn-group" role="group" aria-label="Sort controls">
        <button 
          type="button" 
          className={`btn ${sortOption === 'id' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => handleSort('id')}
        >
          # {sortOption === 'id' && (
            <i className={`bi bi-arrow-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
          )}
        </button>
        <button 
          type="button" 
          className={`btn ${sortOption === 'name' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => handleSort('name')}
        >
          Name {sortOption === 'name' && (
            <i className={`bi bi-arrow-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
          )}
        </button>
        <button
          type="button" 
          className={`btn ${sortOption === 'hp' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => handleSort('hp')}
        >
          HP {sortOption === 'hp' && (
            <i className={`bi bi-arrow-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
          )}
        </button>
        <button
          type="button" 
          className={`btn ${sortOption === 'attack' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => handleSort('attack')}
        >
          Attack {sortOption === 'attack' && (
            <i className={`bi bi-arrow-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default SortControls;