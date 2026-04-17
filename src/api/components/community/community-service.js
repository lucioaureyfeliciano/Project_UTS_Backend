const communityRepository = require('./community-repository');

async function getCommunities() {
  return communityRepository.getCommunities();
}

async function getCommunity(id) {
  return communityRepository.getCommunity(id);
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
  const community = await communityRepository.getCommunity(id);
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
  const community = await communityRepository.getCommunity(id);
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
  getCommunities,
  getCommunity,
  getCommunityMembers,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
  deleteCommunity,
};
