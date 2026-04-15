const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function login(request, response, next) {
  try {
    // ambil data email dan password dari request body
    const { email, password } = request.body;
    // cek login menggunakan authService
    const loginResult = await authService.checkLogin(email, password);

    if (!loginResult) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}

async function testProtected(request, response, next) {
  try {
    return response.status(200).json({ message: 'OK' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { login, testProtected };
