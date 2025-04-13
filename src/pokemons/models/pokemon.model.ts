export enum TipoPokemon {
  fairy = "Hada",
  dark = "Siniestro",
  dragon = "Dragón",
  ice = "Hielo",
  psychic = "Psíquico",
  electric = "Eléctrico",
  grass = "Planta",
  water = "Agua",
  fire = "Fuego",
  steel = "Acero",
  ghost = "Fantasma",
  bug = "Bicho",
  rock = "Roca",
  ground = "Tierra",
  poison = "Veneno",
  flying = "Volador",
  fighting = "Lucha",
  normal = "Normal",
}

export enum StatPokemon {
  hp = "PS",
  attack = "Ataque",
  defense = "Defensa",
  "special-attack" = "Ataque Especial",
  "special-defense" = "Defensa Especial",
  speed = "Velocidad",
}

export interface Stats {
  base_stat: number;
  name: StatPokemon;
}

export interface Pokemon {
  id: number; // ID del Pokémon
  name: string; // Nombre del Pokémon
  height: number; // Altura del Pokémon
  weight: number; // Peso del Pokémon
  stats: Stats[]; // Estadísticas base del Pokémon
  types: TipoPokemon[]; // Tipos del Pokémon
  image: string; // URL de la imagen del Pokémon
}

export interface Type {
  id: number;
  name: TipoPokemon;
  url: string;
}
