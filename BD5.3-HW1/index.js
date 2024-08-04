const express = require("express");
const { sequelize } = require("./lib/index");
const { post } = require("./modal/post.modal");
const app = express();

app.use(express.json());

const postData = [
  {
    title: "Getting Started with Node.js",
    content:
      "This post will guide you through the basics of Node.js and how to set up a Node.js project.",
    author: "Alice Smith",
  },
  {
    title: "Advanced Express.js Techniques",
    content:
      "Learn advanced techniques and best practices for building applications with Express.js.",
    author: "Bob Johnson",
  },
  {
    title: "ORM with Sequelize",
    content:
      "An introduction to using Sequelize as an ORM for Node.js applications.",
    author: "Charlie Brown",
  },
  {
    title: "Boost Your JavaScript Skills",
    content:
      "A collection of useful tips and tricks to improve your JavaScript programming.",
    author: "Dana White",
  },
  {
    title: "Designing RESTful Services",
    content: "Guidelines and best practices for designing RESTful APIs.",
    author: "Evan Davis",
  },
  {
    title: "Mastering Asynchronous JavaScript",
    content:
      "Understand the concepts and patterns for writing asynchronous code in JavaScript.",
    author: "Fiona Green",
  },
  {
    title: "Modern Front-end Technologies",
    content:
      "Explore the latest tools and frameworks for front-end development.",
    author: "George King",
  },
  {
    title: "Advanced CSS Layouts",
    content: "Learn how to create complex layouts using CSS Grid and Flexbox.",
    author: "Hannah Lewis",
  },
  {
    title: "Getting Started with React",
    content: "A beginner's guide to building user interfaces with React.",
    author: "Ian Clark",
  },
  {
    title: "Writing Testable JavaScript Code",
    content:
      "An introduction to unit testing and test-driven development in JavaScript.",
    author: "Jane Miller",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(postData);

    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllPosts() {
  const posts = await post.findAll();
  return { posts };
}

app.get("/posts", async (req, res) => {
  try {
    const response = await fetchAllPosts();

    if (response.posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewPost(newPostData) {
  let createdPost = await post.create(newPostData);
  return { createdPost };
}

app.post("/posts/new", async (req, res) => {
  try {
    let newPost = req.body.newPost;

    let response = await addNewPost(newPost);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updatePostById(updatePostData, id) {
  const postDetails = await post.findOne({ where: { id } });

  if (!postDetails) {
    return {};
  }

  postDetails.set(updatePostData);
  let updatePost = await postDetails.save();
  return { message: "track Updated successfully", updatePost };
}

app.post("/posts/update/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newPostData = req.body;
    const response = await updatePostById(newPostData, id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function deletePostById(id) {
  const destroyedPost = await post.destroy({ where: { id } });
  if (destroyedPost === 0) {
    return {};
  }

  return { message: "post record deleted" };
}

app.post("/posts/delete", async (req, res) => {
  try {
    const id = parseInt(req.body.id);

    const response = await deletePostById(id);

    if (!response.message) {
      return res.status(404).json({ message: "post not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
