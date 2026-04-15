const express = require('express');
const notificationsController = require('./notifications-controller');

const route = express.Router({ mergeParams: true });

module.exports = (app) => {
  app.use('/users/:id/notifications', route);

  // GET    /users/:id/notifications          -> ambil semua notifikasi user
  route.get('/', notificationsController.getNotifications);

  // GET    /users/:id/notifications/unread   -> hitung notifikasi belum dibaca
  route.get('/unread', notificationsController.getUnreadCount);

  // POST   /users/:id/notifications          -> buat notifikasi baru
  route.post('/', notificationsController.createNotification);

  // PUT    /users/:id/notifications/read     -> tandai semua sudah dibaca
  route.put('/read', notificationsController.markAllAsRead);

  // DELETE /users/:id/notifications/:notif_id -> hapus satu notifikasi
  route.delete('/:notif_id', notificationsController.deleteNotification);
};
