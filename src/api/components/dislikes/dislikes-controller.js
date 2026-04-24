const dislikesService = require('./dislikes-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

function mapErrorType(error) {
  switch (error) {
    case 'NOT_FOUND':
      return errorTypes.DATA_NOT_FOUND;
    case 'CONFLICT':
      return errorTypes.CONFLICT;
    case 'FORBIDDEN':
      return errorTypes.FORBIDDEN;
    default:
      return errorTypes.UNKNOWN_ERROR;
  }
}

async function dislikeTweet(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await dislikesService.dislikeTweet(tweetId, user.userId);

    if (result.error) {
      throw errorResponder(mapErrorType(result.error), result.message);
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

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await dislikesService.undislikeTweet(tweetId, user.userId);

    if (result.error) {
      throw errorResponder(mapErrorType(result.error), result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getUsersWhoDisliked(request, response, next) {
  try {
    const { tweetId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await dislikesService.getUsersWhoDisliked(
      tweetId,
      user.userId
    );

    if (result.error) {
      throw errorResponder(mapErrorType(result.error), result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getDislikedTweetsByUser(request, response, next) {
  try {
    const { userId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    if (user.userId !== userId) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Forbidden');
    }

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
