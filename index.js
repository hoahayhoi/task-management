const express = require("express");
require('dotenv').config();
const app = express();
const port = 3000;

const databse = require("./config/database");
databse.connect();


const Task = require("./models/task.model");

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });
  res.json(tasks);
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});