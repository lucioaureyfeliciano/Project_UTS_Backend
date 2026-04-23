const messagesRepository = require('./messages-repository');
const usersRepository = require('../users/users-repository');
const notificationsService = require('../notifications/notifications-service');
const { isMuted } = require('../../../utils/mute');
const { isBlocked } = require('../../../utils/block');

function createUserCache() {
  const cache = {};

  return async function getUser(userId) {
    if (!cache[userId]) {
      cache[userId] = await usersRepository.getUserById(userId);
    }
    return cache[userId];
  };
}

async function attachUserInfo(message, getUser) {
  const sender = await getUser(message.senderId);
  const receiver = await getUser(message.receiverId);

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

  if (await isBlocked(senderId, receiverId)) {
    throw new Error('Cannot send message (user is blocked)');
  }

  const message = await messagesRepository.createMessage({
    senderId,
    receiverId,
    text,
  });

  const isMutedCheck = await isMuted(receiverId, senderId);
  if (!isMutedCheck) {
    await notificationsService.createNotification(
      receiverId,
      senderId,
      'message',
      null
    );
  }

  const getUser = createUserCache();

  return attachUserInfo(message, getUser);
}

async function getMessages(currentUserId, otherUserId) {
  if (await isBlocked(currentUserId, otherUserId)) {
    throw new Error('Cannot access this conversation');
  }

  // tandai sebagai read
  await messagesRepository.markAsRead(currentUserId, otherUserId);

  const messages = await messagesRepository.getMessages(
    currentUserId,
    otherUserId
  );

  const getUser = createUserCache();

  return Promise.all(messages.map((msg) => attachUserInfo(msg, getUser)));
}

async function getInbox(userId) {
  const messages = await messagesRepository.getAllUserMessages(userId);

  const map = {};
  const getUser = createUserCache();

  for (const msg of messages) {
    const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;

    if (await isBlocked(userId, otherUserId)) {
      continue;
    }

    if (
      !map[otherUserId] ||
      new Date(msg.createdAt) > new Date(map[otherUserId].lastMessage.createdAt)
    ) {
      const user = await getUser(otherUserId);

      map[otherUserId] = {
        userId: user.userId,
        username: user.username,
        lastMessage: msg,
        unreadCount: map[otherUserId]?.unreadCount || 0,
      };
    }

    // hitung unread
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

  const getUser = createUserCache();

  return attachUserInfo(updated, getUser);
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
