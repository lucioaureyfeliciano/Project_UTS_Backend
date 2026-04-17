const { Notifications } = require("../../../models");

async function getNotifications(userId, filter) {
  const query = { userId };

  if (filter.type) query.type = filter.type;
  if (filter.status === "unread") query.isRead = false;

  return Notifications.find(query)
    .populate("actorId", "username")
    .sort({ createdAt: -1 });
}

async function createNotification(userId, actorId, type, tweetId) {
  return Notifications.create({ userId, actorId, type, tweetId });
}

async function markAsRead(notifId, userId) {
  return Notifications.findOneAndUpdate(
    { _id: notifId, userId },
    { isRead: true },
    { new: true },
  );
}

async function deleteNotification(notifId, userId) {
  return Notifications.findOneAndDelete({ _id: notifId, userId });
}

async function countUnreadNotifications(userId) {
  return Notifications.countDocuments({
    userId,
    isRead: false,
  });
}

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  countUnreadNotifications,
};
