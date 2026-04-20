const { Blocks } = require('../models');

async function isBlocked(userA, userB) {
  const blocked = await Blocks.exists({
    $or: [
      { userId: userA, blockedId: userB },
      { userId: userB, blockedId: userA },
    ],
  });

  return !!blocked;
}

module.exports = {
  isBlocked,
};
