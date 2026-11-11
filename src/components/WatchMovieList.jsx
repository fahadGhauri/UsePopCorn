import WatchedMovie from "./WatchedMovie.jsx";
import "./WatchedMovieList.css";
export default function WatchedMovieList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((m) => (
        <WatchedMovie key={m.imdbID} movie={m} onDelete={onDelete} />
      ))}
    </ul>
  );
}
