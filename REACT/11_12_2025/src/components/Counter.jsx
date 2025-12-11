import { useState } from "react";

const Counter = ({state, action}) => {

  return (
    <div>
      <p>Contador es: {state}</p>
      <button onClick={action}>Sumar 1</button>
    </div>
  );
};

export default Counter;
