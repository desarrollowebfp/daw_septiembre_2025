const EstadoPanel = ({ abierto }) => {
  return (
    <section>
      <h2>Estado del panel:</h2>
      <p>{abierto ? "Panel abierto" : "Panel cerrado"}</p>
    </section>
  );
};

export default EstadoPanel