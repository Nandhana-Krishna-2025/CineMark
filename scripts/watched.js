document.addEventListener("DOMContentLoaded", () => {
  const favouritesContainer = document.getElementById("favouritesContainer");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.length === 0) {
    favouritesContainer.innerHTML = "<p>No favourite movies added yet.</p>";
    return;
  }

  favourites.forEach(movie => {
    const poster = movie.poster && movie.poster !== "N/A" ? movie.poster : "/assets/images/placeholder.png";

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <div class="movie-actions">
          <button class="fav-btn" title="Remove from Favourites">
            <img src="/assets/icons/red_heart.png" alt="Remove from Favourites" class="heart-icon" />
          </button>
        </div>
      </div>
    `;

    const heartIcon = card.querySelector(".heart-icon");
    heartIcon.addEventListener("click", () => {
      removeFromFavourites(movie.id);
      card.remove();

      if (favouritesContainer.children.length === 0) {
        favouritesContainer.innerHTML = "<p>No favourite movies added yet.</p>";
      }
    });

    favouritesContainer.appendChild(card);
  });
});

function removeFromFavourites(id) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter(movie => movie.id !== id);
  localStorage.setItem("favourites", JSON.stringify(favourites));
}
