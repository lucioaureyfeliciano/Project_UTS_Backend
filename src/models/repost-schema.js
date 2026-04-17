module.exports = (db) =>
  db.model(
    'Retweets',
    db.Schema(
      {
        tweetId: {
          type: String,
          required: true,
        },

        userId: {
          type: String,
          unique: true,
          required: true,
        },

        retweetedAt: {
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
  );
