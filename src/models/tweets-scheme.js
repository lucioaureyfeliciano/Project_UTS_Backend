module.exports = (db) =>
  db.model(
    'Tweets',
    db.Schema({
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
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
    })
  );
