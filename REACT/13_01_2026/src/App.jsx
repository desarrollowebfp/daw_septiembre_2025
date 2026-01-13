import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <h1>React Router Dom x Rick & Morty</h1>
      </header>
      <Outlet />
      <footer>
        <p>Ejemplo</p>
      </footer>
    </>
  );
};

export default App;
