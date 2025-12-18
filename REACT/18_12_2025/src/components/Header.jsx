import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>React Router Dom</h1>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
