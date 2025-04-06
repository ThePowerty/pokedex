import axios from "axios";
import { Pokemon, TipoPokemon } from "../models/pokemon.model";

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
      types: pokemonDetails.data.types.map((typeInfo: any) => {
        return capitalizer(TipoPokemon[typeInfo.type.name as keyof typeof TipoPokemon] || typeInfo.type.name);
      }),
      image: pokemonDetails.data.sprites.front_default,
    };
  }

  
}

export const pokemonService = new PokemonService();
