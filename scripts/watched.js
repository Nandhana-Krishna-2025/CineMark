document.addEventListener("DOMContentLoaded", () => {
  const watchedContainer = document.getElementById("watchedContainer");
  const watched = JSON.parse(localStorage.getItem("watched")) || [];

  if (watched.length === 0) {
    watchedContainer.innerHTML = "<p>No watched movies added yet.</p>";
    return;
  }

  watched.forEach(movie => {
    const poster = movie.poster && movie.poster !== "N/A" ? movie.poster : "../assets/images/placeholder.png";

    const isFav = isMovieFavourited(movie.id);
    const heartIconSrc = isFav ? "../assets/icons/red_heart.png" : "../assets/icons/plain_heart.png";

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
       <img 
  src="${poster}" 
  alt="${movie.title}" 
  class="movie-poster" 
  data-id="${movie.id}"
/>

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <div class="movie-actions">
          <button class="fav-btn" title="Toggle Favourite">
            <img src="${heartIconSrc}" alt="Toggle Favourite" class="heart-icon" />
          </button>
          <button class="watch-btn" title="Remove from Watchlist">
            <img src="../assets/icons/ticked.png" alt="Remove from Watchlist" class="tick-icon" />
          </button>
        </div>
      </div>
    `;



    //  make poster image clickable
const posterImg = card.querySelector(".movie-poster");
posterImg.addEventListener("click", () => {
  viewMovieDetails(movie.id);  // reuse same function
});

    // Toggle favourite
    const heartIcon = card.querySelector(".heart-icon");
    heartIcon.addEventListener("click", () => {
      toggleFavourite(heartIcon, movie);
    });

    //  Remove from watchlist
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

function isMovieFavourited(id) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  return favourites.some(movie => movie.id === id);
}

function toggleFavourite(heartIcon, movie) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const index = favourites.findIndex(m => m.id === movie.id);

  if (index !== -1) {
    favourites.splice(index, 1);
    heartIcon.src = "../assets/icons/plain_heart.png"; // Unfavourited
  } else {
    favourites.push(movie);
    heartIcon.src = "../assets/icons/red_heart.png"; // Favourited
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
}

window.removeFromWatchlist = removeFromWatchlist;
