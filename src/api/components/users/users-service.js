const usersRepository = require('./users-repository');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(userId) {
  return usersRepository.getUser(userId);
}

async function getUserByEmail(email) {
  return usersRepository.getUserByEmail(email);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

async function createUser(email, password, username) {
  return usersRepository.createUser(email, password, username);
}

async function updateUser(userId, email, username) {
  return usersRepository.updateUser(userId, email, username);
}

async function deleteUser(userId) {
  return usersRepository.deleteUser(userId);
}

async function changePassword(userId, newPassword) {
  return usersRepository.changePassword(userId, newPassword);
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
