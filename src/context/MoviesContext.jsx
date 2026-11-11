import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.js";

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function selectMovie(id) {
    setSelectedId((curr) => (curr === id ? null : id));
  }

  function closeMovie() {
    setSelectedId(null);
  }

  function addWatched(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function deleteWatched(id) {
    setWatched((movies) => movies.filter((m) => m.imdbID !== id));
  }

  return (
    <MoviesContext.Provider
      value={{
        query,
        setQuery,
        selectedId,
        selectMovie,
        closeMovie,
        watched,
        addWatched,
        deleteWatched,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used within MoviesProvider");
  return ctx;
}
