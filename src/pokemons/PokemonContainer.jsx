import { NavBar, PokedexList, PokedexNation, TypeList } from "./components";
import { Route, Routes } from "react-router-dom";

export const PokemonContainer = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pokedex" element={<PokedexList />} />
        <Route path="/pokedex-nacional" element={<PokedexNation />} />
        <Route path="/tabla-tipos" element={<TypeList />} />
      </Routes>
    </>
  );
};
