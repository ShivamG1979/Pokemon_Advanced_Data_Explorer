// src/components/PokemonList.jsx
import { Link } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";

// Type → Bootstrap color mapping
function getTypeColor(type) {
  const typeColors = {
    normal: "secondary",
    fire: "danger",
    water: "primary",
    grass: "success",
    electric: "warning",
    ice: "info",
    fighting: "danger",
    poison: "secondary",
    ground: "warning",
    flying: "info",
    psychic: "danger",
    bug: "success",
    rock: "secondary",
    ghost: "dark",
    dragon: "primary",
    dark: "dark",
    steel: "secondary",
    fairy: "info",
  };
  return typeColors[type] || "secondary";
}

function PokemonList({ pokemon }) {
  const { favorites, toggleFavorite } = usePokemon();

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {pokemon.map((poke) => (
        <div key={poke.id} className="col">
          <div className="card h-100 shadow-lg border-dark">
            <div className="card-header bg-black text-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                #{poke.id}{" "}
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </h5>
              <button
                className="btn btn-sm btn-link text-white p-0"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(poke.id);
                }}
              >
                <i
                  className={`bi ${
                    favorites.includes(poke.id)
                      ? "bi-heart-fill text-danger"
                      : "bi-heart text-white"
                  }`}
                ></i>
              </button>
            </div>
            <Link
              to={`/pokemon/${poke.id}`}
              className="card-body text-center text-decoration-none"
            >
              <img
                src={poke.image}
                alt={poke.name}
                className="pokemon-sprite img-fluid mb-3"
              />
              <div className="d-flex justify-content-center gap-2">
                {poke.types.map((type) => {
                  const color = getTypeColor(type);
                  const textColor = ["warning", "info"].includes(color)
                    ? "text-dark"
                    : "text-white";
                  return (
                    <span
                      key={`${poke.id}-${type}`}
                      className={`badge bg-${color} ${textColor}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  );
                })}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
