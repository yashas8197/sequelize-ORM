const express = require("express");
const { employees } = require("./model/employees.model");
const { sequelize } = require("./lib/index");
const app = express();

const employeeData = [
  {
    name: "Alice",
    salary: 60000,
    department: "Engineering",
    designation: "Software Engineer",
  },
  {
    name: "Bob",
    salary: 70000,
    department: "Marketing",
    designation: "Marketing Manager",
  },
  {
    name: "Charlie",
    salary: 80000,
    department: "Engineering",
    designation: "Senior Software Engineer",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employees.bulkCreate(employeeData);
    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllEmployees() {
  let employee = await employees.findAll();
  return { employee };
}

app.get("/employees", async (req, res) => {
  try {
    let response = await fetchAllEmployees();

    if (response.employee.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchEmployeeById(id) {
  let employee = await employees.findOne({ where: { id } });
  return { employee };
}

app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await fetchEmployeeById(id);

    if (response.employee.length === 0) {
      return res.status(404).json({ message: "No employees Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchEmployeesByDepartment(department) {
  let employee = await employees.findAll({ where: { department } });
  return { employee };
}

app.get("/employees/department/:department", async (req, res) => {
  try {
    let department = req.params.department;
    let response = await fetchEmployeesByDepartment(department);

    if (response.employee.length === 0) {
      return res.status(404).json({ message: "No employees Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortEmployeesBySalary(order) {
  let employee = await employees.findAll({ order: [["salary", order]] });
  return { employee };
}

app.get("/employees/sort/salary?", async (req, res) => {
  try {
    let order = req.query.order;
    let response = await sortEmployeesBySalary(order);

    if (response.employee.length === 0) {
      return res.status(404).json({ message: "No employees Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
