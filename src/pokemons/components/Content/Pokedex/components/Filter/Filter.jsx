import { useEffect, useState } from "react";
import "./Filter.css";
import down from "../assets/down.svg";
import up from "../assets/up.svg";
import search from "../assets/search.svg";
import { pokemonService } from "../../../../../services/PokemonService";
import { Checkbox, SeekBar } from "./Components";

export const Filter = ({ setSearch }) => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(down);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [valueHeight, setValueHeight] = useState(0);
  const [valueWeight, setValueWeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await pokemonService.getTypes();
        setTypes(data);
        const pokemons = await pokemonService.getAllPokemons();
        if (pokemons.length === 0) {
          return;
        }
        const heights = pokemons.map((pokemon) => pokemon.height);
        const weights = pokemons.map((pokemon) => pokemon.weight);

        const minHeight = Math.min(...heights);
        const maxHeight = Math.max(...heights);
        const minWeight = Math.min(...weights);
        const maxWeight = Math.max(...weights);

        setStats({
          heights: {
            min: minHeight * 0.1,
            max: maxHeight * 0.1,
          },
          weights: {
            min: minWeight * 0.1,
            max: maxWeight * 0.1,
          },
        });
      } catch (err) {
        setError("Error al cargar los Pokémon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setSrc((prev) => (prev === down ? up : down));
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleClick = () => {
    setSearch(selectedTypes);
  };

  const handleClearSelection = () => {
    setSelectedTypes([]);
    setSearch([]);
    setValueHeight(stats.heights.min);
    setValueWeight(stats.weights.min);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="filter">
      <button className="filter-search" onClick={handleToggle}>
        Búsqueda avanzada <img src={src} alt="arrow" />
      </button>
      {open ? (
        loading ? (
          <div>Cargando ...</div>
        ) : (
          <div className="filter-container">
            <div className="filter-content">
              <div className="filter-types">
                <h2>Tipo</h2>
                <ul>
                  {types.map((type, index) => (
                    <Checkbox
                      key={index}
                      label={type.name}
                      id={type.name}
                      value={type.url}
                      checked={selectedTypes.includes(type.url)}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </ul>
              </div>
              <div className="filter-stats">
                <div className="height">
                  <h2>Altura</h2>
                  <SeekBar
                    min={stats.heights.min}
                    max={stats.heights.max}
                    step={0.1}
                    value={valueHeight}
                    onChange={setValueHeight}
                  />
                </div>

                <div className="weight">
                  <h2>Peso</h2>
                  <SeekBar
                    min={stats.weights.min}
                    max={stats.weights.max}
                    step={0.1}
                    value={valueWeight}
                    onChange={setValueWeight}
                  />
                </div>
              </div>
            </div>
            <div className="filter-btn">
              <button className="search" onClick={handleClick}>
                <img src={search} alt="search" />
                <strong>Buscar</strong>
              </button>
              <button className="clear" onClick={handleClearSelection}>
                <strong>Restablecer</strong>
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};
