const express = require('express');
const blockController = require('./block-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  // semua route blocks diprefix /blocks
  app.use('/blocks', route);

  // tambah block baru
  route.post('/:userId', authMiddleware, blockController.addBlock);

  // hapus block
  route.delete('/:userId', authMiddleware, blockController.removeBlock);

  // ambil daftar block yang dibuat oleh user tertentu
  route.get('/', authMiddleware, blockController.getBlockListByUserId);

  // cek apakah masih ada block antara blockerId dan blockedId
  route.get('/status/:userId', authMiddleware, blockController.isBlocked);

  // hitung total user yang diblock oleh user yg sedang login
  route.get(
    '/count/me',
    authMiddleware,
    blockController.countBlockedUsersByUserId
  );
};
