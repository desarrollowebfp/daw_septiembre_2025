import { useEffect, useState } from "react";

const useRickAndMortyAPI = (page = 1) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`,
        );

        if (!res.ok) {
          throw new Error(`Error leyendo los personajes ${res.status}`);
        }

        const data = await res.json();
        setCharacters(data.results);
      } catch (error) {
        setError(error.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page]);

  return { characters, loading, error };
};

export default useRickAndMortyAPI;
