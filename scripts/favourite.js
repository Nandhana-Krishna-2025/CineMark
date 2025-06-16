document.addEventListener("DOMContentLoaded", () => {
  const favouritesContainer = document.getElementById("favouritesContainer");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.length === 0) {
    favouritesContainer.innerHTML = "<p>No favourite movies added yet.</p>";
    return;
  }

  favourites.forEach(movie => {
    const poster = movie.poster && movie.poster !== "N/A" ? movie.poster : "/assets/images/placeholder.png";

    const isWatched = isMovieWatched(movie.id); // from addtowatched.js
    const tickIconSrc = isWatched ? "/assets/icons/ticked.png" : "/assets/icons/tick.png";

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <div class="movie-actions">
          <button class="fav-btn" title="Remove from Favourites">
            <img src="/assets/icons/red_heart.png" alt="Remove from Favourites" class="heart-icon" />
          </button>
          <button class="watch-btn" title="Toggle Watchlist">
            <img src="${tickIconSrc}" alt="Toggle Watchlist" class="tick-icon" />
          </button>
        </div>
      </div>
    `;

    // 🧡 Remove from favourites
    const heartIcon = card.querySelector(".heart-icon");
    heartIcon.addEventListener("click", () => {
      removeFromFavourites(movie.id);
      card.remove();

      if (favouritesContainer.children.length === 0) {
        favouritesContainer.innerHTML = "<p>No favourite movies added yet.</p>";
      }
    });

    // ✅ Toggle watched status using addToWatchlist
    const tickIcon = card.querySelector(".tick-icon");
    tickIcon.addEventListener("click", () => {
      addToWatchlist(tickIcon, movie.id, movie.title, movie.year, movie.poster);
    });

    favouritesContainer.appendChild(card);
  });
});

function removeFromFavourites(id) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter(movie => movie.id !== id);
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

// ✅ You must include or load addtowatched.js before this file so the following function is available:
function isMovieWatched(id) {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];
  return watched.some(movie => movie.id === id);
}


