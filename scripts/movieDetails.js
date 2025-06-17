const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("imdbID");
const detailsDiv = document.getElementById("movieDetails");

if (!imdbID) {
  detailsDiv.innerHTML = "<p>Movie ID not provided in URL.</p>";
} else {
  // Show loading message while fetching
 detailsDiv.innerHTML = `<img src="/assets/icons/loader.gif" alt="Loading..." class="loading-spinner" />`;


  const apiKey = "57d7ef30";
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`)
    .then(response => response.json())
    .then(movie => {
      if (movie.Response === "True") {
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
      } else {
        detailsDiv.innerHTML = "<p>Movie not found.</p>";
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      detailsDiv.innerHTML = "<p>Error fetching movie details.</p>";
    });
}
