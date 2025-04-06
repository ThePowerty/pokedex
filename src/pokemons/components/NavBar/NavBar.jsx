import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav-menu">
        <CustomLink to="/pokedex">Pokedex</CustomLink>
        <CustomLink to="/pokedex-nacional">Pokedex Nacional</CustomLink>
        <CustomLink to="/tabla-tipos">Tabla de tipos</CustomLink>
      </ul>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
