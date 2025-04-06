export enum TipoPokemon {
  fairy = "Hada",
  dark = "siniestro",
  dragon = "dragón",
  ice = "hielo",
  psychic = "psíquico",
  electric = "eléctrico",
  grass = "planta",
  water = "agua",
  fire = "fuego",
  steel = "acero",
  ghost = "fantasma",
  bug = "bicho",
  rock = "roca",
  ground = "tierra",
  poison = "veneno",
  flying = "volador",
  fighting = "lucha",
  normal = "normal",
}

export interface Pokemon {
  id: number; // ID del Pokémon
  name: string; // Nombre del Pokémon
  types: TipoPokemon[]; // Tipos del Pokémon
  image: string; // URL de la imagen del Pokémon
}
