import React from "react";
import pokedex from "../../assets/img/pokedex.png";
import "./Hero.css";

export const Hero = () => {
    return(
        <div className="hero">
            <img src={pokedex} alt="pokedex"/>
            <div className="hero-description">
                <h1>¡Bienvenido a la Pokédex Definitiva!</h1>
                <p><strong>Explora un Mundo de Pokémon:</strong> Sumérgete en un vasto universo donde cada Pokémon cobra vida. Desde los más comunes hasta los legendarios, nuestra Pokédex te ofrece información detallada sobre cada uno.</p>
                <p><strong>Características y Estadísticas:</strong> Accede a estadísticas completas, tipos, habilidades y evoluciones. Conoce las fortalezas y debilidades de cada Pokémon para mejorar tu estrategia en batallas.</p>
            </div>
        </div>
    )
}