const express = require("express");
const app = express();
const { getBooks, getBookById, addBook } = require("./books");
const PORT = 3000;

app.use(express.json());

app.get("/api/books", (req, res) => {
  res.json(getBooks());
});

app.get("/api/books/", (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

app.post("/api/books", (req, res) => {
  const book = addBook(req.body);
  res.status(201).json(book);
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});

module.exports = app;
