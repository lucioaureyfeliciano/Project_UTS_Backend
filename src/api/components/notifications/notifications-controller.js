const notificationsService = require("./notifications-service");
const { errorResponder, errorTypes } = require("../../../core/errors");

// GET notifications
async function getNotifications(request, response, next) {
  try {
    const filter = {
      type: request.query.type || null,
      status: request.query.status || null,
    };

    const result = await notificationsService.getNotifications(
      request.params.id,
      request.user.userId,
      filter,
    );

    if (result === "forbidden") {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        "Anda tidak memiliki akses ke notifikasi ini",
      );
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// CREATE notification
async function createNotification(request, response, next) {
  try {
    const { actorId, type, tweetId } = request.body;

    if (!actorId || !type) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        "Field actorId have to be filled and type is required",
      );
    }

    const validTypes = ["like", "follow", "comment", "repost"];

    if (!validTypes.includes(type)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        "Type must be one of: like, follow, comment, repost",
      );
    }

    const result = await notificationsService.createNotification(
      request.params.id,
      actorId,
      type,
      tweetId || null,
    );

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

// MARK AS READ
async function markAsRead(request, response, next) {
  try {
    const result = await notificationsService.markAsRead(
      request.params.id,
      request.params.notif_id,
      request.user.userId,
    );

    if (result === "forbidden") {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        "You do not have access to this notification",
      );
    }

    if (result === null) {
      throw errorResponder(errorTypes.NOT_FOUND, "Notification not found");
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// DELETE
async function deleteNotification(request, response, next) {
  try {
    const result = await notificationsService.deleteNotification(
      request.params.id,
      request.params.notif_id,
      request.user.userId,
    );

    if (result === "forbidden") {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        "You do not have access to this notification",
      );
    }

    if (result === null) {
      throw errorResponder(errorTypes.NOT_FOUND, "Notification not found");
    }

    return response.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
}

// GET unread count
async function getUnreadCount(request, response, next) {
  try {
    const result = await notificationsService.getUnreadCount(
      request.params.id,
      request.user.userId,
    );

    if (result === "forbidden") {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        "You do not have access to this notification",
      );
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
  getUnreadCount,
};
