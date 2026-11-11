import "./WatchSummary.css";

function average(arr) {
  return arr.length ? arr.reduce((acc, cur) => acc + cur / arr.length, 0) : 0;
}

export default function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((m) => m.imdbRating));
  const avgUserRating = average(watched.map((m) => m.userRating));
  const avgRuntime = Math.round(average(watched.map((m) => m.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span> <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span> <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span> <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span> <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
