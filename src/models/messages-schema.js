module.exports = (db) =>
  db.model(
    'Messages',
    db.Schema({
      senderId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      receiverId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
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
      createdAt: {
        type: Date,
        default: Date.now,
      },
    })
  );
