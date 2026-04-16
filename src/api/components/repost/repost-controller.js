const retweetsService = require('./repost-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function repostTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    if (!user || !user.id) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await retweetsService.repostTweet(tweetId, user.id);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }
    if (result.error === 'CONFLICT') {
      throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, result.message);
    }

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function unrepostTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    if (!user || !user.id) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await retweetsService.unrepostTweet(tweetId, user.id);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getRepostsOfTweet(request, response, next) {
  try {
    const { tweetId } = request.params;

    const result = await retweetsService.getRepostsOfTweet(tweetId);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  repostTweet,
  unrepostTweet,
  getRepostsOfTweet,
};
