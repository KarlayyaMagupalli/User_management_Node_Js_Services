const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./src/utils/logger");
const errorHandler = require("./src/middleware/errorHandler");
const EmployeeRoutes = require("./src/routes/employees.route");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(",")
  : ["http://localhost:4200", "http://localhost:3001", "http://localhost:3000"];

app.use(helmet());
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST", "PUT", "options"] }));
app.use(express.json({ limit: "10Mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`Method:${req.method}, Path:${req.path}, IP:${req.ip}`);
  next();
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Customer CRUD Service is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use("/empdata", EmployeeRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
