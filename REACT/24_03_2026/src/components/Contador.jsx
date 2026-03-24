const { useState } = require("react");

const Contador = () => {
  const [numero, setNumero] = useState(0);

  return (
    <section>
      <h2>Contador</h2>
      <p>Valor: {numero}</p>
      <button onClick={() => setNumero(numero + 1)}>Sumar</button>
    </section>
  );
};

export default Contador;
