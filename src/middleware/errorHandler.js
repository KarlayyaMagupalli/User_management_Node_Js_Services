const logger = require("../utils/logger");

const errorHandler = (error, req, res, next) => {
  logger.error("Unhandled error", {
    message: error.message,
    stack: error.stack,
    code: error.code
  });

  /* =========================
     1️⃣ JOI / VALIDATION ERRORS
     ========================= */
  if (error.isJoi) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map(d => d.message)
    });
  }

  /* =========================
     2️⃣ POSTGRES / COCKROACHDB
     ========================= */
  if (error.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry found",
      field: error.constraint
    });
  }

  if (error.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Referenced record does not exist"
    });
  }

  if (error.code === "23502") {
    return res.status(400).json({
      success: false,
      message: "Required field is missing"
    });
  }

  if (error.code === "42P01") {
    return res.status(500).json({
      success: false,
      message: "Database table does not exist"
    });
  }

  /* =========================
     3️⃣ MYSQL ERROR HANDLING
     ========================= */

  // Duplicate entry
  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry found",
      error: error.sqlMessage
    });
  }

  // Foreign key violation
  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      success: false,
      message: "Referenced record does not exist"
    });
  }

  // Cannot delete/update due to FK constraint
  if (error.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).json({
      success: false,
      message: "Record is being used and cannot be modified"
    });
  }

  // Column cannot be null
  if (error.code === "ER_BAD_NULL_ERROR") {
    return res.status(400).json({
      success: false,
      message: "A required field is missing"
    });
  }

  // Unknown column
  if (error.code === "ER_BAD_FIELD_ERROR") {
    return res.status(500).json({
      success: false,
      message: "Database column mismatch"
    });
  }

  // Table does not exist
  if (error.code === "ER_NO_SUCH_TABLE") {
    return res.status(500).json({
      success: false,
      message: "Database table not found"
    });
  }

  /* =========================
     4️⃣ AUTH / SECURITY
     ========================= */
  if (error.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access"
    });
  }

  if (error.status === 403) {
    return res.status(403).json({
      success: false,
      message: "Forbidden"
    });
  }

  /* =========================
     5️⃣ CUSTOM APP ERRORS
     ========================= */
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      message: error.message
    });
  }

  /* =========================
     6️⃣ FALLBACK (SAFE DEFAULT)
     ========================= */
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.stack : undefined
  });
};

module.exports = errorHandler;
