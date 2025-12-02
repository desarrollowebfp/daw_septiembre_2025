import "./App.css";
import Subtitulo from "./components/Subtitulo";

const App = () => {
  return (
    <>
      <h1>Hola</h1>
      <Subtitulo estilo="sm">Ejemplo 1</Subtitulo>
      <Subtitulo estilo="md">Ejemplo 2</Subtitulo>
      <Subtitulo estilo="lg">Ejemplo 3</Subtitulo>
    </>
  );
};

export default App;
