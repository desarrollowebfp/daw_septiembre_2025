import { useState, useEffect } from "react";

const ComponentEffect = () => {
  const [counter, setCounter] = useState(0);

  console.log("Me monto");

  useEffect(() => {
    console.log("Lanzo el efecto con el primer renderizado");

    return () => {
      console.log("Me desmonto");
    };
  }, []);

  console.log("Render + counter:", counter);
  return (
    <div>
      <h2>useEffect</h2>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
    </div>
  );
};

export default ComponentEffect;
