const crypto = require("crypto");

module.exports = (db) => {
  const schema = db.Schema({
    tweetsId: {
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

  // AUTO GENERATE tweetsId
  schema.pre("save", function (next) {
    if (!this.tweetsId) {
      const random = crypto.randomBytes(3).toString("hex");
      this.tweetsId = `tw_${random}`;
    }
    next();
  });

  schema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });

  return db.model("Tweets", schema);
};
