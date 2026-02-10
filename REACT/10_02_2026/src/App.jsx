import { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 1000);
  const [name, setName] = useLocalStorage("name", "");

  return (
    <>
      <input type="text" onInput={(ev) => setText(ev.target.value)} />
      <p>Texto normal: {text}</p>
      <p>Texto debounced: {debouncedText}</p>
      <hr />
      <input type="text" onInput={(ev) => setName(ev.target.value)} />
      <p>{name}</p>
    </>
  );
};

export default App;
