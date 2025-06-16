function addToWatchlist(imgElement, id, title, year, poster) {
  let watched = JSON.parse(localStorage.getItem("watched")) || [];

  const index = watched.findIndex(movie => movie.id === id);

  if (index !== -1) {
    watched.splice(index, 1);
    imgElement.src = "/assets/icons/tick.png"; // not watched
  } else {
    watched.push({ id, title, year, poster });
    imgElement.src = "/assets/icons/ticked.png"; //  watched
  }

  localStorage.setItem("watched", JSON.stringify(watched));
}

function isMovieWatched(id) {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];
  return watched.some(movie => movie.id === id);
}
