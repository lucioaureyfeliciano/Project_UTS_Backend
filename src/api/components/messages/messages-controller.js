const messagesService = require('./messages-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function sendMessage(request, response, next) {
  try {
    const senderId = request.user.userId;
    const { receiverId, text } = request.body;

    if (!receiverId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Receiver ID is required'
      );
    }

    if (!text) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Message text is required'
      );
    }

    const message = await messagesService.sendMessage(
      senderId,
      receiverId,
      text
    );

    return response.status(201).json(message);
  } catch (error) {
    return next(error);
  }
}

async function getMessages(request, response, next) {
  try {
    const currentUserId = request.user.userId;
    const otherUserId = request.params.userId;

    if (!otherUserId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    const messages = await messagesService.getMessages(
      currentUserId,
      otherUserId
    );

    return response.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
}

async function getInbox(request, response, next) {
  try {
    const { userId } = request.user;

    const inbox = await messagesService.getInbox(userId);

    return response.status(200).json(inbox);
  } catch (error) {
    return next(error);
  }
}

async function updateMessage(request, response, next) {
  try {
    const { userId } = request.user;
    const { messageId } = request.params;
    const { text } = request.body;

    if (!text) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Message text is required'
      );
    }

    const updatedMessage = await messagesService.updateMessage(
      messageId,
      userId,
      text
    );

    return response.status(200).json(updatedMessage);
  } catch (error) {
    return next(error);
  }
}

async function deleteMessage(request, response, next) {
  try {
    const { userId } = request.user;
    const { messageId } = request.params;

    await messagesService.deleteMessage(messageId, userId);

    return response.status(200).json({
      message: 'Message deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  sendMessage,
  getMessages,
  getInbox,
  updateMessage,
  deleteMessage,
};
