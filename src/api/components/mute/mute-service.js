const muteRepository = require('./mute-repository');

async function addMute(userId, mutedId) {
  return muteRepository.addMute(userId, mutedId);
}

async function removeMute(userId, mutedId) {
  return muteRepository.removeMute(userId, mutedId);
}

async function getMuteListByUserId(userId) {
  return muteRepository.getMuteListByUserId(userId);
}

async function isMuted(userId, mutedId) {
  return muteRepository.isMuted(userId, mutedId);
}

async function countMutedUsersByUserId(userId) {
  return muteRepository.countMutedUsersByUserId(userId);
}

module.exports = {
  addMute,
  removeMute,
  getMuteListByUserId,
  isMuted,
  countMutedUsersByUserId,
};
