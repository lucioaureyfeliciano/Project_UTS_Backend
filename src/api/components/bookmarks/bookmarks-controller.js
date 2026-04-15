const bookmarksService = require("./bookmarks-service");
const { errorResponder, errorTypes } = require("../../../core/errors");

async function getBookmarks(request, response, next) {
  try {
    const bookmarks = await bookmarksService.getBookmarks(request.params.id);
    return response.status(200).json(bookmarks);
  } catch (error) {
    return next(error);
  }
}

async function addBookmark(request, response, next) {
  try {
    const userId = request.params.id;
    const { tweet_id: tweetId } = request.body;

    if (!tweetId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, "Tweet ID is required");
    }

    // Cek apakah sudah di-bookmark
    if (await bookmarksService.bookmarkExists(userId, tweetId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        "Tweet already bookmarked",
      );
    }

    const bookmark = await bookmarksService.addBookmark(userId, tweetId);
    if (!bookmark) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Failed to add bookmark",
      );
    }

    return response
      .status(201)
      .json({ message: "Bookmark added successfully" });
  } catch (error) {
    return next(error);
  }
}

async function removeBookmark(request, response, next) {
  try {
    const { id: userId, tweet_id: tweetId } = request.params;

    if (!(await bookmarksService.bookmarkExists(userId, tweetId))) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        "Bookmark not found",
      );
    }

    await bookmarksService.removeBookmark(userId, tweetId);
    return response
      .status(200)
      .json({ message: "Bookmark removed successfully" });
  } catch (error) {
    return next(error);
  }
}

async function removeAllBookmarks(request, response, next) {
  try {
    await bookmarksService.removeAllBookmarks(request.params.id);
    return response.status(200).json({ message: "All bookmarks cleared" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
  removeAllBookmarks,
};
