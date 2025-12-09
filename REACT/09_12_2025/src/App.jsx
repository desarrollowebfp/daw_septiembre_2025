import "./App.css";
import movies from "./data/movies";
import MovieCard from "./components/MovieCard";

const App = () => {
  return (
    <>
      <h1>Componente App</h1>
      <main>
        <ul>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id}/>
          ))}
        </ul>
      </main>
    </>
  );
};

export default App;
