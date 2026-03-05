const pool = require("../config/db");

class EmployeeRepository {
  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM employees");
    return rows;
  }

  static async findByEmailOrPhone(email, phone) {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE email = ? OR phone = ?",
      [email, phone]
    );
    return rows;
  }

  static async create(data) {
    const {
      emp_code,
      first_name,
      last_name,
      email,
      phone,
      department_id,
      job_role_id,
      manager_id,
      date_of_joining,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO employees 
       (emp_code, first_name, last_name, email, phone, department_id, job_role_id, manager_id, date_of_joining)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [emp_code, first_name, last_name, email, phone, department_id, job_role_id, manager_id, date_of_joining]
    );

    return result.insertId;
  }
}

module.exports = EmployeeRepository;
