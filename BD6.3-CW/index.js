const express = require("express");
const app = express();
app.use(express.json());

const reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

const users = [
  { id: 1, name: "John Doe", email: "John.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "Jane.smith@example.com" },
];

async function getAllReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function addReview(data) {
  data.id = reviews.length + 1;
  reviews.push(data);
  return data;
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function addUser(user) {
  user.id = users.length + 1;
  users.push(user);
  return user;
}

app.get("/reviews", async (req, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
});

app.get("/reviews/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  if (!review) return res.status(404).send("Review Not Found");
  res.json(review);
});

app.post("/reviews/new", async (req, res) => {
  const newReviews = await addReview(req.body);
  res.status(201).json(newReviews);
});

app.get("/users/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (!user) return res.status(404).json("User not Found");
  res.json(user);
});

app.post("/users/new", async (req, res) => {
  const newUser = await addUser(req.body);
  res.status(201).json(newUser);
});

module.exports = {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
};
