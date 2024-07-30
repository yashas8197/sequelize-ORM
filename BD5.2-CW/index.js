const express = require("express");
const { track } = require("./models/track.model");
const { sequelize } = require("./lib/index");
const app = express();

let movieData = [
  {
    id: 1,
    name: "Raabta",
    artist: "Arijit Singh",
    album: "Agent Vinod",
    genre: "Romantic",
    duration: 4,
    release_year: 2012,
  },
  {
    id: 2,
    name: "Naina Da Kya Kasoor",
    artist: "Amit Trivedi",
    album: "Andhadhun",
    genre: "Pop",
    duration: 3,
    release_year: 2018,
  },
  {
    id: 3,
    name: "Ghoomar",
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    genre: "Traditional",
    duration: 3,
    release_year: 2018,
  },
  {
    id: 4,
    name: "Bekhayali",
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    genre: "Rock",
    duration: 6,
    release_year: 2019,
  },
  {
    id: 5,
    name: "Hawa Banke",
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    genre: "Romantic",
    duration: 3,
    release_year: 2019,
  },
  {
    id: 6,
    name: "Ghungroo",
    artist: "Arijit Singh",
    album: "War",
    genre: "Dance",
    duration: 5,
    release_year: 2019,
  },
  {
    id: 7,
    name: "Makhna",
    artist: "Tanishk Bagchi",
    album: "Drive",
    genre: "Hip-Hop",
    duration: 3,
    release_year: 2019,
  },
  {
    id: 8,
    name: "Tera Ban Jaunga",
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    genre: "Romantic",
    duration: 3,
    release_year: 2019,
  },
  {
    id: 9,
    name: "First Class",
    artist: "Arijit Singh",
    album: "Kalank",
    genre: "Dance",
    duration: 4,
    release_year: 2019,
  },
  {
    id: 10,
    name: "Kalank Title Track",
    artist: "Arijit Singh",
    album: "Kalank",
    genre: "Romantic",
    duration: 5,
    release_year: 2019,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await track.bulkCreate(movieData);

    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
