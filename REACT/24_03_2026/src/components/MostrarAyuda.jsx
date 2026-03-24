import { useState } from "react";

const MostrarAyuda = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section>
      <h2>Ayuda</h2>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Ocultar ayuda" : "Mostrar ayuda"}
      </button>
      {visible && <p>Este texto es para ayudarte.</p>}
    </section>
  );
};

export default MostrarAyuda;
