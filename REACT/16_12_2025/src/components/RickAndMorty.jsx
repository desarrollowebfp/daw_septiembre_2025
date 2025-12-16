import { useState, useEffect } from "react";

const RickAndMorty = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    //Despues del renderizado vamos a hacer la llamada a la API de Rick and Morty
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        //Seteamos los resultados en nuestra variable de estado
        setCharacters(res.results);
        setLoading(false);
      })
      .catch((error) => {
        alert("No se pudo hacer la llamada", error.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Rick and Morty - Page {page}</h2>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <h3>{character.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMorty;
