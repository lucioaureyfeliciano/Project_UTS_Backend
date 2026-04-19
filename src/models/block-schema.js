const crypto = require('crypto');

module.exports = (db) => {
  const schema = db.Schema({
    blockId: {
      type: String,
      unique: true,
    },
    // user yang melakukan block
    userId: {
      type: String,
      required: true,
    },
    // user yang diblokir
    blockedId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // AUTO GENERATE blk_xxx
  schema.pre('save', function saveBlockId(next) {
    if (!this.blockId) {
      const random = crypto.randomBytes(3).toString('hex');
      this.blockId = `blk_${random}`;
    }
    next();
  });

  schema.set('toJSON', {
    transform(doc, ret) {
      const { _id, __v, ...cleanRet } = ret;
      return cleanRet;
    },
  });
  return db.model('Blocks', schema);
};
