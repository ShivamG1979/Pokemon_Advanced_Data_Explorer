// src/components/Header.jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header-container bg-black text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <Link to="/" className="text-decoration-none text-white">
              <h2 className="mb-0">Pokémon  Advanced Data Explorer</h2>
            </Link>
          </div>
          <div className="col-md-6">
            <nav className="d-flex justify-content-center justify-content-md-end">
              <Link to="/" className="btn btn-outline-light me-2">Home</Link>
              <Link to="/favorites" className="btn btn-outline-light me-2">Favorites</Link>
              <Link to="/compare" className="btn btn-outline-light">Compare</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;