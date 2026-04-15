const notificationsService = require('./notifications-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getNotifications(request, response, next) {
  try {
    const notifications = await notificationsService.getNotifications(
      request.params.id
    );
    return response.status(200).json(notifications);
  } catch (error) {
    return next(error);
  }
}

async function getUnreadCount(request, response, next) {
  try {
    const count = await notificationsService.getUnreadCount(request.params.id);
    return response.status(200).json({ unread_count: count });
  } catch (error) {
    return next(error);
  }
}

async function createNotification(request, response, next) {
  try {
    const recipientId = request.params.id;
    const { sender_id: senderId, type, message } = request.body;

    if (!senderId || !type || !message) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'sender_id, type, and message are required'
      );
    }

    const validTypes = ['like', 'comment', 'follow', 'repost'];
    if (!validTypes.includes(type)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        `Type must be one of: ${validTypes.join(', ')}`
      );
    }

    const notification = await notificationsService.createNotification(
      recipientId,
      senderId,
      type,
      message
    );

    if (!notification) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create notification'
      );
    }

    return response
      .status(201)
      .json({ message: 'Notification created', notification });
  } catch (error) {
    return next(error);
  }
}

async function markAllAsRead(request, response, next) {
  try {
    await notificationsService.markAllAsRead(request.params.id);
    return response
      .status(200)
      .json({ message: 'All notifications marked as read' });
  } catch (error) {
    return next(error);
  }
}

async function deleteNotification(request, response, next) {
  try {
    const success = await notificationsService.deleteNotification(
      request.params.notif_id
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete notification'
      );
    }
    return response.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAllAsRead,
  deleteNotification,
};
