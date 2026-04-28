import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver a la página principal</Link>
    </section>
  );
};

export default NotFound;
