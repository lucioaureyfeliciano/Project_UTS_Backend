const { Users } = require("../../../models");

async function getUsers() {
  return Users.find({});
}

async function getUserById(userId) {
  return Users.findOne({ userId });
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, username) {
  return Users.create({ email, password, username });
}

async function updateUser(id, email, username) {
  return Users.updateOne({ _id: id }, { $set: { email, username } });
}

async function changePassword(id, password) {
  return Users.updateOne({ _id: id }, { $set: { password } });
}

async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
