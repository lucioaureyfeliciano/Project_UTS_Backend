const { Messages } = require('../../../models');

async function createMessage(senderId, receiverId, text) {
  return Messages.create({
    senderId,
    receiverId,
    text,
  });
}

async function getMessages(userA, userB) {
  return Messages.find({
    $or: [
      { senderId: userA, receiverId: userB },
      { senderId: userB, receiverId: userA },
    ],
  }).sort({ createdAt: 1 }); // urut dari lama ke baru
}

async function markAsRead(currentUserId, otherUserId) {
  const result = await Messages.updateMany(
    {
      senderId: otherUserId,
      receiverId: currentUserId,
      isRead: false,
    },
    {
      $set: { isRead: true },
    }
  );

  console.log('RESULT:', result);

  return result;
}

async function getAllUserMessages(userId) {
  return Messages.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).sort({ createdAt: -1 }); // terbaru dulu
}

module.exports = {
  createMessage,
  getMessages,
  markAsRead,
  getAllUserMessages,
};
