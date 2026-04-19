module.exports = (db) =>
  db.model(
    'Bookmarks',
    db
      .Schema(
        {
          userId: {
            type: String,
            ref: 'Users',
            required: true,
          },

          tweetId: {
            type: String,
            ref: 'Tweets',
            required: true,
          },

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
        {
          toJSON: {
            transform(doc, ret) {
              const { _id, __v, ...cleanRet } = ret;
              return cleanRet;
            },
          },
        }
      )
      .index({ userId: 1, tweetId: 1 }, { unique: true })
  );
