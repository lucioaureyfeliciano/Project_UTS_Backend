const express = require("express");
const bookmarksController = require("./bookmarks-controller");

const route = express.Router({ mergeParams: true });

module.exports = (app) => {
  app.use("/users/:id/bookmarks", route);

  // GET    /users/:id/bookmarks              -> lihat semua bookmark user
  route.get("/", bookmarksController.getBookmarks);

  // POST   /users/:id/bookmarks              -> tambah bookmark
  route.post("/", bookmarksController.addBookmark);

  // DELETE /users/:id/bookmarks              -> hapus semua bookmark user
  route.delete("/", bookmarksController.removeAllBookmarks);

  // DELETE /users/:id/bookmarks/:tweet_id    -> hapus satu bookmark
  route.delete("/:tweet_id", bookmarksController.removeBookmark);
};
