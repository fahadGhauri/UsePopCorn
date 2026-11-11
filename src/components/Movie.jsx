import { useMovies } from "../context/MoviesContext.jsx";

export default function Movie({ movie }) {
  const { handleSeled } = useMovies();
  return (
    <li onClick={() => handleSeled(movie.imdbID)}>
      <img
        className="movie-poster"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <div>
        <h3 style={{ margin: "0 0 4px 0" }}>{movie.Title}</h3>
        <p style={{ opacity: 0.8 }}>
          <span>🗓</span> {movie.Year}
        </p>
      </div>
    </li>
  );
}
