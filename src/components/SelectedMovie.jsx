import { useEffect, useRef, useState } from "react";
import { useMovies } from "../context/MoviesContext.jsx";
import { useKey } from "../hooks/useKey.js";
import Loader from "./Loader.jsx";
import StarRating from "./StarRating.jsx";

const KEY = "ba1fb5c0";

export default function SelectedMovie({ selectedId }) {
  const { closeMovie, addWatched, watched } = useMovies();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (m) => m.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!movie?.Title) return;
    const prev = document.title;
    document.title = `Movie | ${movie.Title}`;
    return () => (document.title = prev);
  }, [movie?.Title]);

  useKey("Escape", closeMovie);

  if (isLoading) return <Loader />;
  if (!movie) return null;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatched = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(" ")?.[0] || 0),
      userRating,
      countRatingDecision: countRef.current,
    };
    addWatched(newWatched);
    closeMovie();
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={closeMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} • {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span> {imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated this movie <span>⭐️</span> {watchedUserRating}
            </p>
          )}
        </div>

        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
