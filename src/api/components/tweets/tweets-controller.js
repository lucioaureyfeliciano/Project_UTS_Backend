const tweetsService = require('./tweets-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createTweet(request, response, next) {
  try {
    const { text } = request.body;

    // ambil user dari middleware auth
    const { user } = request;

    // Validasi text
    if (!text) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Tweet text is required'
      );
    }

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    // Create tweet via service
    const tweet = await tweetsService.createTweet(
      user.userId,
      user.username,
      text
    );

    return response.status(201).json(tweet);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTweet,
};
