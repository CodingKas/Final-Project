const API_KEY = "thewdb";
const API_URL = "https://www.omdbapi.com/?t=";

const movieInput = document.getElementById("movie-input");
const movieDetails = document.getElementById("movie-details");
const favoritesList = document.getElementById("favorites-list");
const historyList = document.getElementById("history-list");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function searchMovie() {
  const title = movieInput.value.trim();
  if (!title) return alert("Enter a movie title!");

  fetch(`${API_URL}${title}&apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovie(data);
        updateHistory(title);
      } else {
        alert("Movie not found!");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayMovie(movie) {
  movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Release Date:</strong> ${movie.Released}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <br>
        <button onclick="addToFavorites('${movie.Title}')">⭐ Add to Favorites</button>
    `;
}

function addToFavorites(title) {
  if (!favorites.includes(title)) {
    favorites.unshift(title);
    if (favorites.length > 10) favorites.pop();
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

function toggleFavorites() {
  favoritesList.classList.toggle("hidden");
  renderFavorites();
}

function renderFavorites() {
  favoritesList.innerHTML =
    "<h3>⭐ Favorites</h3>" +
    favorites
      .map((title) => `<li onclick="fetchMovie('${title}')">${title}</li>`)
      .join("");
}

function fetchMovie(title) {
  movieInput.value = title;
  searchMovie();
}

function updateHistory(title) {
  if (!history.includes(title)) {
    history.unshift(title);
    localStorage.setItem("history", JSON.stringify(history));
  }
}

function renderHistory() {
  historyList.innerHTML = history
    .map((title) => `<li onclick="fetchMovie('${title}')">${title}</li>`)
    .join("");
}

function showSearch() {
  document.getElementById("search-section").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");
}

function showHistory() {
  renderHistory();
  document.getElementById("search-section").classList.add("hidden");
  document.getElementById("history-section").classList.remove("hidden");
}

// Initialize favorites and history
renderFavorites();
renderHistory();
