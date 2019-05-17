import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./Movie";
import _ from 'lodash';
const App = () => {
  const APP_KEY = "4c15b40ed5d5289859ad7836af15d25e";

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [dataGenre, setData] = useState({})
  const imgURL = `https://image.tmdb.org/t/p/w185/`;
  const movieURL = `https://www.themoviedb.org/movie/`

  useEffect(() => {
    debouncedGetMovies();
  }, [search]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    const responseGenres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APP_KEY}`
    );
    const dataGenres = await responseGenres.json();
    setData(dataGenres);
    console.log(dataGenres)
  };
  const getMovies = async () => {
    if(movies !== undefined) {
      const response = await fetch(
      `/api/movies?query=${search}`
      );
      const data = await response.json();
      if (data.results !== undefined) { // testing the return value of the API call, if empty then set movies to an empty array
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    }
  };


  

  const debouncedGetMovies = _.debounce(getMovies,500); // we don't call the API every time the user enters a new key but every 1000ms
  
  const updateSearch = e => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  const getSearch = e => {
    setSearch(e.target.value);
  }; 
  
  return (
    <div className="App">
      <h1 className="App-Title">Movie Catalog</h1>
      <form  className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="Search a movie"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="movies-class">
        {movies.map(movie => (
        <Movie
        key={movie.id}
        title={movie.title}
        overview={movie.overview}
        img={imgURL + movie.poster_path}
        movieLink = {movieURL + movie.id}
        releaseDate = {movie.release_date}
        ratings = {movie.vote_average}
        genres = {movie.genre_ids}
        matchingGenres = {dataGenre.genres}
        />
        ))}
      </div>

      
    </div>
  );
};

export default App;