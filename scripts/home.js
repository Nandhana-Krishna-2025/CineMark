const apiKey = "57d7ef30";
const keywords = ["The","A", "Day", "Night", "Man", "Love", "Home", "Batman", "Friends"]
const fetchLimit = 120;

const movieContainer = document.getElementById("movieContainer");
const displayedMovies = new Set();
const allFetchedMovies = [];
let totalFetched = 0;

async function fetchMoviesByKeyword(keyword) {
  for (let page = 1; page <= 2; page++) {
    if (totalFetched >= fetchLimit) return;

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s="${keyword}"&page=${page}`;

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

  window.allFetchedMovies = allFetchedMovies;

  renderPage(allFetchedMovies, movieContainer);
}


document.addEventListener("DOMContentLoaded", fetchAllMovies);
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  const filteredMovies = allFetchedMovies.filter(movie =>
    movie.Title.toLowerCase().includes(query)
  );


  window.renderPage(filteredMovies, movieContainer);
});

window.allFetchedMovies = allFetchedMovies;
window.keywords = ["The", "A", "Day", "Night", "Man", "Love", "Home", "Batman", "Friends"];
window.apiKey = "5bedaa04";
window.currentPage = 1;
window.moviesPerPage = 20;

function applyFilters() {
  const typeCheckboxes = document.querySelectorAll(".type-filters input[type='checkbox']");
  const yearCheckboxes = document.querySelectorAll(".release-year input[type='checkbox']");

  const selectedTypes = Array.from(typeCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const selectedYears = Array.from(yearCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const filtered = window.allFetchedMovies.filter(movie => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(movie.Type);
    const yearMatch = selectedYears.length === 0 || selectedYears.includes(movie.Year);
    return typeMatch && yearMatch;
  });

  window.currentPage = 1;
  window.renderPage(filtered, movieContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  const typeCheckboxes = document.querySelectorAll(".type-filters input[type='checkbox']");
  const yearCheckboxes = document.querySelectorAll(".release-year input[type='checkbox']");

  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  yearCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
});

//sider
let currentSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }


  showSlide(currentSlide);


  setInterval(autoSlide, 4000);
});

//toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    document.body.classList.toggle("sidebar-open");
  });
});

