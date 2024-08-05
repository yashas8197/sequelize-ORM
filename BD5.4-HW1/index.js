const { sequelize } = require("./lib/");
const { books } = require("./models/book.model");
const { author } = require("./models/author.model");
const express = require("express");
const app = express();

app.use(express.json());

const booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

const authorData = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await books.bulkCreate(booksData);

    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewAuthor(newAuthor) {
  let newData = await author.create(newAuthor);
  return { newData };
}

app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    console.log(newAuthor);
    let response = await addNewAuthor(newAuthor);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updateAuthorById(id, newAuthorData) {
  let authorDetails = await author.findOne({ where: { id } });

  if (!authorDetails) {
    return {};
  }

  authorDetails.set(newAuthorData);
  let updatedAuthor = await authorDetails.save();

  return { message: "updated author", updatedAuthor };
}

app.post("/authors/update/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newAuthorData = req.body;
    const response = await updateAuthorById(id, newAuthorData);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



app.listen(3000, () => {
  console.log("server is running in port 3000");
});
