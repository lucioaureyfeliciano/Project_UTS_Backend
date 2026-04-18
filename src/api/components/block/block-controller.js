const blockService = require('./block-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function addBlock(request, response, next) {
  try {
    const { userId } = request.user;
    const { userId: blockedId } = request.params;

    if (userId === blockedId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'You cannot block yourself'
      );
    }

    const block = await blockService.addBlock(userId, blockedId);

    if (!block) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to block user'
      );
    }

    return response.status(201).json({
      message: 'User blocked successfully',
      blockId: block.blockId,
    });
  } catch (error) {
    return next(error);
  }
}

async function removeBlock(request, response, next) {
  try {
    const { userId } = request.user;
    const { userId: blockedId } = request.params;

    const success = await blockService.removeBlock(userId, blockedId);

    if (!success || success.deletedCount === 0) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to unblock user or user was not blocked'
      );
    }

    return response
      .status(200)
      .json({ message: 'User unblocked successfully' });
  } catch (error) {
    return next(error);
  }
}

async function getBlockListByUserId(request, response, next) {
  try {
    const { userId } = request.user;
    const blocks = await blockService.getBlockListByUserId(userId);

    return response.status(200).json(blocks);
  } catch (error) {
    return next(error);
  }
}

async function isBlocked(request, response, next) {
  try {
    const { userId } = request.user;
    const { userId: blockedId } = request.params;

    const block = await blockService.isBlocked(userId, blockedId);

    return response.status(200).json({
      isBlocked: !!block,
    });
  } catch (error) {
    return next(error);
  }
}

async function countBlockedUsersByUserId(request, response, next) {
  try {
    const { userId } = request.user;
    const count = await blockService.countBlockedUsersByUserId(userId);

    return response.status(200).json({
      total_blocked: count,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addBlock,
  removeBlock,
  getBlockListByUserId,
  isBlocked,
  countBlockedUsersByUserId,
};
