const communityRepository = require('./community.repository');

const getAllCommunities = async () => {

  const communities = await communityRepository.findAll({ isPrivate: false });
  return communities;
};

const getCommunityById = async (id) => {
  const community = await communityRepository.findById(id);
  if (!community) {
    const error = new Error('Community not found');
    error.statusCode = 404;
    throw error;
  }
  return community;
};

const createCommunity = async (userId, body) => {
  const { name, description, isPrivate } = body;

  const existing = await communityRepository.findByName(name);
  if (existing) {
    const error = new Error('Community name is already taken');
    error.statusCode = 409;
    throw error;
  }

  const community = await communityRepository.create({
    name,
    description: description || '',
    isPrivate: isPrivate || false,
    creator: userId,
    members: [userId],
    moderators: [userId],
  });

  return community;
};

const joinCommunity = async (userId, communityId) => {
  const community = await communityRepository.findById(communityId);
  if (!community) {
    const error = new Error('Community not found');
    error.statusCode = 404;
    throw error;
  }

  const isMember = community.members.some(
    (m) => m._id.toString() === userId.toString()
  );
  if (isMember) {
    const error = new Error('You are already a member of this community');
    error.statusCode = 409;
    throw error;
  }

  const updated = await communityRepository.findByIdAndUpdate(communityId, {
    $addToSet: { members: userId },
  });

  return updated;
};

const leaveCommunity = async (userId, communityId) => {
  const community = await communityRepository.findById(communityId);
  if (!community) {
    const error = new Error('Community not found');
    error.statusCode = 404;
    throw error;
  }

  if (community.creator._id.toString() === userId.toString()) {
    const error = new Error(
      'Creator cannot leave the community. Transfer ownership first or delete the community.'
    );
    error.statusCode = 403;
    throw error;
  }

  const isMember = community.members.some(
    (m) => m._id.toString() === userId.toString()
  );
  if (!isMember) {
    const error = new Error('You are not a member of this community');
    error.statusCode = 400;
    throw error;
  }

  const updated = await communityRepository.findByIdAndUpdate(communityId, {
    $pull: { members: userId, moderators: userId },
  });

  return updated;
};

module.exports = {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  joinCommunity,
  leaveCommunity,
};
