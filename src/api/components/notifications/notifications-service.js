const notificationsRepository = require('./notifications-repository');

async function getNotifications(recipientId) {
  return notificationsRepository.getNotifications(recipientId);
}

async function getUnreadCount(recipientId) {
  return notificationsRepository.getUnreadCount(recipientId);
}

async function createNotification(recipientId, senderId, type, message) {
  return notificationsRepository.createNotification(
    recipientId,
    senderId,
    type,
    message
  );
}

async function markAllAsRead(recipientId) {
  return notificationsRepository.markAllAsRead(recipientId);
}

async function deleteNotification(id) {
  return notificationsRepository.deleteNotification(id);
}

module.exports = {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAllAsRead,
  deleteNotification,
};
