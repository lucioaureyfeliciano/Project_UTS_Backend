const express = require('express');
const muteController = require('./mute-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  // semua route mutes diprefix /mutes
  app.use('/mutes', route);

  // tambah mute baru
  route.post('/:userId', authMiddleware, muteController.addMute);

  // hapus mute
  route.delete('/:userId', authMiddleware, muteController.removeMute);

  // ambil daftar mute yang dibuat oleh user tertentu
  route.get('/', authMiddleware, muteController.getMuteListByUserId);

  // cek apakah masih ada mute antara userId dan blockedId
  route.get('/status/:userId', authMiddleware, muteController.isMuted);

  // hitung total user yang dimute oleh user yg sedang login
  route.get(
    '/count/me',
    authMiddleware,
    muteController.countMutedUsersByUserId
  );
};
