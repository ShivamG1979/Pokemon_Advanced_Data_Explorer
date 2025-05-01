// src/components/ItemsPerPageSelector.jsx
function ItemsPerPageSelector({ itemsPerPage, setItemsPerPage }) {
    return (
      <div className="items-per-page-selector d-flex align-items-center">
        <span className="me-2">Items per page:</span>
        <div className="btn-group" role="group" aria-label="Items per page">
          <button 
            type="button" 
            className={`btn ${itemsPerPage === 10 ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setItemsPerPage(10)}
          >
            10
          </button>
          <button 
            type="button" 
            className={`btn ${itemsPerPage === 20 ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setItemsPerPage(20)}
          >
            20
          </button>
          <button 
            type="button" 
            className={`btn ${itemsPerPage === 50 ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setItemsPerPage(50)}
          >
            50
          </button>
        </div>
      </div>
    );
  }
  
  export default ItemsPerPageSelector;
  