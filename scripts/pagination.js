let currentPage = 1;
const moviesPerPage = 20;

// function renderMovie(movie, container) {
//   const div = document.createElement("div");
//   div.className = "movie-card";
//   div.innerHTML = `
//     <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.onerror=null;this.src='/assets/images/placeholder.png';"/>
//     <div class="movie-info">
//       <h3>${movie.Title}</h3>
//       <p>${movie.Year}</p>
//       <div class="movie-actions">
//         <button class="fav-btn" title="Add to Favorites" onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Year}')">
//           <img src="/assets/icons/plain_heart.png" alt="Add to Favorites" />
//         </button>
//         <button class="watch-btn" title="Add to Watchlist" onclick="addToWatchlist('${movie.imdbID}', '${movie.Title}', '${movie.Year}')">
//           <img src="/assets/icons/tick.png" alt="Add to Watchlist" />
//         </button>
//       </div>
//     </div>
//   `;

  
//   container.appendChild(div);
// }
function renderMovie(movie) {
  const isFav = isMovieFavourited(movie.imdbID);
  const isWatched = isMovieWatched(movie.imdbID); // Comes from addtowatched.js

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
        <button class="watch-btn" title="Toggle Watchlist">
          <img 
            src="${isWatched ? "/assets/icons/ticked.png" : "/assets/icons/tick.png"}"
            alt="Toggle Watchlist"
            class="tick-icon"
          />
        </button>
      </div>
    </div>
  `;

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

function renderPage(allMovies, container, page = 1) {
  container.innerHTML = "";
  currentPage = page;

  const start = (page - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const moviesToDisplay = allMovies.slice(start, end);

  moviesToDisplay.forEach(movie => renderMovie(movie, container));
  renderPagination(allMovies, container);
}

function renderPagination(allMovies, container) {
  const paginationDiv = document.getElementById("paginationControls");
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => renderPage(allMovies, container, currentPage - 1);
  paginationDiv.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    if (i === currentPage) pageBtn.classList.add("active-page");
    pageBtn.onclick = () => renderPage(allMovies, container, i);
    paginationDiv.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => renderPage(allMovies, container, currentPage + 1);
  paginationDiv.appendChild(nextBtn);
}


window.renderPage = renderPage;
window.renderMovie = renderMovie;
window.renderPagination = renderPagination;
