document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  const apiKey = "57d7ef30"; 

  let searchTimeout;

  function debounce(func, delay) {
    return (...args) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  async function fetchSearchResults(query) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        renderSuggestions(data.Search);
      } else {
        suggestionsBox.innerHTML = "<div class='no-result'>No results found.</div>";
      }
    } catch (err) {
      console.error("Search API error:", err);
    }
  }

  function renderSuggestions(movies) {
    suggestionsBox.innerHTML = "";

    movies.slice(0, 5).forEach(movie => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;

      item.addEventListener("click", () => {
        searchInput.value = movie.Title;
        suggestionsBox.innerHTML = "";

        
        const match = window.allFetchedMovies?.filter(
          m => m.Title.toLowerCase().includes(movie.Title.toLowerCase())
        );
        if (match?.length) {
          window.renderPage(match, document.getElementById("movieContainer"));
        } else {
          fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
            .then(res => res.json())
            .then(full => {
              window.renderPage([full], document.getElementById("movieContainer"));
            });
        }
      });

      suggestionsBox.appendChild(item);
    });
  }

  searchInput.addEventListener(
    "input",
    debounce((e) => {
      const query = e.target.value.trim();
      if (query.length >= 3) {
        fetchSearchResults(query);
      } else {
        suggestionsBox.innerHTML = "";
      }
    }, 500)
  );
});

