const profilesService = require('./profiles-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getProfile(request, response, next) {
  try {
    const { userId: targetUserId } = request.params;
    const { user } = request;

    const result = await profilesService.getProfile(targetUserId, user?.userId);

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
  getProfile,
};
