const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// const tasks = mongoose.model("Tasks", {
//   description: {
//     type: String,
//     trim: true,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });
