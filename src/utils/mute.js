const { Mutes } = require('../models');

async function isMuted(currentUser, targetUser) {
  const muted = await Mutes.exists({
    userId: currentUser,
    mutedId: targetUser,
  });

  return !!muted;
}

module.exports = {
  isMuted,
};
