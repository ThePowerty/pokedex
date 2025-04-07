import { CustomLink } from "../../../components";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav-menu">
        <CustomLink to="/pokedex">Pokedex</CustomLink>
        <CustomLink to="/tabla-tipos">Tabla de tipos</CustomLink>
      </ul>
    </div>
  );
};
