import { useReducer } from "react";
import "./App.css";

const App = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "sumar":
        return state + 1;

      case "restar":
        return state > 0 ? state - 1 : state;

      case "sumarCantidad":
        return state + action.payload;

      case "reiniciar":
        return 0;

      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => dispatch({ type: "sumar" })}>+</button>
      <button onClick={() => dispatch({ type: "restar" })}>-</button>
      <button onClick={() => dispatch({ type: "sumarCantidad", payload: 5 })}>
        Suma 5
      </button>
      <button onClick={() => dispatch({ type: "reiniciar" })}>Reinicia</button>
    </>
  );
};

export default App;
