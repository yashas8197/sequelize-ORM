const express = require("express");
const app = express();
const { sequelize } = require("./lib/index");
const { roles } = require("./models/role.model");
const { department } = require("./models/department.model");
const { employees } = require("./models/employees.model");

app.use(express.json());

const employeesData = [
  {
    employeeId: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    departmentId: 1,
    roleId: 1,
  },
  {
    employeeId: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    departmentId: 2,
    roleId: 2,
  },
  {
    employeeId: 3,
    name: "Ankit Verma",
    email: "ankit.verma@example.com",
    departmentId: 1,
    roleId: 3,
  },
];

const departmentsData = [
  { departmentId: 1, name: "Engineering" },
  { departmentId: 2, name: "Marketing" },
];

const rolesData = [
  { roleId: 1, title: "Software Engineer" },
  { roleId: 2, title: "Marketing Specialist" },
  { roleId: 3, title: "Product Manager" },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employees.bulkCreate(employeesData);
    await department.bulkCreate(departmentsData);
    await roles.bulkCreate(rolesData);

    res.status(200).json({ message: "Data seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchAllEmployees() {
  const result = await employees.findAll();

  return { employees: result };
}

app.get("/employees", async (req, res) => {
  try {
    const response = await fetchAllEmployees();

    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchEmployeeById(id) {
  const result = await employees.findOne({ where: { id } });

  return { employee: result };
}

app.get("/employees/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetchEmployeeById(id);

    if (response.employee.length === 0) {
      return res.status(404).json({ message: "No Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchEmployeeByDepartment(departmentId) {
  const result = await employees.findAll({ where: { departmentId } });

  return { employees: result };
}

app.get("/employees/department/:departmentId", async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const response = await fetchEmployeeByDepartment(departmentId);

    if (response.employees.length === 0) {
      return res.status(404).json({ message: "Not Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function sortEmployees(order) {
  const result = await employees.findAll({ order: [["name", order]] });

  return { employees: result };
}

app.get("/employees/sort-by-name", async (req, res) => {
  try {
    const order = req.query.order;
    const response = await sortEmployees(order);

    if (response.employees.length === 0) {
      return res.status(404).json({ message: "Not Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewEmployee(newEmployee) {
  const employeeData = await employees.create(newEmployee);

  return { message: "data added successfully", employeeData };
}

app.post("/employees/new", async (req, res) => {
  try {
    const newEmployee = req.body;
    const response = await addNewEmployee(newEmployee);

    if (!response.message) {
      return res.status(404).json({ message: "Not Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updateEmployeeData(id, updateData) {
  const employeeDetail = await employees.findOne({ where: { id } });

  if (!employeeDetail) {
    return {};
  }

  employeeDetail.set(updateData);
  employeeDetail.save();

  return { message: "updated successfully", employeeDetail };
}

app.post("/employees/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const id = parseInt(req.params.id);
    const response = await updateEmployeeData(id, updateData);

    if (!response.message) {
      return res.status(404).json({ message: "Not Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function removeEmployeeData(id) {
  const result = await employees.destroy({ where: { id } });

  return { message: "Data Deleted successfully" };
}

app.post("/employees", async (req, res) => {
  try {
    const id = req.body.id;
    const response = await removeEmployeeData(id);

    if (!response.message) {
      return res.status(404).json({ message: "Not Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchEmployeesByRole(id) {
  const result = await employees.findAll({ where: { id } });

  return { employees: result };
}

app.get("/employees/role/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetchEmployeesByRole(id);

    if (response.employees.length === 0) {
      return res.status(404).json({ message: "Not Employee Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
