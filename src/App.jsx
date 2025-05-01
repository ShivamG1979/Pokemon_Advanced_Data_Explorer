// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PokemonProvider } from "./contexts/PokemonContext"; // ✅ correct

import Header from './components/Header';
import PokemonListView from './views/PokemonListView';
import PokemonDetailView from './views/PokemonDetailView';
import FavoritesView from './views/FavoritesView';
import CompareView from './views/CompareView';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <PokemonProvider>
        <Router>
          <div className="app-container">
            <Header />
            <main className="container py-4">
              <Routes>
                <Route path="/" element={<PokemonListView />} />
                <Route path="/pokemon/:id" element={<PokemonDetailView />} />
                <Route path="/favorites" element={<FavoritesView />} />
                <Route path="/compare" element={<CompareView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <footer className="bg-black text-white py-4 mt-auto">
              <div className="container text-center">
                <p className="mb-0">Pokémon  Advanced Data Explorer &copy; 2025</p>
                <p className="mb-0 small">Data provided by <a href="https://pokeapi.co/" className="text-white">PokeAPI</a></p>
              </div>
            </footer>
          </div>
        </Router>
      </PokemonProvider>
    </ErrorBoundary>
  );
}

export default App;