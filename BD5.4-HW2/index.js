const express = require("express");
const { sequelize } = require("./lib/index");
const { course } = require("./models/course.model");
const { student } = require("./models/student.model");
const app = express();

app.use(express.json());

const courseData = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

const studentData = [{ name: "John Doe", age: 24 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await student.bulkCreate(studentData);

    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewStudent(newStudent) {
  let newData = await student.create(newStudent);

  return { newData };
}

app.get("/students", async (req, res) => {
  try {
    const response = await student.findAll();

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/students/new", async (req, res) => {
  try {
    const newStudent = req.body.newStudent;
    let response = await addNewStudent(newStudent);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updateStudentById(newStudentData, id) {
  const studentDetails = await student.findOne({ where: { id } });

  if (!studentDetails) {
    return {};
  }

  studentDetails.set(newStudentData);
  const updatedData = await studentDetails.save();
  return { message: "Updated Data Successfully", updatedData };
}

app.post("/students/update/:id", async (req, res) => {
  try {
    const newStudentData = req.body;
    const id = parseInt(req.params.id);
    let response = await updateStudentById(newStudentData, id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
