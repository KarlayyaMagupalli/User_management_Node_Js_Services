const express = require('express');
const rateLimit = require('express-rate-limit');
const EmployeeController = require('../controllers/employee.controller');

const route = express.Router();

// Rate limiting
const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many account creation attempts, please try again later'
  }
});

// Create Employee CRUD Operations
route.post('/employee',createAccountLimiter,EmployeeController.createEmployee);

module.exports = route;
