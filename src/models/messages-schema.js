const crypto = require('crypto');

module.exports = (db) => {
  const schema = db.Schema({
    messageId: {
      type: String,
      unique: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  schema.pre('save', function (next) {
    if (!this.messageId) {
      const random = crypto.randomBytes(4).toString('hex');
      this.messageId = `msg_${random}`;
    }
    next();
  });

  return db.model('Messages', schema);
};
