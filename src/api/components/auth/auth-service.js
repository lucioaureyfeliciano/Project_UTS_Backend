const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
const { passwordMatched } = require('../../../utils/password');

function generateToken(email) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    email,
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
