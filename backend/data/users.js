const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@test.com",
    password: bcrypt.hashSync("chafo123", 10),
    isAdmin: true,
  },
  {
    name: "Juan Camilo Chafloque",
    email: "chafo@test.com",
    password: bcrypt.hashSync("chafo123", 10),
  },
  {
    name: "John Doe",
    email: "john@test.com",
    password: bcrypt.hashSync("chafo123", 10),
  },
];

module.exports = users;
