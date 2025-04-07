import React, { useState } from "react";
import "./Pokedex.css";
import { Filter, List } from "./components";

export const Pokedex = () => {
  const [search, setSearch] = useState([]);

  return (
    <div className="pokedex">
      <Filter setSearch={setSearch}/>
      <List search={search}/>
    </div>
  );
};
