const { Messages } = require('../../../models');

async function createMessage(data) {
  return Messages.create(data);
}

async function getMessages(currentUserId, otherUserId) {
  return Messages.find({
    $or: [
      { senderId: currentUserId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: currentUserId },
    ],
  }).sort({ createdAt: 1 });
}

async function getAllUserMessages(userId) {
  return Messages.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).sort({ createdAt: -1 });
}

async function markAsRead(currentUserId, otherUserId) {
  return Messages.updateMany(
    {
      senderId: otherUserId,
      receiverId: currentUserId,
      isRead: false,
    },
    {
      $set: { isRead: true },
    }
  );
}

async function getMessageByMessageId(messageId) {
  return Messages.findOne({ messageId });
}

async function updateMessage(messageId, data) {
  return Messages.findOneAndUpdate(
    { messageId },
    { $set: data },
    { new: true }
  );
}

async function deleteMessage(messageId) {
  return Messages.findOneAndDelete({ messageId });
}

module.exports = {
  createMessage,
  getMessages,
  getAllUserMessages,
  markAsRead,
  getMessageByMessageId,
  updateMessage,
  deleteMessage,
};
