const apiKey = "5bedaa04";
const keywords = ["The", "A", "Day", "Night", "Man", "Love", "Home", "Batman", "Friends"];
const fetchLimit = 60;

const movieContainer = document.getElementById("movieContainer");
const displayedMovies = new Set();
const allFetchedMovies = [];
let totalFetched = 0;

async function fetchMoviesByKeyword(keyword) {
  for (let page = 1; page <= 3; page++) {
    if (totalFetched >= fetchLimit) return;

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}&page=${page}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True" && data.Search) {
        for (const movie of data.Search) {
          if (!displayedMovies.has(movie.imdbID)) {
            displayedMovies.add(movie.imdbID);
            allFetchedMovies.push(movie);
            totalFetched++;
            if (totalFetched >= fetchLimit) return;
          }
        }
      } else {
        break;
      }
    } catch (err) {
      console.error(`Error fetching movies for keyword "${keyword}":`, err);
    }
  }
}

async function fetchAllMovies() {
  for (const keyword of keywords) {
    if (totalFetched >= fetchLimit) break;
    await fetchMoviesByKeyword(keyword);
  }

  renderPage(allFetchedMovies, movieContainer);
}

function addToFavorites(id, title, year) {
  alert(`Added to Favorites: ${title} (${year})`);
}

function addToWatchlist(id, title, year) {
  alert(`Added to Watchlist: ${title} (${year})`);
}

document.addEventListener("DOMContentLoaded", fetchAllMovies);


