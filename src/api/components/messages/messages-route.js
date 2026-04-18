const express = require('express');
const messagesController = require('./messages-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/messages', route);

  // 📥 inbox
  route.get('/inbox', authMiddleware, messagesController.getInbox);

  // 💬 chat dengan user
  route.get('/chat/:userId', authMiddleware, messagesController.getMessages);

  // 📤 kirim
  route.post('/', authMiddleware, messagesController.sendMessage);

  // ✏️ edit message
  route.put('/:messageId', authMiddleware, messagesController.updateMessage);

  // 🗑️ delete message
  route.delete('/:messageId', authMiddleware, messagesController.deleteMessage);
};
