const blockRepository = require('./block-repository');

async function addBlock(userId, blockedId) {
  return blockRepository.addBlock(userId, blockedId);
}

async function removeBlock(userId, blockedId) {
  return blockRepository.removeBlock(userId, blockedId);
}

async function getBlockListByUserId(userId) {
  return blockRepository.getBlockListByUserId(userId);
}

async function isBlocked(userId, blockedId) {
  return blockRepository.isBlocked(userId, blockedId);
}

async function countBlockedUsersByUserId(userId) {
  return blockRepository.countBlockedUsersByUserId(userId);
}

async function cannotInteract(userId, targetUserId) {
  const block1 = await blockRepository.isBlocked(userId, targetUserId);
  const block2 = await blockRepository.isBlocked(targetUserId, userId);

  return !!(block1 || block2);
}

module.exports = {
  addBlock,
  removeBlock,
  getBlockListByUserId,
  isBlocked,
  countBlockedUsersByUserId,
  cannotInteract,
};
