module.exports = (db) =>
  db.model(
    'Comments',
    db.Schema(
      {
        postId: { type: db.Schema.Types.ObjectId, required: true }, // tweet id
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        content: { type: String, required: true },
      },
      { timestamps: true }
    )
  );
