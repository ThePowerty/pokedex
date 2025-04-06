import React, { useEffect, useState } from 'react';
import { pokemonService } from '../../services/PokemonService';
import "./PokedexList.css"

export const PokedexList = () => {
  const [limit, setLimit] = useState(12)
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await pokemonService.getPokedex(limit);
        setPokemons(data);
      } catch (err) {
        setError('Error al cargar los Pokémon', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit]);

  const increaseLimit = () => {
    setLimit(prevLimit => prevLimit + 6);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='pokedex'>
      <ul className='pokemons'>
        {pokemons.map((pokemon) => (
          <li className='pokemon' key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className="tipos">
              {pokemon.types.map((type, index) => (
                <p className={type} key={index}>{type}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={increaseLimit}>Ver más</button>
    </div>
  );
};