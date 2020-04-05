require("../src/db/mongoose");

const Tasks = require("../src/models/tasks");

//5e88ccc1931b0d203407208b

// Tasks.deleteOne({ _id: "5e88ccc1931b0d203407208b" })
//   .then((response) => {
//     console.log(response);
//     return Tasks.find({ completed: false });
//   })
//   .then((tasks) => {
//     console.log(tasks);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskandFind = async (id, completed) => {
  const deleteResponse = await Tasks.deleteOne({ _id: id });
  const tasks = await Tasks.find({ completed: completed });
  return tasks;
};

deleteTaskandFind("5e88db2d25681d26d80c4c69", false)
  .then((response) => console.log(response))
  .catch((e) => console.log(e));
