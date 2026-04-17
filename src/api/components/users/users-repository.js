const { Users } = require('../../../models');

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

async function getUser(userId) {
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
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
