const express = require('express');
const messagesController = require('./messages-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/messages', route);

  // Menampilkan inbox (daftar percakapan)
  route.get('/inbox', authMiddleware, messagesController.getInbox);

  // Menampilkan pesan dalam percakapan dengan user tertentu
  route.get('/chat/:userId', authMiddleware, messagesController.getMessages);

  // Mengirim pesan ke user tertentu
  route.post('/', authMiddleware, messagesController.sendMessage);

  // Mengupdate pesan yang sudah terkirim
  route.put('/:messageId', authMiddleware, messagesController.updateMessage);

  // Menghapus pesan yang sudah terkirim
  route.delete('/:messageId', authMiddleware, messagesController.deleteMessage);
};
