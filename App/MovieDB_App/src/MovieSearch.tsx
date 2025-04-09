import React, { useState, useEffect } from "react";

const API_KEY = "thewdb"; // Replace with your OMDB API key
const API_URL = "https://www.omdbapi.com/";

interface Movie {
  Title: string;
  Released: string;
  Poster: string;
  Director: string;
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  // Fetch movie details
  const fetchMovie = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}?t=${title}&apikey=${API_KEY}`);
      const data = await response.json();
      
      if (data.Response === "True") {
        setMovie({
          Title: data.Title,
          Released: data.Released,
          Poster: data.Poster,
          Director: data.Director,
        });

        updateFavorites(data.Title);
      } else {
        alert("Movie not found!");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  // Update favorites list
  const updateFavorites = (title: string) => {
    let updatedFavorites = [title, ...favorites.filter((fav) => fav !== title)];
    if (updatedFavorites.length > 10) {
      updatedFavorites = updatedFavorites.slice(0, 10);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => fetchMovie(query)}>Search</button>
      </div>

      {movie && (
        <div className="movie-details">
          <h2>{movie.Title}</h2>
          <p><strong>Release Date:</strong> {movie.Released}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      )}

      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Hide" : "Show"} Favorites
      </button>

      {showFavorites && (
        <ul className="favorites-list">
          {favorites.map((title, index) => (
            <li key={index} onClick={() => fetchMovie(title)}>
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;