import { useState, useCallback } from "react";
import "./App.css";

const Child = ({ onClick }) => {
  console.log("Child render");
  return <button onClick={onClick}>Click hijo</button>;
};

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count);
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child onClick={handleClick}/>
    </>
  );
};

export default App;
