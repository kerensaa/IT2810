const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes/recipes"));
app.use(require("./routes/test"));

// Handle all other routes
app.use((req, res) => {
  res.status(404).send("Not found");
});

// Get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) {
      console.error("Failed to connect to database:", err);
      return;
    }
  });

  console.log(`Server is running on port: ${port}`);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
