// watched.js

document.addEventListener("DOMContentLoaded", () => {
  const watchedContainer = document.getElementById("watchedContainer");
  const watched = JSON.parse(localStorage.getItem("watched")) || [];

  if (watched.length === 0) {
    watchedContainer.innerHTML = "<p>No watched movies added yet.</p>";
    return;
  }

  watched.forEach(movie => {
    const poster = movie.poster && movie.poster !== "N/A" ? movie.poster : "/assets/images/placeholder.png";

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <div class="movie-actions">
          <button class="watch-btn" title="Remove from Watchlist">
            <img src="/assets/icons/ticked.png" alt="Remove from Watchlist" class="tick-icon" />
          </button>
        </div>
      </div>
    `;

    const tickIcon = card.querySelector(".tick-icon");
    tickIcon.addEventListener("click", () => {
      removeFromWatchlist(movie.id);
      card.remove();

      if (watchedContainer.children.length === 0) {
        watchedContainer.innerHTML = "<p>No watched movies added yet.</p>";
      }
    });

    watchedContainer.appendChild(card);
  });
});

function removeFromWatchlist(id) {
  let watched = JSON.parse(localStorage.getItem("watched")) || [];
  watched = watched.filter(movie => movie.id !== id);
  localStorage.setItem("watched", JSON.stringify(watched));
}
