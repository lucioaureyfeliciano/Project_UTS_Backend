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

async function getTweetByTweetId(request, response, next) {
  try {
    const tweet = await tweetsService.getTweetByTweetId(request.params.id);
    if (!tweet) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Tweet not found');
    }
    return response.status(200).json(tweet);
  } catch (error) {
    return next(error);
  }
}

async function deleteTweetByTweetId(request, response, next) {
  try {
    const result = await tweetsService.deleteTweetByTweetId(request.params.id);
    if (result.deletedCount === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Tweet not found');
    }
    return response.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

async function getRecentTweets(request, response, next) {
  try {
    const tweets = await tweetsService.getRecentTweets();
    return response.status(200).json(tweets);
  } catch (error) {
    return next(error);
  }
}

async function getTweetsByUserId(request, response, next) {
  try {
    const tweets = await tweetsService.getTweetsByUserId(request.params.id);
    return response.status(200).json(tweets);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTweet,
  getTweetByTweetId,
  deleteTweetByTweetId,
  getRecentTweets,
  getTweetsByUserId,
};
