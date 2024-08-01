const express = require("express");
const { sequelize } = require("./lib/index");
const { tracks } = require("./models/track.model");
const app = express();

app.use(express.json());

const movieData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await tracks.bulkCreate(movieData);
    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllTracks() {
  let track = await tracks.findAll();
  return { track };
}

app.get("/tracks", async (req, res) => {
  try {
    const response = await fetchAllTracks();

    if (response.track.length === 0) {
      return res.status(404).json({ message: "No Tracks Found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewTrack(trackData) {
  let newTrack = await tracks.create(trackData);
  return { newTrack };
}

app.post("/tracks/new", async (req, res) => {
  try {
    let newTrack = req.body.newTrack;
    let response = await addNewTrack(newTrack);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updateTrackById(updateTrackData, id) {
  let trackDetails = await tracks.findOne({ where: { id } });

  if (!trackDetails) {
    return {};
  }

  trackDetails.set(updateTrackData);
  let updatedTrack = await trackDetails.save();

  return { message: "track Updated successfully", updatedTrack };
}

app.post("/tracks/update/:id", async (req, res) => {
  try {
    const newTrackData = req.body;
    const id = parseInt(req.params.id);
    const response = await updateTrackById(newTrackData, id);

    if (!response.message) {
      return res.status(404).json({ message: "track not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function deleteTrackById(id) {
  let destroyedTrack = await tracks.destroy({ where: { id } });

  if (destroyedTrack === 0) {
    return {};
  }

  return { message: "track record deleted" };
}

app.post("/tracks/delete", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const response = await deleteTrackById(id);

    if (!response.message) {
      return res.status(404).json({ message: "track not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
