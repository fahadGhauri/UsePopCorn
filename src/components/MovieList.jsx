import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((m) => (
        <MovieCard key={m.imdbID} movie={m} onSelect={onSelect} />
      ))}
    </ul>
  );
}
