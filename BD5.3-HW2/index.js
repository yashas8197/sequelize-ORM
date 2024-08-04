const express = require("express");
const { sequelize } = require("./lib");
const { employee } = require("./models/employee.modal");
const app = express();

app.use(express.json());

const employeeData = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 2,
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    id: 3,
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    id: 5,
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    id: 7,
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    id: 8,
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    id: 9,
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    id: 10,
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeeData);

    return res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchAllEmployees() {
  try {
    const employees = await employee.findAll();
    return { employees: employees };
  } catch (error) {
    throw error;
  }
}

app.get("/employees", async (req, res) => {
  try {
    const response = await fetchAllEmployees();

    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No employees Found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function addNewEmployee(employeeData) {
  console.log(employeeData);
  const createdEmployee = await employee.create(employeeData);
  return { createdEmployee };
}

app.post("/employees/new", async (req, res) => {
  try {
    const newEmployee = req.body.employeeNew;
    const response = await addNewEmployee(newEmployee);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function updateEmployeeById(id, newEmployeeData) {
  try {
    const updatedDetails = await employee.findOne({ where: { id } });

    if (!updatedDetails) {
      return {};
    }

    updatedDetails.set(newEmployeeData);
    const updateEmployee = await updatedDetails.save();
    return { message: "track Updated successfully", updateEmployee };
  } catch (error) {
    throw error;
  }
}

app.post("/employees/update/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newEmployeeData = req.body;

    let response = await updateEmployeeById(id, newEmployeeData);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

async function deleteEmployeeById(id) {
  try {
    const destroyedEmployee = await employee.destroy({ where: { id } });
    if (destroyedEmployee === 0) {
      return {};
    }

    return { message: "post record deleted" };
  } catch (error) {
    throw error;
  }
}

app.post("/employees/delete", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    let response = await deleteEmployeeById(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
