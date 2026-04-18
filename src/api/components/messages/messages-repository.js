const { Messages } = require('../../../models');

// 📤 CREATE
async function createMessage(data) {
  return Messages.create(data);
}

// 💬 CHAT
async function getMessages(currentUserId, otherUserId) {
  return Messages.find({
    $or: [
      { senderId: currentUserId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: currentUserId },
    ],
  }).sort({ createdAt: 1 });
}

// 📥 INBOX BASE DATA
async function getAllUserMessages(userId) {
  return Messages.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).sort({ createdAt: -1 });
}

// 👁️ MARK AS READ
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

// 🔍 GET BY messageId
async function getMessageByMessageId(messageId) {
  return Messages.findOne({ messageId });
}

// ✏️ UPDATE
async function updateMessage(messageId, data) {
  return Messages.findOneAndUpdate(
    { messageId },
    { $set: data },
    { new: true }
  );
}

// 🗑️ DELETE
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
