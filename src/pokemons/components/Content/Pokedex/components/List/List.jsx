import { useEffect, useState } from "react";
import "./List.css";
import { pokemonService } from "../../../../../services/PokemonService";
import { Link } from "react-router-dom";

export const List = ({ search }) => {
  const [limit, setLimit] = useState(12);
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let data;
        if (search.length === 0) {
          data = await pokemonService.getPokedex(limit);
          setFiltered(true);
        } else {
          data = await pokemonService.getPokemonByTypes(search);
          if (data.length === 0) setFiltered(false);
        }
        setPokemons(data);
      } catch (err) {
        setError("Error al cargar los Pokémon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, search]);

  const increaseLimit = () => {
    setLimit((prevLimit) => prevLimit + 12);
  };

  if (loading) {
    return <div>Cargando...</div>;
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
