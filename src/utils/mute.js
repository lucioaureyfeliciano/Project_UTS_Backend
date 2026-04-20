const { Mutes } = require('../models');

async function isMuted(currentUser, targetUser) {
  const muted = await Mutes.exists({
    userId: currentUser,
    mutedUserId: targetUser,
  });

  return !!muted;
}

module.exports = {
  isMuted,
};
