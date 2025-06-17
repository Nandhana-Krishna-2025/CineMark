function viewMovieDetails(imdbID) {
  const apiKey = "57d7ef30";

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        //  Save full movie details
        localStorage.setItem("selectedMovie", JSON.stringify(data));
        //  Go to movie.html
        window.location.href = "movie.html";
      } else {
        alert("Movie not found!");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

window.viewMovieDetails = viewMovieDetails;
