const commentsService = require('./comments-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function createComment(request, response, next) {
  try {
    const { content, tweetOwnerId } = request.body;
    const userId = request.user.id;

    if (!content) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Field content is required'
      );
    }

    const comment = await commentsService.createComment(
      request.params.id,
      userId,
      content,
      tweetOwnerId
    );

    if (!comment) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create comment'
      );
    }

    return response
      .status(201)
      .json({ message: 'Comment created successfully', comment });
  } catch (error) {
    return next(error);
  }
}

async function getCommentsByTweetId(request, response, next) {
  try {
    const currentUserId = request.user?.id || null;

    const result = await commentsService.getCommentsByTweetId(
      request.params.id,
      currentUserId
    );
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getCommentById(request, response, next) {
  try {
    const comment = await commentsService.getCommentById(request.params.id);
    if (!comment) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Comment not found');
    }
    return response.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
}

async function updateComment(request, response, next) {
  try {
    const { content } = request.body;
    const userId = request.user.id;

    const comment = await commentsService.getComment(request.params.id);
    if (!comment) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Comment not found'
      );
    }

    if (!content) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Content is required');
    }

    const result = await commentsService.updateComment(
      request.params.id,
      userId,
      content
    );

    if (result === null) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update comment'
      );
    }
    if (result === 'forbidden') {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'You are not the owner of this comment'
      );
    }

    return response
      .status(200)
      .json({ message: 'Comment updated successfully', result });
  } catch (error) {
    return next(error);
  }
}

async function deleteComment(request, response, next) {
  try {
    const userId = request.user.id;
    const result = await commentsService.deleteComment(
      request.params.id,
      userId
    );

    if (result === null) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Comment not found'
      );
    }
    if (result === 'forbidden') {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'You are not the owner of this comment'
      );
    }

    return response
      .status(200)
      .json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

async function createReply(request, response, next) {
  try {
    const { content } = request.body;
    const userId = request.user.id;

    if (!content) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Field content wajib diisi'
      );
    }

    const reply = await commentsService.createReply(
      request.params.id,
      userId,
      content
    );

    if (!reply) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Komentar tidak ditemukan');
    }

    return response.status(201).json(reply);
  } catch (error) {
    return next(error);
  }
}

async function getRepliesByCommentId(request, response, next) {
  try {
    const currentUserId = request.user?.id || null;

    const result = await commentsService.getRepliesByCommentId(
      request.params.id,
      currentUserId
    );
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function countCommentsByTweetId(request, response, next) {
  try {
    const result = await commentsService.countCommentsByTweetId(
      request.params.id
    );
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createComment,
  getCommentsByTweetId,
  getCommentById,
  updateComment,
  deleteComment,
  createReply,
  getRepliesByCommentId,
  countCommentsByTweetId,
};
