import { useRef } from "react";
import { useMovies } from "../context/MoviesContext.jsx";
import { useKey } from "../hooks/useKey.js";
import "./Search.css";

export default function SearchBar() {
  const { query, setQuery } = useMovies();
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
