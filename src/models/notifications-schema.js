module.exports = (db) =>
  db.model(
    'Notifications',
    db.Schema(
      {
        recipientId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        senderId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        type: {
          type: String,
          enum: ['like', 'comment', 'follow', 'repost'],
          required: true,
        },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  );
