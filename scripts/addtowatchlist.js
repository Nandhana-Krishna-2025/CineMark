function renderMovie(movie) {
  const isWatched = isMovieWatched(movie.imdbID);

  const div = document.createElement("div");
  div.className = "movie-card";

  div.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.onerror=null;this.src='/assets/images/placeholder.png';"/>
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <div class="movie-actions">
        <button class="watch-btn" title="Add to Watched">
          <img 
            src="${isWatched ? "/assets/icons/ticked.png" : "/assets/icons/tick.png"}"
            alt="Mark as Watched"
            class="tick-icon"
          />
        </button>
      </div>
    </div>
  `;

  // Event listener to toggle watched status
  const tickIcon = div.querySelector(".tick-icon");
  tickIcon.addEventListener("click", () =>
    toggleWatched(tickIcon, movie.imdbID, movie.Title, movie.Year, movie.Poster)
  );

  // Append to the container (make sure this exists in your HTML)
  const container = document.getElementById("watchedContainer") || document.querySelector(".movie-list");
  container.appendChild(div);
}

function toggleWatched(imgElement, id, title, year, poster) {
  let watched = JSON.parse(localStorage.getItem("watched")) || [];

  const index = watched.findIndex(movie => movie.id === id);

  if (index !== -1) {
    // Remove from watched
    watched.splice(index, 1);
    imgElement.src = "/assets/icons/tick.png";
  } else {
    // Add to watched
    const movie = { id, title, year, poster };
    watched.push(movie);
    imgElement.src = "/assets/icons/ticked.png";
  }

  localStorage.setItem("watched", JSON.stringify(watched));
}

function isMovieWatched(id) {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];
  return watched.some(movie => movie.id === id);
}
