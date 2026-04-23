const notificationsRepository = require('./notifications-repository');
const { isBlocked } = require('../../../utils/block');
const { isMuted } = require('../../../utils/mute');

async function getNotifications(userId, requesterId, filter) {
  if (userId !== requesterId) return 'forbidden';

  const notifications = await notificationsRepository.getNotifications(
    userId,
    filter
  );

  const filtered = await Promise.all(
    notifications.map(async (notif) => {
      if (String(notif.userId) !== String(userId)) return null;

      const actorId = notif.actorId?._id || notif.actorId;

      if (await isBlocked(userId, actorId)) return null;
      if (await isMuted(userId, actorId)) return null;

      return notif;
    })
  );

  return filtered.filter(Boolean);
}

async function createNotification(userId, actorId, type, tweetId) {
  if (userId === actorId) return null;

  if (await isBlocked(userId, actorId)) {
    return null;
  }

  if (await isMuted(userId, actorId)) {
    throw new Error('Cannot create notification (user is muted)');
  }

  return notificationsRepository.createNotification(
    userId,
    actorId,
    type,
    tweetId
  );
}
async function markAsRead(userId, notifId, requesterId) {
  if (userId !== requesterId) return 'forbidden';
  const result = await notificationsRepository.markAsRead(notifId, userId);
  if (!result) return null;
  return result;
}

async function deleteNotification(userId, notifId, requesterId) {
  if (userId !== requesterId) return 'forbidden';
  const result = await notificationsRepository.deleteNotification(
    notifId,
    userId
  );
  if (!result) return null;
  return true;
}

async function getUnreadCount(userId, requesterId) {
  if (userId !== requesterId) return 'forbidden';

  const count = await notificationsRepository.countUnreadNotifications(userId);

  return { userId, totalUnread: count };
}

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  getUnreadCount,
};
