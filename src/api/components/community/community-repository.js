const { Community } = require('../../../models');

async function getCommunity() {
  return Community.find({ isPrivate: false }).sort({ createdAt: -1 });
}

async function getCommunity(id) {
  return Community.findById(id);
}

async function getCommunityByName(name) {
  return Community.findOne({ name });
}

async function getCommunityMembers(id) {
  return Community.findById(id).select('name members');
}

async function createCommunity(name, description, isPrivate, creatorId) {
  return Community.create({
    name,
    description: description || '',
    isPrivate: isPrivate || false,
    creator: creatorId,
    members: [creatorId],
    moderators: [creatorId],
  });
}

async function addMember(id, userId) {
  return Community.findByIdAndUpdate(
    id,
    { $addToSet: { members: userId } },
    { new: true }
  );
}

async function removeMember(id, userId) {
  return Community.findByIdAndUpdate(
    id,
    { $pull: { members: userId, moderators: userId } },
    { new: true }
  );
}

async function updateCommunity(id, fields) {
  // Remove undefined fields
  const update = {};
  if (fields.name !== undefined) update.name = fields.name;
  if (fields.description !== undefined) update.description = fields.description;
  if (fields.banner !== undefined) update.banner = fields.banner;
  if (fields.isPrivate !== undefined) update.isPrivate = fields.isPrivate;

  return Community.findByIdAndUpdate(id, { $set: update }, { new: true });
}

async function deleteCommunity(id) {
  return Community.findByIdAndDelete(id);
}

module.exports = {
  getCommunity,
  getCommunity,
  getCommunityByName,
  getCommunityMembers,
  createCommunity,
  addMember,
  removeMember,
  updateCommunity,
  deleteCommunity,
};
