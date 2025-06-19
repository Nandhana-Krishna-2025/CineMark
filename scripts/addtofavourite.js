// function renderMovie(movie) {
//   const isFav = isMovieFavourited(movie.imdbID);
//   const isWatched = isMovieWatched(movie.imdbID); // Comes from addtowatched.js

//   const div = document.createElement("div");
//   div.className = "movie-card";

//   div.innerHTML = `
//     <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.onerror=null;this.src='/assets/images/placeholder.png';"/>
//     <div class="movie-info">
//       <h3>${movie.Title}</h3>
//       <p>${movie.Year}</p>
//       <div class="movie-actions">
//         <button class="fav-btn" title="Add to Favourites">
//           <img 
//             src="${isFav ? "/assets/icons/red_heart.png" : "/assets/icons/plain_heart.png"}"
//             alt="Add to Favourites"
//             class="heart-icon"
//           />
//         </button>
//         <button class="watch-btn" title="Toggle Watchlist">
//           <img 
//             src="${isWatched ? "/assets/icons/ticked.png" : "/assets/icons/tick.png"}"
//             alt="Toggle Watchlist"
//             class="tick-icon"
//           />
//         </button>
//       </div>
//     </div>
//   `;

//   const heartIcon = div.querySelector(".heart-icon");
//   heartIcon.addEventListener("click", () =>
//     addToFavourites(heartIcon, movie.imdbID, movie.Title, movie.Year, movie.Poster)
//   );

//   const tickIcon = div.querySelector(".tick-icon");
//   tickIcon.addEventListener("click", () =>
//     addToWatchlist(tickIcon, movie.imdbID, movie.Title, movie.Year, movie.Poster)
//   );

//   movieContainer.appendChild(div);
// }
function renderMovie(movie) {
  const isFav = isMovieFavourited(movie.imdbID);
  const isWatched = isMovieWatched(movie.imdbID); // Comes from addtowatched.js

  const div = document.createElement("div");
  div.className = "movie-card";

  div.innerHTML = `
    <img 
  src="${movie.Poster}" 
  alt="${movie.Title}" 
  class="movie-poster"
  data-id="${movie.imdbID}"
  onerror="this.onerror=null;this.src='../assets/images/placeholder.png';"

/>

    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <div class="movie-actions">
        <button class="fav-btn" title="Add to Favourites">
          <img 
            src="${isFav ? "../assets/icons/red_heart.png" : "../assets/icons/plain_heart.png"}"
            alt="Add to Favourites"
            class="heart-icon"
          />
        </button>
        <button class="watch-btn" title="Toggle Watchlist">
          <img 
            src="${isWatched ? "../assets/icons/ticked.png" : "../assets/icons/tick.png"}"
            alt="Toggle Watchlist"
            class="tick-icon"
          />
        </button>
      </div>
    </div>
  `;
const posterImg = div.querySelector(".movie-poster");
posterImg.addEventListener("click", () => {
  viewMovieDetails(movie.imdbID);
});

  const heartIcon = div.querySelector(".heart-icon");
  heartIcon.addEventListener("click", () =>
    addToFavourites(heartIcon, movie.imdbID, movie.Title, movie.Year, movie.Poster)
  );

  const tickIcon = div.querySelector(".tick-icon");
  tickIcon.addEventListener("click", () =>
    addToWatchlist(tickIcon, movie.imdbID, movie.Title, movie.Year, movie.Poster)
  );

  movieContainer.appendChild(div);
}
function addToFavourites(imgElement, id, title, year, poster) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
console.log(favourites);
  const index = favourites.findIndex(movie => movie.id === id);

  if (index !== -1) {
    favourites.splice(index, 1);
    imgElement.src = "/assets/icons/plain_heart.png";
  } else {
    favourites.push({ id, title, year, poster });
    imgElement.src = "/assets/icons/red_heart.png";
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
}

function isMovieFavourited(id) {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  return favourites.some(movie => movie.id === id);
}
