module.exports = (db) =>
  db.model(
    'Users',
    db.Schema(
      {
        userId: {
          type: String,
          required: true,
          unique: true,
        },
        email: String,
        password: String,
        username: String,
      },
      {
        toJSON: {
          transform(doc, ret) {
            const { _id, __v, ...cleanRet } = ret;
            return cleanRet;
          },
        },
      }
    )
  );
