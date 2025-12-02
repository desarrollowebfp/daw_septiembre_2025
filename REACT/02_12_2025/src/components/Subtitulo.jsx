import "./Subtitulo.css";

const Subtitulo = ({ children, estilo }) => {
  return <h2 className={`subtitulo ${estilo}`}>{children}</h2>;
};

export default Subtitulo;
