import { effectivenessData } from "../models/effectiveness.model";
import { TipoPokemon } from "../models/pokemon.model";


export const getEffectiveness = (type: TipoPokemon) => {
  return effectivenessData[type];
};