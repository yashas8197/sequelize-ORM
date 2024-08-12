const express = require("express");
const app = express();
const { getEmployees, getEmployeeById, addEmployee } = require("./employees");
const PORT = 3000;

app.use(express.json());

app.get("/api/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  res.json(getEmployeeById(employeeId));
});

app.post("/api/employees", (req, res) => {
  const newEmployee = req.body.newEmployee;
  res.status(201).json(addEmployee(newEmployee));
});

app.listen(PORT, () => {
  console.log("Server is running in port 3000");
});

module.exports = { app };
