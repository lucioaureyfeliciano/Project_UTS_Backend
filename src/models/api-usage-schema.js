module.exports = (db) =>
  db.model(
    'ApiUsage',
    db.Schema(
      {
        method: {
          type: String,
          required: true,
          enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
        endpoint: {
          type: String,
          required: true,
        },
        statusCode: {
          type: Number,
        },
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          default: null,
        },
        ip: {
          type: String,
          default: '',
        },
        duration: {
          type: Number,
          default: 0,
        },
        userAgent: {
          type: String,
          default: '',
        },
      },
      { timestamps: true }
    )
  );
