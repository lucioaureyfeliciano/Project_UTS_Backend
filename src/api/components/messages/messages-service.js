const messagesRepository = require('./messages-repository');
const usersRepository = require('../users/users-repository');

async function attachUserInfo(message) {
  const sender = await usersRepository.getUserById(message.senderId);
  const receiver = await usersRepository.getUserById(message.receiverId);

  const { senderId, receiverId, ...rest } = message.toObject();

  return {
    messageId: message.messageId,
    sender: {
      userId: sender.userId,
      username: sender.username,
    },
    receiver: {
      userId: receiver.userId,
      username: receiver.username,
    },
    ...rest,
  };
}

async function getOwnedMessage(messageId, userId) {
  const message = await messagesRepository.getMessageByMessageId(messageId);

  if (!message) {
    throw new Error('Message not found');
  }

  if (message.senderId !== userId) {
    throw new Error('Unauthorized');
  }

  return message;
}

async function sendMessage(senderId, receiverId, text) {
  if (senderId === receiverId) {
    throw new Error('Cannot send message to yourself');
  }

  if (!text || text.trim() === '') {
    throw new Error('Text is required');
  }

  const message = await messagesRepository.createMessage({
    senderId,
    receiverId,
    text,
  });

  return attachUserInfo(message);
}

async function getMessages(currentUserId, otherUserId) {
  await messagesRepository.markAsRead(currentUserId, otherUserId);

  const messages = await messagesRepository.getMessages(
    currentUserId,
    otherUserId
  );

  return Promise.all(messages.map(attachUserInfo));
}

async function getInbox(userId) {
  const messages = await messagesRepository.getAllUserMessages(userId);

  const map = {};

  for (const msg of messages) {
    const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;

    if (
      !map[otherUserId] ||
      new Date(msg.createdAt) > new Date(map[otherUserId].lastMessage.createdAt)
    ) {
      const user = await usersRepository.getUserById(otherUserId);

      map[otherUserId] = {
        userId: user.userId,
        username: user.username,
        lastMessage: msg,
        unreadCount: map[otherUserId]?.unreadCount || 0,
      };
    }

    if (msg.receiverId === userId && !msg.isRead) {
      map[otherUserId].unreadCount++;
    }
  }

  return Object.values(map);
}

async function updateMessage(messageId, userId, text) {
  if (!text || text.trim() === '') {
    throw new Error('Text is required');
  }

  await getOwnedMessage(messageId, userId);

  const updated = await messagesRepository.updateMessage(messageId, {
    text,
    edited: true,
  });

  return attachUserInfo(updated);
}

async function deleteMessage(messageId, userId) {
  await getOwnedMessage(messageId, userId);

  return messagesRepository.deleteMessage(messageId);
}

module.exports = {
  sendMessage,
  getMessages,
  getInbox,
  updateMessage,
  deleteMessage,
};
