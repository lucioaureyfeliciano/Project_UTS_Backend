module.exports = (db) =>
  db.model(
    "Bookmarks",
    db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        tweetId: { type: db.Schema.Types.ObjectId, required: true },
      },
      { timestamps: true },
    ),
  );
