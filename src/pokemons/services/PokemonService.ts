import axios from "axios";
import { Pokemon, StatPokemon, TipoPokemon, Type } from "../models/pokemon.model";

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
        name: capitalizer(StatPokemon[statInfo.stat.name as keyof typeof StatPokemon] || statInfo.stat.name),
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

      const pokemons = await Promise.all(
        flattenedPokemons.map(async (pokemon: any) => {
          return await this.getPokemon(pokemon.pokemon.url);
        })
      );

      const definedPokemons: Pokemon[] = pokemons.filter(
        (p): p is Pokemon => p !== undefined
      );

      const uniquePokemons = Array.from(
        new Set(definedPokemons.map((p) => p.id))
      ).map((id) => definedPokemons.find((p) => p.id === id)!);

      return uniquePokemons;
    } catch (error) {
      console.error("Error al obtener Pokémon por tipos:", error);
      throw error;
    }
  }
}

export const pokemonService = new PokemonService();
