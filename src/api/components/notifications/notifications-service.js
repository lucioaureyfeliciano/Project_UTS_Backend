const notificationsRepository = require('./notifications-repository');

async function getNotifications(userId, requesterId, filter) {
  if (userId !== requesterId) return 'forbidden';
  return notificationsRepository.getNotifications(userId, filter);
}

async function createNotification(userId, actorId, type, tweetId) {
  // tidak kirim notif ke diri sendiri
  if (userId.toString() === actorId.toString()) return null;
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
