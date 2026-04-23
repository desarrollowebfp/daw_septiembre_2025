import { NavLink } from "react-router-dom";

const Navbar = ({ token, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Perfil</NavLink>
            </li>
            <li>
              <button onClick={onLogout}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
