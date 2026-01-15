import { useState, memo } from "react";
import "./App.css";

const Child = memo(({ text }) => {
  console.log("Child render");
  return <p>Child: {text}</p>;
});

const App = () => {
  const [count, setCount] = useState(0);
  console.log("App render");

  const user = {
    name: "Objeto",
    city: "JavaScript",
  };

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        Count: {count}
      </button>
      <Child text="Esto es un dato primitivo" />
    </>
  );
};

export default App;
