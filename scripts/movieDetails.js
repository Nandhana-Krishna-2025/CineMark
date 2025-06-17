const movie = JSON.parse(localStorage.getItem("selectedMovie"));

const detailsDiv = document.getElementById("movieDetails");

if (!movie) {
  detailsDiv.innerHTML = "<p>No movie details found.</p>";
} else {
  detailsDiv.innerHTML = `
    <div class="movie-container">
      <img src="${movie.Poster}" alt="${movie.Title}" class="poster" />
      <div class="info">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p><strong>Box Office:</strong> ${movie.BoxOffice || "N/A"}</p>
      </div>
    </div>
  `;
}
