const communityService = require('./community-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getCommunities(request, response, next) {
  try {
    const communities = await communityService.getCommunities();
    return response.status(200).json(communities);
  } catch (error) {
    return next(error);
  }
}

async function getCommunity(request, response, next) {
  try {
    const { id } = request.params;
    const community = await communityService.getCommunity(id);

    if (!community) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Community not found');
    }

    return response.status(200).json(community);
  } catch (error) {
    return next(error);
  }
}

async function getCommunityMembers(request, response, next) {
  try {
    const { id } = request.params;
    const result = await communityService.getCommunityMembers(id);

    if (!result) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Community not found');
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function createCommunity(request, response, next) {
  try {
    const { name, description, isPrivate } = request.body;
    const creatorId = request.body.creatorId;

    if (!name) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Community name is required'
      );
    }

    if (!creatorId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Creator ID is required'
      );
    }

    const community = await communityService.createCommunity(
      name,
      description,
      isPrivate,
      creatorId
    );

    return response.status(201).json(community);
  } catch (error) {
    return next(error);
  }
}

async function joinCommunity(request, response, next) {
  try {
    const { id } = request.params;
    const { userId } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    const community = await communityService.joinCommunity(id, userId);

    if (!community) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Community not found');
    }

    return response
      .status(200)
      .json({ message: 'Successfully joined community', data: community });
  } catch (error) {
    return next(error);
  }
}

async function leaveCommunity(request, response, next) {
  try {
    const { id } = request.params;
    const { userId } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    const community = await communityService.leaveCommunity(id, userId);

    if (!community) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Community not found');
    }

    return response
      .status(200)
      .json({ message: 'Successfully left community', data: community });
  } catch (error) {
    return next(error);
  }
}

async function updateCommunity(request, response, next) {
  try {
    const { id } = request.params;
    const { name, description, banner, isPrivate } = request.body;

    const community = await communityService.updateCommunity(id, {
      name,
      description,
      banner,
      isPrivate,
    });

    if (!community) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Community not found');
    }

    return response.status(200).json(community);
  } catch (error) {
    return next(error);
  }
}

async function deleteCommunity(request, response, next) {
  try {
    const { id } = request.params;
    const deleted = await communityService.deleteCommunity(id);

    if (!deleted) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Community not found');
    }

    return response
      .status(200)
      .json({ message: 'Community deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCommunities,
  getCommunity,
  getCommunityMembers,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
  deleteCommunity,
};
