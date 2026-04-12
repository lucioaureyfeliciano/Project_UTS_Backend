const usersRepository = require('./users-repository');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, username) {
  return usersRepository.createUser(email, password, username);
}

async function updateUser(id, email, username) {
  return usersRepository.updateUser(id, email, username);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function getUserByEmail(email) {
  return usersRepository.getUserByEmail(email);
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
