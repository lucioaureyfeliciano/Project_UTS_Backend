const express = require('express');
const notificationsController = require('./notifications-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router({ mergeParams: true });

module.exports = (app) => {
  app.use('/users/:id/notifications', route);

  // GET /users/:id/notifications -> ambil semua notifikasi user
  route.get('/', authMiddleware, notificationsController.getNotifications);

  // GET /users/:id/notifications/unread -> hitung notifikasi belum dibaca
  route.get('/unread', authMiddleware, notificationsController.getUnreadCount);

  // POST /users/:id/notifications -> buat notifikasi baru
  route.post('/', authMiddleware, notificationsController.createNotification);

  // PUT    /users/:id/notifications/read -> tandai semua sudah dibaca
  route.put(
    '/:notif_id/read',
    authMiddleware,
    notificationsController.markAsRead
  );

  // DELETE /users/:id/notifications/:notif_id -> hapus satu notifikasi
  route.delete(
    '/:notif_id',
    authMiddleware,
    notificationsController.deleteNotification
  );
};
