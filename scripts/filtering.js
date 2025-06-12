document.addEventListener("DOMContentLoaded", () => {
  const typeCheckboxes = document.querySelectorAll(".type-filters input[type='checkbox']");
  const yearCheckboxes = document.querySelectorAll(".release-year input[type='checkbox']");
  const movieContainer = document.getElementById("movieContainer");
  const paginationDiv = document.getElementById("paginationControls");

  function getSelected(checkboxes) {
    return Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  async function fetchFilteredMovies(selectedTypes, selectedYears) {
    const keywords = window.keywords; 
    const apiKey = window.apiKey;
    const maxMovies = 60;
    const allFetched = [];
    const seen = new Set();

    for (const keyword of keywords) {
      for (let page = 1; page <= 3; page++) {
        if (allFetched.length >= maxMovies) break;

        let url = `https://www.omdbapi.com/?apikey=${apiKey}&s="${keyword}"&page=${page}`;
        if (selectedTypes.length === 1) url += `&type=${selectedTypes[0]}`; 
        if (selectedYears.length === 1) url += `&y=${selectedYears[0]}`; 

        try {
          const res = await fetch(url);
          const data = await res.json();
          if (data.Response === "True") {
            for (const movie of data.Search) {
              const id = movie.imdbID;
              if (!seen.has(id)) {
                seen.add(id);
                allFetched.push(movie);
                if (allFetched.length >= maxMovies) break;
              }
            }
          } else {
            break; 
          }
        } catch (err) {
          console.error(`Error fetching for keyword "${keyword}"`, err);
        }
      }
      if (allFetched.length >= maxMovies) break;
    }

    return allFetched;
  }

  async function applyFilters() {
    const selectedTypes = getSelected(typeCheckboxes);
    const selectedYears = getSelected(yearCheckboxes);

    movieContainer.innerHTML = "<p>Loading filtered movies...</p>";
    paginationDiv.innerHTML = "";

    const filteredMovies = await fetchFilteredMovies(selectedTypes, selectedYears);

    window.allFetchedMovies = filteredMovies;
    window.currentPage = 1;

    if (filteredMovies.length === 0) {
      movieContainer.innerHTML = "<p>No movies found for the selected filters.</p>";
    } else {
      window.renderPage(filteredMovies, movieContainer);
    }
  }

  
  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  yearCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
});
