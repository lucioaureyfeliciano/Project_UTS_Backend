const { Notifications } = require('../../../models');

async function getNotifications(recipientId) {
  return Notifications.find({ recipientId }).sort({ createdAt: -1 });
}

async function getUnreadCount(recipientId) {
  return Notifications.countDocuments({ recipientId, isRead: false });
}

async function createNotification(recipientId, senderId, type, message) {
  return Notifications.create({ recipientId, senderId, type, message });
}

async function markAllAsRead(recipientId) {
  return Notifications.updateMany(
    { recipientId, isRead: false },
    { $set: { isRead: true } }
  );
}

async function deleteNotification(id) {
  return Notifications.deleteOne({ _id: id });
}

module.exports = {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAllAsRead,
  deleteNotification,
};
