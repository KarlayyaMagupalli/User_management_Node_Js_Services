const EmployeeSchemas = require("../validators/employee.schemas");
const EmployeeServices = require("../services/employee.service");

class EmployeeController {
  static async createEmployee(req, res, next) {
    try {

      // Validate request body against the schema

      const { error, value } =
        EmployeeSchemas.employeeSchema.validate(req.body);

      if (error) {
        error.status = 400;        // 👈 tell global handler it's a bad request
        return next(error);
      }

      // Create employee using the service layer

      const employee =
        await EmployeeServices.createEmployee(value);

      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });

    } catch (error) {
      next(error); // 🔥 KEY LINE
    }
  }
}

module.exports = EmployeeController;
