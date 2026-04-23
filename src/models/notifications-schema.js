const crypto = require('crypto');

module.exports = (db) => {
  const schema = db.Schema({
    notifId: {
      type: String,
      unique: true,
    },

    userId: {
      type: String,
      required: true,
    },

    actorId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'repost', 'message'],
      required: true,
    },

    tweetId: {
      type: String,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // AUTO GENERATE notifId
  schema.pre('save', function (next) {
    if (!this.notifId) {
      const random = crypto.randomBytes(3).toString('hex');
      this.notifId = `notif_${random}`;
    }
    next();
  });

  schema.set('toJSON', {
    transform(doc, ret) {
      const { _id, __v, ...cleanRet } = ret;
      return cleanRet;
    },
  });

  return db.model('Notifications', schema);
};
