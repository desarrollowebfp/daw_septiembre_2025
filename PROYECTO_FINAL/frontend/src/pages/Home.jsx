import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <h1>DoIt App</h1>
      <p>Aplicación de gestión de tareas</p>
      <Link to="/login" className="home_link">Acceder</Link>
      <Link to="/register" className="home_link">Crear cuenta</Link>
    </section>
  );
};

export default Home;
