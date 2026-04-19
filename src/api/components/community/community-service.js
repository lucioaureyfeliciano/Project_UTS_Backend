const communityRepository = require('./community-repository');

async function getAllCommunity() {
  return communityRepository.getAllCommunity();
}

async function getCommunityById(id) {
  return communityRepository.getCommunityById(id);
}

async function getCommunityMembers(id) {
  return communityRepository.getCommunityMembers(id);
}

async function createCommunity(name, description, isPrivate, creatorId) {
  // Check if community name already exists
  const existing = await communityRepository.getCommunityByName(name);
  if (existing) {
    return null;
  }

  return communityRepository.createCommunity(
    name,
    description,
    isPrivate,
    creatorId
  );
}

async function joinCommunity(id, userId) {
  const community = await communityRepository.getCommunityById(id);
  if (!community) {
    return null;
  }

  // Already a member
  const isMember = community.members.some(
    (m) => m.toString() === userId.toString()
  );
  if (isMember) {
    return community;
  }

  return communityRepository.addMember(id, userId);
}

async function leaveCommunity(id, userId) {
  const community = await communityRepository.getCommunityById(id);
  if (!community) {
    return null;
  }

  return communityRepository.removeMember(id, userId);
}

async function updateCommunity(id, fields) {
  return communityRepository.updateCommunity(id, fields);
}

async function deleteCommunity(id) {
  return communityRepository.deleteCommunity(id);
}

module.exports = {
  getAllCommunity,
  getCommunityById,
  getCommunityMembers,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
  deleteCommunity,
};
