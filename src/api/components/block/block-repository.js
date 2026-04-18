const { Blocks } = require('../../../models');

// Block user
async function addBlock(userId, blockedId) {
  return Blocks.findOneAndUpdate(
    { userId, blockedId },
    { userId, blockedId },
    { upsert: true, new: true }
  );
}

async function removeBlock(userId, blockedId) {
  return Blocks.deleteOne({ userId, blockedId });
}

async function getBlockListByUserId(userId) {
  return Blocks.find({ userId });
}

async function isBlocked(userId, blockedId) {
  return Blocks.findOne({ userId, blockedId });
}

async function countBlockedUsersByUserId(userId) {
  return Blocks.countDocuments({ userId });
}

module.exports = {
  addBlock,
  removeBlock,
  getBlockListByUserId,
  isBlocked,
  countBlockedUsersByUserId,
};
