document.addEventListener("DOMContentLoaded", () => {
  const typeCheckboxes = document.querySelectorAll(".type-filters input[type='checkbox']");
  const yearInput = document.getElementById("yearInput");
  const movieContainer = document.getElementById("movieContainer");

  function getSelectedTypes() {
    return Array.from(typeCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  function getInputYears() {
    const input = yearInput.value.trim();
    if (!input) return [];
    return input
      .split(",")
      .map(y => y.trim())
      .filter(y => /^\d{4}$/.test(y));
  }

  function applyFilters() {
    const selectedTypes = getSelectedTypes();
    const selectedYears = getInputYears();

    const filtered = window.allFetchedMovies.filter(movie => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(movie.Type);
      const yearMatch = selectedYears.length === 0 || selectedYears.includes(movie.Year);
      return typeMatch && yearMatch;
    });

    window.currentPage = 1;
    window.renderPage(filtered, movieContainer);
  }

  // Event Listeners
  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  yearInput.addEventListener("input", debounce(applyFilters, 600));
});

// Simple debounce to avoid too many calls while typing
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}


