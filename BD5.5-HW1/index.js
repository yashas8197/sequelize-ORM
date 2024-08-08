const express = require("express");
const { sequelize } = require("./lib/index");
const { books } = require("./models/book.model");
const { user } = require("./models/user.model");
const { like } = require("./models/like.model");
const { Op } = require("@sequelize/core");

const app = express();

const bookData = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.create({
      username: "booklover",
      email: "booklover@gmail.com",
      password: "password123",
    });
    await books.bulkCreate(bookData);
    res.status(200).json({ message: "Database seeding successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function likeBook(data) {
  try {
    let newLike = await like.create({
      userId: data.userId,
      bookId: data.bookId,
    });

    return { message: "Book Liked", newLike };
  } catch (error) {
    console.log(error);
  }
}

app.get("/users/:id/like", async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.query.bookId;

    const response = await likeBook({ userId, bookId });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function dislikeBook(data) {
  const count = await like.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });

  if (count === 0) return {};

  return { message: "Book disliked" };
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.query.bookId;

    const response = await dislikeBook({ userId, bookId });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function getAllLikedBooks(userId) {
  let bookIds = await like.findAll({
    where: { userId },
    attributes: ["bookId"],
  });

  const bookRecords = [];

  for (let i = 0; i < bookIds.length; i++) {
    bookRecords.push(bookIds[i].bookId);
  }

  let likedBook = await books.findAll({
    where: { id: { [Op.in]: bookRecords } },
  });

  return likedBook;
}

app.get("/users/:id/liked", async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await getAllLikedBooks(userId);

    if (response.likedBook.length === 0) {
      return res.status(404).json({ message: "No liked Book found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
