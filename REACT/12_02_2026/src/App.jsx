import { useState } from "react";
import useRickAndMortyAPI from "./hooks/useRickAndMortyAPI";
import useToggle from "./hooks/useToggle";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(1);
  const { characters, loading, error } = useRickAndMortyAPI(page);
  const { value, toggle } = useToggle(false);

  return (
    <>
      <h1>Rick and Morty</h1>
      <p>Toggle: {value ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Click Toggle</button>
      <p>Page: {page}</p>
      <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
        Previous
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
