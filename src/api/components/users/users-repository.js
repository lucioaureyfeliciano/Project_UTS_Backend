const { Users } = require('../../../models');

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
  return Users.create({
    email,
    password,
    username,
  });
}

async function updateUser(userId, email, username) {
  return Users.updateOne({ userId }, { $set: { email, username } });
}

async function changePassword(userId, password) {
  return Users.updateOne({ userId }, { $set: { password } });
}

async function deleteUser(userId) {
  return Users.deleteOne({ userId });
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
