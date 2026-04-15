const { Tweets } = require('../../../models');

async function createTweet(userId, username, text) {
  return Tweets.create({
    userId,
    username,
    text,
  });
}

module.exports = {
  createTweet,
};
