const messagesRepository = require('./messages-repository');

async function sendMessage(senderId, receiverId, text) {
  // optional: tidak boleh kirim ke diri sendiri
  if (senderId === receiverId) {
    throw new Error('Cannot send message to yourself');
  }

  return messagesRepository.createMessage(senderId, receiverId, text);
}

async function getMessages(currentUserId, otherUserId) {
  // update dulu
  await messagesRepository.markAsRead(currentUserId, otherUserId);

  // baru ambil data
  const messages = await messagesRepository.getMessages(
    currentUserId,
    otherUserId
  );

  return messages;
}

async function getInbox(userId) {
  const messages = await messagesRepository.getAllUserMessages(userId);

  const map = {};

  messages.forEach((msg) => {
    const otherUserId =
      msg.senderId.toString() === userId
        ? msg.receiverId.toString()
        : msg.senderId.toString();

    if (!map[otherUserId]) {
      map[otherUserId] = {
        lastMessage: msg,
        unreadCount: 0,
      };
    }

    // hitung unread
    if (msg.receiverId.toString() === userId && msg.isRead === false) {
      map[otherUserId].unreadCount++;
    }
  });

  return Object.values(map);
}

module.exports = {
  sendMessage,
  getMessages,
  getInbox,
};
