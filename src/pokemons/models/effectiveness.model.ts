import { TipoPokemon } from "./pokemon.model";

export interface Effectiveness {
  strongAgainst: TipoPokemon[];
  weakAgainst: TipoPokemon[];
  noEffect: TipoPokemon[];
}

export const effectivenessData: Record<TipoPokemon, Effectiveness> = {
    [TipoPokemon.steel]: {
        strongAgainst: [TipoPokemon.fairy, TipoPokemon.ice, TipoPokemon.rock],
        weakAgainst: [
          TipoPokemon.steel,
          TipoPokemon.water,
          TipoPokemon.electric,
          TipoPokemon.fire,
        ],
        noEffect: [],
      },
      [TipoPokemon.water]: {
        strongAgainst: [TipoPokemon.fire, TipoPokemon.rock, TipoPokemon.ground],
        weakAgainst: [TipoPokemon.water, TipoPokemon.dragon, TipoPokemon.grass],
        noEffect: [],
      },
      [TipoPokemon.bug]: {
        strongAgainst: [TipoPokemon.grass, TipoPokemon.psychic, TipoPokemon.dark],
        weakAgainst: [
          TipoPokemon.steel,
          TipoPokemon.ghost,
          TipoPokemon.fire,
          TipoPokemon.fairy,
          TipoPokemon.fighting,
          TipoPokemon.poison,
          TipoPokemon.flying,
        ],
        noEffect: [],
      },
      [TipoPokemon.dragon]: {
        strongAgainst: [TipoPokemon.dragon],
        weakAgainst: [TipoPokemon.steel],
        noEffect: [TipoPokemon.fairy],
      },
      [TipoPokemon.electric]: {
        strongAgainst: [TipoPokemon.water, TipoPokemon.flying],
        weakAgainst: [
          TipoPokemon.dragon,
          TipoPokemon.electric,
          TipoPokemon.grass,
        ],
        noEffect: [TipoPokemon.ground],
      },
      [TipoPokemon.ghost]: {
        strongAgainst: [TipoPokemon.ghost, TipoPokemon.psychic],
        weakAgainst: [TipoPokemon.dark],
        noEffect: [TipoPokemon.normal],
      },
      [TipoPokemon.fire]: {
        strongAgainst: [
          TipoPokemon.steel,
          TipoPokemon.bug,
          TipoPokemon.ice,
          TipoPokemon.grass,
        ],
        weakAgainst: [
          TipoPokemon.water,
          TipoPokemon.dragon,
          TipoPokemon.fire,
          TipoPokemon.rock,
        ],
        noEffect: [],
      },
      [TipoPokemon.fairy]: {
        strongAgainst: [
          TipoPokemon.dragon,
          TipoPokemon.fighting,
          TipoPokemon.dark,
        ],
        weakAgainst: [TipoPokemon.steel, TipoPokemon.fire, TipoPokemon.poison],
        noEffect: [],
      },
      [TipoPokemon.ice]: {
        strongAgainst: [
          TipoPokemon.dragon,
          TipoPokemon.grass,
          TipoPokemon.ground,
          TipoPokemon.flying,
        ],
        weakAgainst: [
          TipoPokemon.steel,
          TipoPokemon.water,
          TipoPokemon.fire,
          TipoPokemon.ice,
        ],
        noEffect: [],
      },
      [TipoPokemon.fighting]: {
        strongAgainst: [
          TipoPokemon.steel,
          TipoPokemon.ice,
          TipoPokemon.normal,
          TipoPokemon.rock,
          TipoPokemon.dark,
        ],
        weakAgainst: [
          TipoPokemon.bug,
          TipoPokemon.fairy,
          TipoPokemon.psychic,
          TipoPokemon.poison,
          TipoPokemon.flying,
        ],
        noEffect: [TipoPokemon.ghost],
      },
      [TipoPokemon.normal]: {
        strongAgainst: [],
        weakAgainst: [TipoPokemon.steel, TipoPokemon.rock],
        noEffect: [TipoPokemon.ghost],
      },
      [TipoPokemon.grass]: {
        strongAgainst: [TipoPokemon.water, TipoPokemon.rock, TipoPokemon.ground],
        weakAgainst: [
          TipoPokemon.steel,
          TipoPokemon.bug,
          TipoPokemon.dragon,
          TipoPokemon.fire,
          TipoPokemon.grass,
          TipoPokemon.poison,
          TipoPokemon.flying,
        ],
        noEffect: [],
      },
      [TipoPokemon.psychic]: {
        strongAgainst: [TipoPokemon.fighting, TipoPokemon.poison],
        weakAgainst: [TipoPokemon.steel, TipoPokemon.psychic],
        noEffect: [TipoPokemon.dark],
      },
      [TipoPokemon.rock]: {
        strongAgainst: [
          TipoPokemon.bug,
          TipoPokemon.fire,
          TipoPokemon.ice,
          TipoPokemon.flying,
        ],
        weakAgainst: [
          TipoPokemon.steel,
          TipoPokemon.fighting,
          TipoPokemon.ground,
        ],
        noEffect: [],
      },
      [TipoPokemon.dark]: {
        strongAgainst: [TipoPokemon.ghost, TipoPokemon.psychic],
        weakAgainst: [TipoPokemon.fairy, TipoPokemon.fighting, TipoPokemon.dark],
        noEffect: [],
      },
      [TipoPokemon.ground]: {
        strongAgainst: [
          TipoPokemon.steel,
          TipoPokemon.electric,
          TipoPokemon.fire,
          TipoPokemon.rock,
          TipoPokemon.poison,
        ],
        weakAgainst: [TipoPokemon.bug, TipoPokemon.grass],
        noEffect: [TipoPokemon.flying],
      },
      [TipoPokemon.poison]: {
        strongAgainst: [TipoPokemon.fairy, TipoPokemon.grass],
        weakAgainst: [
          TipoPokemon.ghost,
          TipoPokemon.rock,
          TipoPokemon.ground,
          TipoPokemon.poison,
        ],
        noEffect: [TipoPokemon.steel],
      },
      [TipoPokemon.flying]: {
        strongAgainst: [TipoPokemon.bug, TipoPokemon.fighting, TipoPokemon.grass],
        weakAgainst: [TipoPokemon.steel, TipoPokemon.electric, TipoPokemon.rock],
        noEffect: [],
      },
};