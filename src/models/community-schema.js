module.exports = (db) =>
  db.model(
    'Community',
    db.Schema(
      {
        name: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          minlength: 3,
          maxlength: 50,
        },
        description: {
          type: String,
          default: '',
          maxlength: 300,
        },
        banner: {
          type: String,
          default: '',
        },
        creator: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        members: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
          },
        ],
        moderators: [
          {
            type: db.Schema.Types.ObjectId,
            ref: 'Users',
          },
        ],
        isPrivate: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    )
  );
