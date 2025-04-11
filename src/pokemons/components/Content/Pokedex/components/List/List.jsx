import { useEffect, useState } from "react";
import "./List.css";
import { pokemonService } from "../../../../../services/PokemonService";
import { Link } from "react-router-dom";

export const List = ({ search, filter }) => {
  const [limit, setLimit] = useState(12);
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true)
      try {
        let data;
        if (search.length === 0) {
          data = await pokemonService.getPokedex(limit);
        } else {
          data = await pokemonService.getPokemonByTypes(search);
        }
        if (filter.weight !== 0 || filter.height !== 0.1) {
          if(search.length === 0) data = await pokemonService.getAllPokemons();
          data = data.filter(pokemon => (pokemon.weight * 0.1) >= filter.weight && (pokemon.height * 0.1) >= filter.height);
        }
        setFiltered(data.length!==0)
        setPokemons(data);
      } catch (err) {
        setError("Error al cargar los Pokémon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [filter.height, filter.weight, limit, search]);

  const increaseLimit = () => {
    setLimit((prevLimit) => prevLimit + 12);
  };

  if (loading) {
    return <div>Cargando Pokémons ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {filtered ? (
        <>
          <ul className="pokemons">
            {pokemons.map((pokemon) => (
              <li className="pokemon" key={pokemon.id}>
                <h2>{pokemon.name}</h2>
                <Link to="">
                  <img src={pokemon.image} alt={pokemon.name} />
                </Link>
                <div className="tipos">
                  {pokemon.types.map((type, index) => (
                    <p className={type} key={index}>
                      {type}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={increaseLimit}
            hidden={search.length !== 0 ? true : false}
          >
            Ver más
          </button>
        </>
        
      ) : (
        <div className="filtered">
          <h2>No hay ningún Pokémon que coincida con tu búsqueda.</h2>
          <p>Intenta lo siguiente para encontrarlo: </p>
          <ul>
            <li>Reduce el número de parámetros de búsqueda.</li>
            <li>Selecciona menos tipos.</li>
            <li>Deja el campo de altura y peso por defecto.</li>
          </ul>
        </div>
      )}
    </>
  );
};
