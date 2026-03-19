const { useEffect, useState } = require("react");

const MensajeCarga = () => {
  const [text, setText] = useState("Cargando...");

  useEffect(() => {
    const id = setTimeout(() => {
      setText("Listo");
    }, 500);

    return () => clearTimeout(id);
  }, []);

  return <p>{text}</p>;
};

export default MensajeCarga;
