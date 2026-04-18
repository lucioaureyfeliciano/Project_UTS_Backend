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

module.exports = {
  addBlock,
  removeBlock,
  getBlockListByUserId,
  isBlocked,
  countBlockedUsersByUserId,
};
