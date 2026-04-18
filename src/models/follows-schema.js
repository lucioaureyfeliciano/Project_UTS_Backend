module.exports = (db) =>
  db.model(
    'Follows',
    db.Schema(
      {
        followerId: {
          type: String,
          required: true,
        },

        followingId: {
          type: String,
          required: true,
        },

        followedAt: {
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
