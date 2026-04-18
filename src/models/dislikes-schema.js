module.exports = (db) =>
  db.model(
    'Dislikes',
    db
      .Schema(
        {
          tweetId: {
            type: String,
            required: true,
          },

          userId: {
            type: String,
            required: true,
          },

          dislikedAt: {
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
      .index({ tweetId: 1, userId: 1 }, { unique: true })
  );
