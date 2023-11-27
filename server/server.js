require("dotenv").config({ path: "./config.env" });
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require("cors");
const port = process.env.PORT || 5000;
const dbo = require("./db/conn");

const app = express();

app.use(cors());
app.use(express.json());

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Set to false in production
}));

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) {
      console.error("Failed to connect to database:", err);
      return;
    }
    console.log(`Server is running on port: ${port}`);
  });
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
