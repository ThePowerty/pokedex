import { NavBar, Pokedex, TypeList } from "./components";
import { Route, Routes } from "react-router-dom";

export const PokemonContainer = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/tabla-tipos" element={<TypeList />} />
      </Routes>
    </>
  );
};
