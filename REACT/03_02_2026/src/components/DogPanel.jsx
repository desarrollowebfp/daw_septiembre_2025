import { useState, useContext } from "react";
import { DogContext } from "../context/dogContext";

const DogPanel = () => {
  const { dogName, renameDog } = useContext(DogContext);

  const [input, setInput] = useState("");

  const handleInput = () => {
    renameDog(input);
    setInput("");
  };

  return (
    <>
      <p>Nombre del perro: {dogName}</p>
      <input
        type="text"
        onInput={(ev) => setInput(ev.target.value)}
        value={input}
      />
      <button onClick={handleInput}>Cambiar nombre al perro</button>
    </>
  );
};

export default DogPanel;
