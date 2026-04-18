const muteService = require('./mute-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function addMute(request, response, next) {
  try {
    const { userId } = request.user;
    const { userId: mutedId } = request.params;

    if (userId === mutedId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'You cannot mute yourself'
      );
    }

    const mute = await muteService.addMute(userId, mutedId);

    if (!mute) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to mute user'
      );
    }

    return response.status(201).json({
      message: 'User muted successfully',
      muteId: mute.muteId,
    });
  } catch (error) {
    return next(error);
  }
}

async function removeMute(request, response, next) {
  try {
    const { userId } = request.user;
    const { userId: mutedId } = request.params;

    const success = await muteService.removeMute(userId, mutedId);

    if (!success || success.deletedCount === 0) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to unmute user or user was not muted'
      );
    }

    return response.status(200).json({ message: 'User unmuted successfully' });
  } catch (error) {
    return next(error);
  }
}

async function getMuteListByUserId(request, response, next) {
  try {
    const { userId } = request.user;
    const mutes = await muteService.getMuteListByUserId(userId);

    return response.status(200).json(mutes);
  } catch (error) {
    return next(error);
  }
}

async function isMuted(request, response, next) {
  try {
    const { userId } = request.user;
    const { userId: mutedId } = request.params;

    const mute = await muteService.isMuted(userId, mutedId);

    return response.status(200).json({
      isMuted: !!mute,
    });
  } catch (error) {
    return next(error);
  }
}

async function countMutedUsersByUserId(request, response, next) {
  try {
    const { userId } = request.user;
    const count = await muteService.countMutedUsersByUserId(userId);

    return response.status(200).json({
      total_muted: count,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addMute,
  removeMute,
  getMuteListByUserId,
  isMuted,
  countMutedUsersByUserId,
};
