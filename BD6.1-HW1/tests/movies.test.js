const { getMovies, getMovieById, addMovie } = require("../movies");

describe("movies Function", () => {
  it("should get all movies", () => {
    let movies = getMovies();
    expect(movies.length).toBe(4);
    expect(movies).toEqual([
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
      { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
    ]);
  });

  it("should return a book by id", () => {
    let movie = getMovieById(1);
    expect(movie).toEqual({
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    });
  });

  it("should return undefined for non-existant book", () => {
    let movie = getMovieById(8);
    expect(movie).toBeUndefined();
  });

  it("should return new Book", () => {
    let newMovie = {
      id: 5,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
    };

    let addedMovie = addMovie(newMovie);

    expect(addedMovie).toEqual({
      id: 5,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
    });
  });
});
