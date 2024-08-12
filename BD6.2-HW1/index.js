const express = require("express");
const app = express();

app.use(express.json());

const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

function getEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find((emp) => emp.id === id);
}

function addEmployee(newEmployee) {
  employees.push(newEmployee);
  return employees;
}

app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/employees/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json("Empolyee not found");
  }
});

app.post("/employees/new", (req, res) => {
  const newEmployee = req.body;
  res.status(201).json(addEmployee(newEmployee));
});

module.exports = { app, getEmployees, getEmployeeById, addEmployee };
