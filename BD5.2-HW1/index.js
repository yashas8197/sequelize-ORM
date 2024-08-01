const express = require("express");
const { posts } = require("./models/post.model");
const { sequelize } = require("./lib/index");

const app = express();

const postsData = [
  {
    name: "Post1",
    author: "Author1",
    content: "This is the content of post 1",
    title: "Title1",
  },
  {
    name: "Post2",
    author: "Author2",
    content: "This is the content of post 2",
    title: "Title2",
  },
  {
    name: "Post3",
    author: "Author1",
    content: "This is the content of post 3",
    title: "Title3",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await posts.bulkCreate(postsData);
    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

async function fetchAllPosts() {
  let post = await posts.findAll();
  return { post };
}

app.get("/posts", async (req, res) => {
  try {
    let response = await fetchAllPosts();
    if (response.post.length === 0) {
      return res.status(404).json({ message: "No Posts Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPostById(id) {
  let post = await posts.findOne({ where: { id } });
  return { post };
}

app.get("/posts/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await fetchPostById(id);

    if (response.post.length === 0) {
      return res.status(404).json({ message: "No Posts Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchPostsByAuthor(author) {
  let post = await posts.findAll({ where: { author } });
  return { post };
}

app.get("/posts/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let response = await fetchPostsByAuthor(author);

    if (response.post.length === 0) {
      return res.status(404).json({ message: "No Posts Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortPostsByName(order) {
  let post = await posts.findAll({ order: [["name", order]] });
  return { post };
}

app.get("/posts/sort/name", async (req, res) => {
  try {
    let order = req.query.order;
    let response = await sortPostsByName(order);

    if (response.post.length === 0) {
      return res.status(404).json({ message: "No Posts Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
