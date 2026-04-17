const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
const { passwordMatched } = require('../../../utils/password');

function generateToken(user) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    userId: user.userId,
    username: user.username,
    email: user.email,
    timestamp: Date.now(),
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserByEmail(email);

  const userPass = user ? user.password : '<RANDOM>';

  const loginPassed = await passwordMatched(password, userPass);

  if (user && loginPassed) {
    return {
      userId: user.userId,
      email: user.email,
      token: generateToken(email),
    };
  }

  return null;
}

module.exports = {
  checkLogin,
};
