import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Ejemplo de Contexto</h1>
      <nav>
        <ul>
            <li>
              <NavLink to="/">Welcome</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header