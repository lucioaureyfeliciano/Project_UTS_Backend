const timelineService = require('./timeline-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getTimeline(request, response, next) {
  try {
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await timelineService.getTimeline(user.userId);

    if (result.error === 'FORBIDDEN') {
      throw errorResponder(errorTypes.FORBIDDEN, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getFollowingTimeline(request, response, next) {
  try {
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await timelineService.getFollowingTimeline(user.userId);

    if (result.error === 'FORBIDDEN') {
      throw errorResponder(errorTypes.FORBIDDEN, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getLikedTimeline(request, response, next) {
  try {
    const { user } = request;

    if (!user || !user.userId) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'User not authenticated');
    }

    const result = await timelineService.getLikedTimeline(user.userId);

    if (result.error === 'NOT_FOUND') {
      throw errorResponder(errorTypes.DATA_NOT_FOUND, result.message);
    }

    if (result.error === 'FORBIDDEN') {
      throw errorResponder(errorTypes.FORBIDDEN, result.message);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTimeline,
  getFollowingTimeline,
  getLikedTimeline,
};
