const express = require("express");
let { books } = require("./models/books.models");
let { sequelize } = require("./lib/index");

const app = express();

let bookData = [
  {
    title: "The Alchemist",
    genre: "Adventure",
    publication_year: 1988,
    author: "Paulo Coelho",
    publisher: "HarperCollins",
    pages: 208,
  },
  {
    title: "To Kill a Mockingbird",
    genre: "Fiction",
    publication_year: 1960,
    author: "Harper Lee",
    publisher: "J.B. Lippincott & Co.",
    pages: 281,
  },
  {
    title: "1984",
    genre: "Dystopian",
    publication_year: 1949,
    author: "George Orwell",
    publisher: "Secker & Warburg",
    pages: 328,
  },
  {
    title: "The Great Gatsby",
    genre: "Classic",
    publication_year: 1925,
    author: "F. Scott Fitzgerald",
    publisher: "Charles Scribner's Sons",
    pages: 180,
  },
  {
    title: "Pride and Prejudice",
    genre: "Romance",
    publication_year: 1813,
    author: "Jane Austen",
    publisher: "T. Egerton",
    pages: 279,
  },
  {
    title: "The Catcher in the Rye",
    genre: "Fiction",
    publication_year: 1951,
    author: "J.D. Salinger",
    publisher: "Little, Brown and Company",
    pages: 277,
  },
  {
    title: "Moby-Dick",
    genre: "Adventure",
    publication_year: 1851,
    author: "Herman Melville",
    publisher: "Harper & Brothers",
    pages: 635,
  },
  {
    title: "The Hobbit",
    genre: "Fantasy",
    publication_year: 1937,
    author: "J.R.R. Tolkien",
    publisher: "George Allen & Unwin",
    pages: 310,
  },
  {
    title: "The Da Vinci Code",
    genre: "Thriller",
    publication_year: 2003,
    author: "Dan Brown",
    publisher: "Doubleday",
    pages: 489,
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    genre: "Non-Fiction",
    publication_year: 2011,
    author: "Yuval Noah Harari",
    publisher: "Harvill Secker",
    pages: 443,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await books.bulkCreate(bookData);

    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Sending the Data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running in port 3000");
});
