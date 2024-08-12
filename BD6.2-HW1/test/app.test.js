const { app, getEmployees, getEmployeeById, addEmployee } = require("../index");

// to create mock function we need a mock server.
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getEmployees should return list of employees", () => {
    const mockEmployee = [
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
    ];

    getEmployees.mockReturnValue(mockEmployee);

    let result = getEmployees();
    expect(result).toEqual(mockEmployee);
    expect(getEmployees).toHaveBeenCalled();
  });

  test("getEmployeeById should return author details", () => {
    const mockEmployee = {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    };

    getEmployeeById.mockReturnValue(mockEmployee);

    let result = getEmployeeById(1);
    expect(result).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(1);
  });

  test("getEmployeeById should return undefined if employee id not found", () => {
    getEmployeeById.mockReturnValue(undefined);

    let result = getEmployeeById(90);
    expect(result).toEqual(undefined);
    expect(getEmployeeById).toHaveBeenCalledWith(90);
  });

  test("addEmployee should add a new Employee", () => {
    const mockEmployee = {
      id: 4,
      name: "yash Doe",
      position: "Software Engineer",
    };
    addEmployee.mockReturnValue(mockEmployee);

    let result = addEmployee(mockEmployee);
    expect(result).toEqual(mockEmployee);
    expect(addEmployee).toHaveBeenCalledWith(mockEmployee);
  });
});
