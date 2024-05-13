// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize an empty joke database (using an array)
let db = [];

// Middleware to parse request bodies
app.use(bodyParser.json());

// Add a joke to the database
app.post("/", (req, res) => {
  const { joke } = req.body;
  if (joke) {
    db.push(joke);
    res.status(201).json(db);
  } else {
    res.status(400).json({ error: "Invalid joke format" });
  }
});

// Get all jokes from the database
app.get("/", (req, res) => {
  res.json(db);
});

// Update a joke by ID
app.patch("/joke/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { updatedJoke } = req.body;
  if (updatedJoke && db[id]) {
    db[id] = updatedJoke;
    res.json(updatedJoke);
  } else {
    res.status(404).json({ error: "Joke not found" });
  }
});

// Delete a joke by ID
app.delete("/joke/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (db[id]) {
    const deletedJoke = db.splice(id, 1)[0];
    res.json(deletedJoke);
  } else {
    res.status(404).json({ error: "Joke not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
