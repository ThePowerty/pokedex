import { useEffect, useState } from "react";
import "./Filter.css";
import down from "../assets/down.svg";
import up from "../assets/up.svg";
import search from "../assets/search.svg";
import { pokemonService } from "../../../../../services/PokemonService";

export const Filter = ({ setSearch }) => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(down);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await pokemonService.getTypes();
        setTypes(data);
      } catch (err) {
        console.error("Error al cargar los Pokémon", err);
      }
    };

    fetchTypes();
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
  };

  return (
    <div className="filter">
      <button className="filter-search" onClick={handleToggle}>
        Búsqueda avanzada <img src={src} alt="arrow" />
      </button>
      {open && (
        <div className="filter-content">
          <div className="filter-types">
            <p>Tipo</p>
            <ul>
              {types.map((type, index) => (
                <li className={type.name} key={index}>
                  <label>
                    {type.name}
                    <input
                      type="checkbox"
                      id={type.name}
                      value={type.url}
                      checked={selectedTypes.includes(type.url)}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-btn">
            <button className="search" onClick={handleClick}>
              <img src={search} alt="search" />
              Buscar
            </button>
            <button className="clear" onClick={handleClearSelection}>
              Restablecer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
