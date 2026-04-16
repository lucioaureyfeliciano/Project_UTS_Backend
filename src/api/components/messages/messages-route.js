const express = require('express');
const messagesController = require('./messages-controller');
const { authMiddleware } = require('../../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/messages', route);

  // Kirim DM
  route.post('/', authMiddleware, messagesController.sendMessage);

  // Ambil percakapan dengan user tertentu
  route.get('/:userId', authMiddleware, messagesController.getMessages);

  // (Optional) Inbox
  route.get('/', authMiddleware, messagesController.getInbox);
};
