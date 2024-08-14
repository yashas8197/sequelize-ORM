const request = require("supertest");
const {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should retrieve all reviews", async () => {
    const mockReview = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];

    getAllReviews.mockResolvedValue(mockReview);

    const result = await request(server).get("/reviews");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReview);
  });

  it("Should retrive a specific review by id", async () => {
    const mockReview = { id: 1, content: "Great product!", userId: 1 };

    getReviewById.mockResolvedValue(mockReview);

    const result = await request(server).get("/reviews/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockReview);
  });

  it("Should add a new review", async () => {
    const mockReview = { id: 3, content: "good product!", userId: 1 };

    addReview.mockResolvedValue(mockReview);

    const response = await request(server)
      .post("/reviews/new")
      .send({ content: "good product!", userId: 1 });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(mockReview);
  });

  it("Should retrive a specific user ny id", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "John.doe@example.com" };

    getUserById.mockResolvedValue(mockUser);

    const response = await request(server).get("/users/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockUser);
  });

  it("Should add a new user", async () => {
    const mockUser = { id: 3, name: "Alice", email: "Alice@example.com" };

    addUser.mockResolvedValue(mockUser);

    const response = await request(server)
      .post("/users/new")
      .send({ name: "Alice", email: "Alice@example.com" });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(mockUser);
  });

  it("should return 404 for non exsiting review", async () => {
    getReviewById.mockResolvedValue(null);

    const response = await request(server).get("/reviews/details/7");

    expect(response.statusCode).toEqual(404);
  });

  it("should return 404 for non exsiting user", async () => {
    getUserById.mockResolvedValue(null);

    const response = await request(server).get("/users/details/7");

    expect(response.statusCode).toEqual(404);
  });
});
