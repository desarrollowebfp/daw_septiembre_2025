import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <h1>DoIt App</h1>
      <p>Aplicación de gestión de tareas</p>
      <Link to="/login">Acceder</Link>
      <Link to="/register">Crear cuenta</Link>
    </section>
  );
};

export default Home;
