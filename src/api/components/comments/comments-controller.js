const commentsService = require('./comments-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getComments(request, response, next) {
  try {
    const comments = await commentsService.getCommentsByPost(request.params.id);
    return response.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
}

async function createComment(request, response, next) {
  try {
    const { user_id: userId, content } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }
    if (!content) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Content is required');
    }

    const comment = await commentsService.createComment(
      request.params.id,
      userId,
      content
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

async function updateComment(request, response, next) {
  try {
    const { content } = request.body;

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

    const success = await commentsService.updateComment(
      request.params.id,
      content
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update comment'
      );
    }

    return response
      .status(200)
      .json({ message: 'Comment updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteComment(request, response, next) {
  try {
    const comment = await commentsService.getComment(request.params.id);
    if (!comment) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Comment not found'
      );
    }

    const success = await commentsService.deleteComment(request.params.id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete comment'
      );
    }

    return response
      .status(200)
      .json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
