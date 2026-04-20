const tweetsService = require('./tweets-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createTweet(request, response, next) {
  try {
    const { text } = request.body;
    const { user } = request;

    if (!text) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Tweet text is required'
      );
    }

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

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
    const { user } = request;
    const tweetId = request.params.id;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const tweet = await tweetsService.getTweetByTweetId(user.userId, tweetId);

    return response.status(200).json(tweet);
  } catch (error) {
    return next(error);
  }
}

async function deleteTweetByTweetId(request, response, next) {
  try {
    const { user } = request;
    const tweetId = request.params.id;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await tweetsService.deleteTweetByTweetId(
      tweetId,
      user.userId
    );

    if (result.deletedCount === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Tweet not found');
    }

    return response.status(200).json({
      message: 'Tweet deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
}

async function getRecentTweets(request, response, next) {
  try {
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const tweets = await tweetsService.getRecentTweets(
      user.userId //
    );

    return response.status(200).json(tweets);
  } catch (error) {
    return next(error);
  }
}

async function getTweetsByUserId(request, response, next) {
  try {
    const { user } = request;
    const targetUserId = request.params.id;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const tweets = await tweetsService.getTweetsByUserId(
      user.userId,
      targetUserId
    );

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
