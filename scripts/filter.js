  document.addEventListener("DOMContentLoaded", () => {
  const typeCheckboxes = document.querySelectorAll(".type-filters input[type='checkbox']");
  const yearInput = document.getElementById("yearInput");
  const movieContainer = document.getElementById("movieContainer");

  const apiKey = window.apiKey;
  const keywords = window.keywords;
  const fetchLimit = 9; 

  function getSelectedTypes() {
    return Array.from(typeCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  // function getInputYears() {
  //   const input = yearInput.value.trim();
  //   if (!input) return [];
  //   return input
  //     .split(",")
  //     .map(y => y.trim())
  //     .filter(y => /^\d{4}$/.test(y));
  // }
  function getInputYears() {
  const input = yearInput.value.trim();
  const errorDiv = document.getElementById("yearError");

  if (!input) {
    errorDiv.textContent = ""; 
    return [];
  }

  const parts = input.split(",").map(y => y.trim());
  const invalid = parts.filter(y => !/^\d{4}$/.test(y));

  if (invalid.length > 0) {
    errorDiv.textContent = "Invalid format: Only 4-digit years separated by commas are allowed.";
    return []; 
  } else {
    errorDiv.textContent = ""; 
    return parts;
  }
}


  async function fetchMoviesWithFilters(type = "", year = "") {
    let collected = [];

    for (let i = 0; i < fetchLimit; i++) {
      const keyword = keywords[i];
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(keyword)}${type ? `&type=${type}` : ""}${year ? `&y=${year}` : ""}&page=1`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
          collected.push(...data.Search);
        }
      } catch (err) {
        console.error("Filter fetch error:", err);
      }
    }

    return collected;
  }

  async function applyFilters() {
    const selectedTypes = getSelectedTypes(); 
    const selectedYears = getInputYears();    

    const results = [];

    
    if (selectedTypes.length === 0 && selectedYears.length === 0) {
      const defaultMovies = await fetchMoviesWithFilters();
      window.renderPage(defaultMovies, movieContainer);
      return;
    }

   
    for (const type of selectedTypes.length ? selectedTypes : [""]) {
      for (const year of selectedYears.length ? selectedYears : [""]) {
        const movies = await fetchMoviesWithFilters(type, year);
        results.push(...movies);
      }
    }

   
    // const uniqueMovies = Array.from(
    //   new Map(results.map(m => [m.imdbID, m])).values()
    // );
    const uniqueMovies = Array.from(
    new Map(results.map(m => [`${m.Title}-${m.Year}`, m])).values()
);



    window.renderPage(uniqueMovies, movieContainer);
  }

  
  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  yearInput.addEventListener("input", debounce(applyFilters, 10));

  
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
});

