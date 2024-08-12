const { app, getMovies, getMovieById, addMovie } = require("./index");

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
