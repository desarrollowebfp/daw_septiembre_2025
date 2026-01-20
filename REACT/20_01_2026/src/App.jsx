/* import { useState, memo, useMemo } from "react";
import "./App.css";

const Child = memo(({ prop }) => {
  console.log("Child render");
  return <p>{prop.propiedad}</p>;
});

const App = () => {
  const [counter, setCounter] = useState(0);
  const [dark, setDark] = useState(false);

  console.log("App render");

  const objeto = useMemo(() => {
    return { propiedad: dark ? "dark" : "light" };
  }, [dark]);

  return (
    <>
      <button onClick={() => setCounter((c) => c + 1)}>Count: {counter}</button>
      <button onClick={() => setDark((d) => !d)}>Toggle dark</button>
      <Child prop={objeto} />
    </>
  );
};

export default App; */

import { useState, useMemo } from "react";
import "./App.css";

const USERS = [
  "Martin",
  "Oihane",
  "Jose",
  "Yria",
  "Jia rong",
  "Luis",
  "Marina",
  "Biel",
  "Rodrigo",
  "Carlos",
  "Deiby",
];

const App = () => {
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState("");
  console.log("App render");

  const filtered = useMemo(() => {
    console.log("Filtrando...");
    const q = query.toLowerCase();
    return USERS.filter((name) => name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <button onClick={() => setCounter((c) => c + 1)}>Count: {counter}</button>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filtered.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
