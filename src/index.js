const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Tasks = require("./models/tasks");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) => {
  const tasks = new Tasks(req.body);
  tasks
    .save()
    .then(() => {
      res.status(201).send(tasks);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
