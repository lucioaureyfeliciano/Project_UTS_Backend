const { Users } = require("../../../models");

function generateUserId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'user_';
  for (let i = 0; i < 8; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function getUsers() {
  return Users.find({});
}

<<<<<<< HEAD
async function getUser(userId) {
=======
async function getUserById(userId) {
>>>>>>> 9371e0a61b83857b3c169c3f21eb5a41ff711340
  return Users.findOne({ userId });
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, username) {
  const userId = generateUserId();
  return Users.create({
    userId,
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
  generateUserId,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
