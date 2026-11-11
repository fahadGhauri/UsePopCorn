import Navbar from "./components/Navbar.jsx";
import Logo from "./components/Logo.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import Main from "./components/Main.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import WatchSummary from "./components/WatchSummary.jsx";
import { useMovie } from "./hooks/useMovie.js";
import { useMovies } from "./context/MoviesContext.jsx";
import WatchedMovieList from "./components/WatchMovieList.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";
import "./index.css";

export default function App() {
  const { query, selectedId, selectMovie, closeMovie, watched, deleteWatched } =
    useMovies();

  const { movies, isLoading, error } = useMovie(query, closeMovie);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelect={selectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie selectedId={selectedId} />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchedMovieList watched={watched} onDelete={deleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
