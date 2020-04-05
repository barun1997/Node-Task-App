require("../src/db/mongoose");

const User = require("../src/models/User");

// User.findByIdAndUpdate("5e88d2bfa6f8ea22817666ee", {
//   age: 1,
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age,
  });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5e88d2bfa6f8ea22817666ee", 2)
  .then((response) => console.log(response))
  .catch((e) => console.log(e));
