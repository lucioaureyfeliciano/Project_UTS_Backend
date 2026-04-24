const { Users } = require('../../../models');

async function getUsers() {
  return Users.find({}, '-password');
}

async function getUser(userId) {
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
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
