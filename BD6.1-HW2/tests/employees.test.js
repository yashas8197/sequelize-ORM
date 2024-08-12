const { getEmployees, getEmployeeById, addEmployee } = require("../employees");

describe("Employees Function", () => {
  it("should get all employees", () => {
    let employees = getEmployees();
    expect(employees.length).toBe(4);
    expect(employees).toEqual([
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
      { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
    ]);
  });

  it("should return employee by id", () => {
    let employee = getEmployeeById(1);
    expect(employee).toEqual({
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    });
  });

  it("should add new employee", () => {
    let newEmployee = {
      id: 5,
      name: "Lisa Brown",
      position: "DevOps Engineer",
    };

    let addedEmployee = addEmployee(newEmployee);

    expect(addedEmployee).toEqual({
      id: 5,
      name: "Lisa Brown",
      position: "DevOps Engineer",
    });
  });
});
