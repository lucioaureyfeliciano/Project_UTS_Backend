const communityService = require('./community.service');

/**
 * GET /api/communities
 * Get all public communities
 */
const getAllCommunities = async (req, res, next) => {
  try {
    const communities = await communityService.getAllCommunities();
    return res.status(200).json({
      success: true,
      message: 'Communities fetched successfully',
      count: communities.length,
      data: communities,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/communities/:id
 * Get a community by ID
 */
const getCommunityById = async (req, res, next) => {
  try {
    const community = await communityService.getCommunityById(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Community fetched successfully',
      data: community,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/communities
 * Create a new community
 * @requires authentication
 */
const createCommunity = async (req, res, next) => {
  try {
    const community = await communityService.createCommunity(
      req.user.id,
      req.body
    );
    return res.status(201).json({
      success: true,
      message: 'Community created successfully',
      data: community,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/communities/:id/join
 * Join a community
 * @requires authentication
 */
const joinCommunity = async (req, res, next) => {
  try {
    const community = await communityService.joinCommunity(
      req.user.id,
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully joined the community',
      data: community,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/communities/:id/leave
 * Leave a community
 * @requires authentication
 */
const leaveCommunity = async (req, res, next) => {
  try {
    const community = await communityService.leaveCommunity(
      req.user.id,
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully left the community',
      data: community,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  joinCommunity,
  leaveCommunity,
};
