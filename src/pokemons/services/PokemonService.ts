import axios from "axios";
import {
  Pokemon,
  StatPokemon,
  TipoPokemon,
  Type,
} from "../models/pokemon.model";

class PokemonService {
  private BASE_URL = "https://pokeapi.co/api/v2";

  async getPokedex(limit: number): Promise<Pokemon[]> {
    const response = await axios.get<{
      results: { name: string; url: string }[];
    }>(`${this.BASE_URL}/pokemon?limit=${limit}`);

    const pokemons: Pokemon[] = await Promise.all(
      response.data.results.map(async (result) => {
        return await this.getPokemon(result.url);
      })
    );

    return pokemons;
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    const total = 1302;
    const limit = 200;
    const pokemons: Pokemon[] = [];

    for (let offset = 0; offset < total; offset += limit) {
      const response = await axios.get<{
        results: { name: string; url: string }[];
      }>(`${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

      const results = response.data.results;

      const promises = results.map((result) => this.getPokemon(result.url));
      const chunkResults = await Promise.allSettled(promises);

      chunkResults.forEach((result) => {
        if (result.status === "fulfilled") {
          pokemons.push(result.value);
        } else {
          console.error("Error al obtener Pokemons: ", result.reason);
        }
      });
    }
    return pokemons;
  }

  private async getPokemon(url: string): Promise<Pokemon> {
    const pokemonDetails = await axios.get(url);
    const capitalizer = (texto: string): string => {
      if (!texto) return texto;
      return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };

    return {
      id: pokemonDetails.data.id,
      name: capitalizer(pokemonDetails.data.name),
      height: pokemonDetails.data.height,
      weight: pokemonDetails.data.weight,
      stats: pokemonDetails.data.stats.map((statInfo: any) => ({
        base_stat: statInfo.base_stat,
        name: capitalizer(
          StatPokemon[statInfo.stat.name as keyof typeof StatPokemon] ||
            statInfo.stat.name
        ),
      })),
      types: pokemonDetails.data.types.map((typeInfo: any) => {
        return capitalizer(
          TipoPokemon[typeInfo.type.name as keyof typeof TipoPokemon] ||
            typeInfo.type.name
        );
      }),
      image: pokemonDetails.data.sprites.front_default,
    };
  }

  async getTypes(): Promise<Type[]> {
    const type = await axios.get<{
      results: { name: string; url: string }[];
    }>(`${this.BASE_URL}/type?limit=18`);

    const types: Type[] = type.data.results.map((result) => ({
      name: TipoPokemon[result.name as keyof typeof TipoPokemon],
      url: result.url,
    }));

    return types;
  }

  async getPokemonByTypes(urls: string[]): Promise<Pokemon[]> {
    try {
      const allPokemons = await Promise.all(
        urls.map(async (url) => {
          const response = await axios.get(url);
          return response.data.pokemon;
        })
      );

      const flattenedPokemons = allPokemons.flat();

      const pokemonCountMap = new Map();

      flattenedPokemons.forEach((pokemon) => {
        const pokemonUrl = pokemon.pokemon.url;
        if (pokemonCountMap.has(pokemonUrl)) {
          pokemonCountMap.set(pokemonUrl, pokemonCountMap.get(pokemonUrl) + 1);
        } else {
          pokemonCountMap.set(pokemonUrl, 1);
        }
      });

      const requiredTypeCount = urls.length;

      const filteredPokemons = Array.from(pokemonCountMap.entries())
        .filter(([_, count]) => count === requiredTypeCount)
        .map(([url]) => this.getPokemon(url));

      const uniquePokemons = await Promise.all(filteredPokemons);

      return uniquePokemons;
    } catch (error) {
      console.error("Error al obtener Pokémon por tipos:", error);
      throw error;
    }
  }
}

export const pokemonService = new PokemonService();
