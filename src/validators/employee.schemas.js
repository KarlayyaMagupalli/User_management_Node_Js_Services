const Joi = require("joi");

class EmployeeShemas {
  static get employeeSchema() {
    return Joi.object({
      id: Joi.forbidden(),
      emp_code: Joi.string().max(20).required(),
      first_name: Joi.string().max(40).required(),
      last_name: Joi.string().max(40).allow(null, ""),
      email: Joi.string().email().max(100).allow(null, ""),
      phone: Joi.string().max(20).allow(null, ""),
      status: Joi.string().valid("ACTIVE", "INACTIVE", "RESIGNED").allow(null),
      department_id: Joi.number().integer().allow(null),
      job_role_id: Joi.number().integer().allow(null),
      manager_id: Joi.number().integer().allow(null),
      date_of_joining: Joi.date().allow(null),
      created_at: Joi.date().allow(null),
      updated_at: Joi.date().allow(null),
    });
  }
}

module.exports = EmployeeShemas;
