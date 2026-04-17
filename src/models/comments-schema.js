const crypto = require('crypto');

module.exports = (db) => {
  const schema = db.Schema({
    commentId: {
      type: String,
      unique: true,
    },

    tweetId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    parentId: {
      type: String,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // AUTO GENERATE commentId
  schema.pre('save', function (next) {
    if (!this.commentId) {
      const random = crypto.randomBytes(3).toString('hex');
      this.commentId = `cmnt_${random}`;
    }
    next();
  });

  schema.set('toJSON', {
    transform(doc, ret) {
      const { _id, __v, password, ...cleanRet } = ret;
      return cleanRet;
    },
  });

  return db.model('Comments', schema);
};
