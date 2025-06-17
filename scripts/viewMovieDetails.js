function viewMovieDetails(imdbID) {
  window.location.href = `movie.html?imdbID=${imdbID}`;
}

window.viewMovieDetails = viewMovieDetails;
