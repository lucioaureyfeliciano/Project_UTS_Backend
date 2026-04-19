const likesService = require('./likes-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function likeTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await likesService.likeTweet(tweetId, user.userId);

    if (result.error) {
      throw errorResponder(errorTypes.CONFLICT, result.message);
    }

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function unlikeTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    const result = await likesService.unlikeTweet(tweetId, user.userId);

    if (result.error) {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getUsersWhoLiked(request, response, next) {
  try {
    const { tweetId } = request.params;

    const result = await likesService.getUsersWhoLiked(tweetId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getLikedTweetsByUser(request, response, next) {
  try {
    const { userId } = request.params;

    const result = await likesService.getLikedTweetsByUser(userId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  likeTweet,
  unlikeTweet,
  getUsersWhoLiked,
  getLikedTweetsByUser,
};
