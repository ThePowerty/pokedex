import { useEffect, useState } from "react";
import "./List.css";
import { pokemonService } from "../../../../../services/PokemonService";
import { Link } from "react-router-dom";

export const List = ({ search }) => {
  const [limit, setLimit] = useState(12);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        if (search.length === 0) {
          const data = await pokemonService.getPokedex(limit);
          setPokemons(data);
        } else {
          const data = await pokemonService.getPokemonByTypes(search);
          setPokemons(data);
        }
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
  );
};
