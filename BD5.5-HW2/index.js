const express = require("express");
const { sequelize } = require("./lib/index");
const { user } = require("./models/user.model");
const { movie } = require("./models/movie.model");
const { like } = require("./models/like.model");
const { Op } = require("@sequelize/core");
const app = express();

const movieData = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    summary:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    summary:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    year: 1994,
    summary:
      "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    year: 2008,
    summary:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    year: 1994,
    summary:
      "The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man with an IQ of 75.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await user.create({
      username: "moviefan",
      email: "moviefan@gmail.com",
      password: "password123",
    });

    await movie.bulkCreate(movieData);
    res.status(200).json({ message: "Database seeding successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function likeMovie(data) {
  const newLike = await like.create({
    userId: data.userId,
    movieId: data.movieId,
  });

  return { message: "Movie Liked", newLike };
}

app.get("/users/:id/like", async (req, res) => {
  try {
    const userId = req.params.id;
    const movieId = req.query.movieId;

    const response = await likeMovie({ userId, movieId });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function dislikeMovie(data) {
  const count = await like.destroy({
    where: {
      userId: data.userId,
      movieId: data.movieId,
    },
  });

  if (count === 0) return {};

  return { message: "Book disliked" };
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    const userId = req.params.id;
    const movieId = req.query.movieId;
    const response = await dislikeMovie({ userId, movieId });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function getAllLikedMovies(userId) {
  try {
    const movieIds = await like.findAll({
      where: { userId },
      attributes: ["movieId"],
    });

    const movieRecords = [];

    for (let i = 0; i < movieIds.length; i++) {
      movieRecords.push(movieIds[i].movieId);
    }

    const likedMovies = await movie.findAll({
      where: { id: { [Op.in]: movieRecords } },
    });

    return { likedMovies };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/users/:id/liked", async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await getAllLikedMovies(userId);

    if (response.likedMovies.length === 0) {
      return res.status(404).json({ message: "No liked Movie found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
