// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.getElementById("searchInput");
//   const suggestionsBox = document.getElementById("suggestions");
//   const apiKey = "57d7ef30"; 

//   let searchTimeout;

//   function debounce(func, delay) {
//     return (...args) => {
//       clearTimeout(searchTimeout);
//       searchTimeout = setTimeout(() => func.apply(this, args), delay);
//     };
//   }

//   async function fetchSearchResults(query) {
//     const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&page=1`;

//     try {
//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.Response === "True") {
//         renderSuggestions(data.Search);
//       } else {
//         suggestionsBox.innerHTML = "<div class='no-result'>No results found.</div>";
//       }
//     } catch (err) {
//       console.error("Search API error:", err);
//     }
//   }

//   function renderSuggestions(movies) {
//     suggestionsBox.innerHTML = "";

//     movies.slice(0, 10).forEach(movie => {
//       const item = document.createElement("div");
//       item.className = "suggestion-item";
//       item.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;

//       item.addEventListener("click", () => {
//         searchInput.value = movie.Title;
//         suggestionsBox.innerHTML = "";

        
//         const match = window.allFetchedMovies?.filter(
//           m => m.Title.toLowerCase().includes(movie.Title.toLowerCase())
//         );
//         if (match?.length) {
//           window.renderPage(match, document.getElementById("movieContainer"));
//         } else {
//           fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
//             .then(res => res.json())
//             .then(full => {
//               window.renderPage([full], document.getElementById("movieContainer"));
//             });
//         }
//       });

//       suggestionsBox.appendChild(item);
//     });
//   }

//   searchInput.addEventListener(
//     "input",
//     debounce((e) => {
//       const query = e.target.value.trim();
//       if (query.length >= 3) {
//         fetchSearchResults(query);
//       } else {
//         suggestionsBox.innerHTML = "";
//       }
//     }, 500)
//   );
// });

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  const movieContainer = document.getElementById("movieContainer");
  const apiKey = "57d7ef30";

  let searchTimeout;
  let words = [];

  function debounce(func, delay) {
    return (...args) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  async function fetchMoviesByWords(wordsArray) {
    const results = [];

    for (const word of wordsArray) {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(word)}&page=1`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
          results.push(...data.Search);
        }
      } catch (err) {
        console.error("Search API error:", err);
      }
    }


    const unique = Array.from(new Map(results.map(m => [m.imdbID, m])).values());
    window.renderPage(unique, movieContainer);
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
      console.error("Autocomplete API error:", err);
    }
  }

  function renderSuggestions(movies) {
    suggestionsBox.innerHTML = "";

    movies.slice(0, 10).forEach(movie => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;

      item.addEventListener("click", () => {
        searchInput.value = movie.Title;
        suggestionsBox.innerHTML = "";

        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
          .then(res => res.json())
          .then(movieDetails => {
            window.renderPage([movieDetails], movieContainer);
          });
      });

      suggestionsBox.appendChild(item);
    });
  }

  searchInput.addEventListener(
  "input",
  debounce(async (e) => {
    const inputText = e.target.value.trim();
    suggestionsBox.innerHTML = "";

    if (inputText.length < 3) {
     
      if (window.allFetchedMovies && window.allFetchedMovies.length) {
        window.renderPage(window.allFetchedMovies, document.getElementById("movieContainer"));
      }
      return;
    }

    fetchSearchResults(inputText);

    const newWords = Array.from(
      new Set(inputText.split(/\s+/).filter(w => w.length >= 3))
    );

    words = newWords;

    fetchMoviesByWords(words);
  }, 300)
);


});
