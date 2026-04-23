const followsService = require('./follows-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function followUser(request, response, next) {
  try {
    const { userId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await followsService.followUser(userId, user.userId);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    if (result.error === 'CONFLICT') {
      throw errorResponder(errorTypes.EMAIL_ALREADY_TAKEN, result.message);
    }

    if (result.error === 'VALIDATION') {
      throw errorResponder(errorTypes.VALIDATION_ERROR, result.message);
    }

    if (result.error === 'FORBIDDEN') {
      throw errorResponder(errorTypes.FORBIDDEN, result.message);
    }

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function unfollowUser(request, response, next) {
  try {
    const { userId } = request.params;
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await followsService.unfollowUser(userId, user.userId);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getFollowers(request, response, next) {
  try {
    const { userId } = request.params;

    const result = await followsService.getFollowers(userId);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
};
