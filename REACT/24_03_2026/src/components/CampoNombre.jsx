import { useState } from "react";

const CampoNombre = () => {
  const [nombre, setNombre] = useState("");

  return (
    <section>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        onChange={(ev) => setNombre(ev.target.value)}
      />
      <p>Nombre: {nombre}</p>
    </section>
  );
};

export default CampoNombre