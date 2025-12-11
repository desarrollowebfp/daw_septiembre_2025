import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import Toggle from "./components/Toggle";

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log(count);
    setCount(count + 1);
  };

  return (
    <>
      <Counter state={count} action={handleClick} />
      <Toggle />
    </>
  );
};

export default App;
