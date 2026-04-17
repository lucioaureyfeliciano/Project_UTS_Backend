const crypto = require("crypto");
module.exports = (db) => {
  const schema = db.Schema({
    userId: {
      type: String,
      unique: true,
    },
    email: String,
    password: String,
    username: String,
  });

  // AUTO GENERATE usr_xxx
  schema.pre("save", function (next) {
    if (!this.userId) {
      const random = crypto.randomBytes(3).toString("hex");
      this.userId = `usr_${random}`;
    }
    next();
  });

  schema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  });

  return db.model("Users", schema);
};
