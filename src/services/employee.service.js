const EmployeeRepository = require("../repositories/employee.repository");

class EmployeeService {
  static async getAllEmployees() {
    return EmployeeRepository.findAll();
  }

  static async createEmployee(data) {
    // Business rule
    const existing = await EmployeeRepository.findByEmailOrPhone(
      data.email,
      data.phone
    );

    if (existing.length > 0) {
      const error = new Error("Employee already exists");
      error.status = 409; // Let the global error handler respond with 409 Conflict
      throw error;
    }

    const id = await EmployeeRepository.create(data);
    return { id, ...data };
  }
}

module.exports = EmployeeService;
