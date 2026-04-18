const dislikesService = require('./dislikes-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function dislikeTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await dislikesService.dislikeTweet(tweetId, user.userId);

    if (result.error) {
      throw errorResponder(errorTypes.CONFLICT, result.message);
    }

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function undislikeTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    const result = await dislikesService.undislikeTweet(tweetId, user.userId);

    if (result.error) {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getUsersWhoDisliked(request, response, next) {
  try {
    const { tweetId } = request.params;

    const result = await dislikesService.getUsersWhoDisliked(tweetId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getDislikedTweetsByUser(request, response, next) {
  try {
    const { userId } = request.params;

    const result = await dislikesService.getDislikedTweetsByUser(userId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  dislikeTweet,
  undislikeTweet,
  getUsersWhoDisliked,
  getDislikedTweetsByUser,
};
