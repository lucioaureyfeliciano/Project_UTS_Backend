const crypto = require('crypto');

module.exports = (db) => {
  const schema = db.Schema({
    muteId: {
      type: String,
      unique: true,
    },
    // user yang melakukan mute
    userId: {
      type: String,
      required: true,
    },
    // user yang dimute
    mutedId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // AUTO GENERATE mut_xxx
  schema.pre('save', function saveMuteId(next) {
    if (!this.muteId) {
      const random = crypto.randomBytes(3).toString('hex');
      this.muteId = `mut_${random}`;
    }
    next();
  });

  schema.set('toJSON', {
    transform(doc, ret) {
      const { _id, __v, ...cleanRet } = ret;
      return cleanRet;
    },
  });
  return db.model('Mutes', schema);
};
