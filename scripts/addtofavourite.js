function renderMovie(movie) {
  const isFav = isMovieFavourited(movie.imdbID);

  const div = document.createElement("div");
  div.className = "movie-card";

  div.innerHTML = `
  <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.onerror=null;this.src='/assets/images/placeholder.png';"/>
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <div class="movie-actions">
        <button class="fav-btn" title="Add to Favourites">
          <img 
            src="${isFav ? "/assets/icons/red_heart.png" : "/assets/icons/plain_heart.png"}"
            alt="Add to Favourites"
            class="heart-icon"
          />
        </button>
       <button class="watch-btn" title="Add to Watchlist" onclick="addToWatchlist('${movie.imdbID}', '${movie.Title}', '${movie.Year}')">
          <img src="/assets/icons/tick.png" alt="Add to Watchlist" />
        </button>
      </div>
    </div>
  `;

  // Add event listeners using JavaScript
  const heartIcon = div.querySelector(".heart-icon");
  heartIcon.addEventListener("click", () =>
    addToFavourites(heartIcon, movie.imdbID, movie.Title, movie.Year, movie.Poster)
  );

  // const watchBtn = div.querySelector(".watch-btn");
  // watchBtn.addEventListener("click", () =>
  //   addToWatchlist(movie.imdbID, movie.Title, movie.Year)
  // );

  movieContainer.appendChild(div);
}

function addToFavourites(imgElement, id, title, year, poster) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const index = favourites.findIndex(movie => movie.id === id);

  if (index !== -1) {
    // Remove from favourites
    favourites.splice(index, 1);
    imgElement.src = "/assets/icons/plain_heart.png";
  } else {
    // Add to favourites with poster
    const movie = { id, title, year, poster };
    favourites.push(movie);
    imgElement.src = "/assets/icons/red_heart.png";
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
}

function isMovieFavourited(id) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  return favourites.some(movie => movie.id === id);
}



