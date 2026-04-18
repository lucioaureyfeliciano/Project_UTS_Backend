const bookmarksService = require('./bookmarks-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

function handleForbiddenOrNotFound(result, next) {
  if (result === 'forbidden') {
    return next(
      errorResponder(
        errorTypes.FORBIDDEN,
        'Anda tidak memiliki akses ke bookmark ini'
      )
    );
  }
  return null;
}

// POST /users/:id/bookmarks
async function addBookmark(request, response, next) {
  try {
    const { tweetId } = request.body;

    if (!tweetId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Tweet ID is required');
    }

    const result = await bookmarksService.addBookmark(
      request.params.id,
      tweetId,
      request.user.userId
    );

    if (handleForbiddenOrNotFound(result, next)) return null;

    // Cek apakah sudah di-bookmark
    if (result === 'already_bookmarked') {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Tweet already bookmarked'
      );
    }

    if (!result) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to add bookmark'
      );
    }

    return response
      .status(201)
      .json({ message: 'Bookmark added successfully', result });
  } catch (error) {
    return next(error);
  }
}

// GET /api/users/:id/bookmarks/check/:tweet_id
async function checkBookmark(request, response, next) {
  try {
    const result = await bookmarksService.checkBookmark(
      request.params.id,
      request.params.tweet_id,
      request.user.userId
    );

    if (handleForbiddenOrNotFound(result, next)) return null;
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// GET /users/:id/bookmarks
async function getBookmarks(request, response, next) {
  try {
    const result = await bookmarksService.getBookmarks(
      request.params.id,
      request.user.userId
    );

    if (handleForbiddenOrNotFound(result, next)) return null;
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// DELETE /users/:id/bookmarks/:tweet_id
async function removeBookmark(request, response, next) {
  try {
    const result = await bookmarksService.removeBookmark(
      request.params.id,
      request.params.tweet_id,
      request.user.userId
    );

    if (handleForbiddenOrNotFound(result, next)) return null;

    if (result === 'not_found') {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Bookmark not found'
      );
    }

    return response
      .status(200)
      .json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    return next(error);
  }
}

// DELETE /users/:id/bookmarks
async function clearBookmarks(request, response, next) {
  try {
    const result = await bookmarksService.clearBookmarks(
      request.params.id,
      request.user.userId
    );

    if (handleForbiddenOrNotFound(result, next)) return null;

    return response.status(200).json({ message: 'All bookmarks cleared' });
  } catch (error) {
    return next(error);
  }
}

// GET /api/users/:id/bookmarks/count
async function countBookmarks(request, response, next) {
  try {
    const result = await bookmarksService.countBookmarks(
      request.params.id,
      request.user.userId
    );

    if (handleForbiddenOrNotFound(result, next)) return null;
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addBookmark,
  checkBookmark,
  getBookmarks,
  removeBookmark,
  clearBookmarks,
  countBookmarks,
};
