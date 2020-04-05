const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

const User = require("./models/user");
const main = async () => {
  // const task = await Task.findById("5e89ffcf5635912d10a8ad51");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);
  const user = await User.findById("5e8a03601631ec2f10f33d2d");
  await user.populate("tasks").execPopulate();
};

main();
