import React from "react";
import pokemon_logo from "../../assets/img/logo.png";
import "./Header.css";

export const Header = () => {
  

  return (
    <div className="header">
      <img src={pokemon_logo} alt="logo" />
    </div>
  );
};
