const express = require("express");
const app = express();
const { getMovies, getMovieById, addMovie } = require("./movies");

app.use(express.json());

app.get("/api/movies", (req, res) => {
  res.json(getMovies());
});

app.get("/api/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(getMovieById(id));
});

app.post("/api/movies", (req, res) => {
  const { newMovie } = req.body;
  res.json(addMovie(newMovie));
});

app.listen(3000, () => {
  console.log("Sever is running in port 3000");
});
