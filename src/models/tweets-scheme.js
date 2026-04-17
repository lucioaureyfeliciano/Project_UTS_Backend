const crypto = require('crypto');

module.exports = (db) => {
  const schema = db.Schema({
    tweetId: {
      type: String,
      unique: true,
    },

    userId: {
      type: String,
      required: true,
    },

    username: {
      type: String,
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
  });

  // AUTO GENERATE tweetId
  schema.pre('save', function (next) {
    if (!this.tweetId) {
      const random = crypto.randomBytes(3).toString('hex');
      this.tweetId = `tw_${random}`;
    }
    next();
  });

  schema.set('toJSON', {
    transform(doc, ret) {
      const { _id, __v, tweetId, ...rest } = ret;

      return {
        tweetId,
        ...rest,
      };
    },
  });

  return db.model('Tweets', schema);
};
