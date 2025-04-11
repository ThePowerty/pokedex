import React, { useState } from "react";
import "./Pokedex.css";
import { Filter, List } from "./components";

export const Pokedex = () => {
  
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState({weight: 0, height: 0.1})

  return (
    <div className="pokedex">
      <Filter setSearch={setSearch} setFilter={setFilter}/>
      <List search={search} filter={filter}/>
    </div>
  );
};
