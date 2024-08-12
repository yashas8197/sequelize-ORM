const { mock } = require("node:test");
const { app, getMovies, getMovieById, addMovie } = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Functions test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getMovies return all the movies", () => {
    const mockMovie = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
    ];

    getMovies.mockReturnValue(mockMovie);

    let result = getMovies();
    expect(result).toEqual(mockMovie);
    expect(getMovies).toHaveBeenCalled();
  });

  test("getMovieById return movie by its id", () => {
    const mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };

    getMovieById.mockReturnValue(mockMovie);

    let result = getMovieById(1);
    expect(result).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  test("getMovieById return movie by its id", () => {
    getMovieById.mockReturnValue(undefined);

    let result = getMovieById(99);
    expect(result).toEqual(undefined);
    expect(getMovieById).toHaveBeenCalledWith(99);
  });

  test("addMovie return a new Movie", () => {
    const mockMovie = {
      id: 4,
      title: "ABCD",
      director: "Frank Darabont",
    };

    addMovie.mockReturnValue(mockMovie);

    let result = addMovie(mockMovie);
    expect(result).toEqual(mockMovie);
    expect(addMovie).toHaveBeenCalledWith(mockMovie);
  });
});
