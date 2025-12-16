import { useState } from "react";
import "./App.css";
import ComponentEffect from "./components/ComponentEffect";
import RickAndMorty from "./components/RickAndMorty";

const App = () => {
  const [showComponent, setShowComponent] = useState(true);
  return (
    <>
      <button onClick={() => setShowComponent(!showComponent)}>
        Mostrar/ocultar componente
      </button>
      {showComponent && <ComponentEffect />}
      <RickAndMorty/>
    </>
  );
};

export default App;
