// src/components/LoadingSpinner.jsx
function LoadingSpinner({ size = 'lg' }) {
    const spinnerSize = size === 'sm' ? 'spinner-border-sm' : '';
    
    return (
      <div className="text-center my-5">
        <div className={`spinner-border ${spinnerSize}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading Pokémon data...</p>
      </div>
    );
  }
  
  export default LoadingSpinner;