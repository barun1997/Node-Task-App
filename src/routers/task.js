const express = require("express");
const Tasks = require("../models/tasks");
const auth = require("../middleware/auth");
const router = new express.Router();

router.patch("/tasks/:_id", auth, async (req, res) => {
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
    const task = await Tasks.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  try {
    const task = await Tasks.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Tasks.find({ owner: req.user._id });
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  try {
    const task = await Tasks.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/tasks", auth, async (req, res) => {
  const tasks = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
