module.exports = (db) =>
  db.model(
    'Tweets',
    db.Schema(
      {
        tweetId: {
          type: String,
          unique: true,
          required: true,
        },

        userId: {
          type: String,
          unique: true,
          required: true,
        },

        text: {
          type: String,
          required: true,
          trim: true,
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
  );
