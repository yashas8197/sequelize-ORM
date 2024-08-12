const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getMovies() {
  return movies;
}

function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function addMovie(newMovie) {
  movies.push(newMovie);
  return movies;
}

app.get("/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/movies/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = getMovieById(id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json("Movie not found");
  }
});

app.post("/movies/new", (req, res) => {
  const newMovie = req.body;
  res.status(201).json(addMovie(newMovie));
});

module.exports = { app, getMovies, getMovieById, addMovie };
