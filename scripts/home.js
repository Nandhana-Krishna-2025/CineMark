const keywords = ["The", "A", "Day", "Night", "Man", "Love", "Home", "Batman", "Friends"];
const apiKey = "5bedaa04"; 
const movieContainer = document.getElementById("movieContainer");

const displayedMovies = new Set();
let totalFetched = 0;
const fetchLimit = 60;


function renderMovie(movie) {
  const div = document.createElement("div");
  div.className = "movie-card";
  div.innerHTML = `
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}" />
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <div class="movie-actions">
  <button class="fav-btn" title="Add to Favorites" onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Year}')">
    <img src="/assets/icons/heart-icon.png" alt="Add to Favorites" />
  </button>
  <button class="watch-btn" title="Add to Watchlist" onclick="addToWatchlist('${movie.imdbID}', '${movie.Title}', '${movie.Year}')">
    <img src="/assets/icons/tick-icon.png" alt="Add to Watchlist" />
  </button>
</div>

    </div>
  `;
  movieContainer.appendChild(div);
}

// Dummy functions for demo 
function addToFavorites(id, title, year) {
  alert(`Added to Favorites: ${title} (${year})`);
  
}

function addToWatchlist(id, title, year) {
  alert(`Added to Watchlist: ${title} (${year})`);
}


async function fetchMoviesByKeyword(keyword) {
  for (let page = 1; page <= 5; page++) {
    if (totalFetched >= fetchLimit) return;

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}&page=${page}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True" && data.Search) {
        for (const movie of data.Search) {
          const id = movie.imdbID;
          if (!displayedMovies.has(id)) {
            displayedMovies.add(id);
            renderMovie(movie);
            totalFetched++;
            if (totalFetched >= fetchLimit) return;
          }
        }
      } else {
        break;
      }
    } catch (err) {
      console.error(`Error fetching for keyword "${keyword}":`, err);
    }
  }
}


async function fetchAllMovies() {
  for (const keyword of keywords) {
    if (totalFetched >= fetchLimit) break;
    await fetchMoviesByKeyword(keyword);
  }
}

document.addEventListener("DOMContentLoaded", fetchAllMovies);



