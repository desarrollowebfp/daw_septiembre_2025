import "./MovieCard.css";
import Stars from "./Stars";

const MovieCard = ({ movie }) => {
  return (
    <li>
      <h2>{movie.title}</h2>
      <h3>
        {movie.director} - {movie.year}
      </h3>
      <p>{movie.genre}</p>
      <Stars rating={movie.rating}/>
    </li>
  );
};

export default MovieCard;
