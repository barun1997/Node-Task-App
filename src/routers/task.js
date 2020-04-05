const express = require("express");
const Tasks = require("../models/tasks");

const router = new express.Router();

router.patch("/tasks/:_id", async (req, res) => {
  const { _id } = req.params;
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const task = await Tasks.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(task);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const task = await Tasks.findByIdAndDelete(_id);

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const task = await Tasks.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/tasks", async (req, res) => {
  const tasks = new Tasks(req.body);
  try {
    tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
