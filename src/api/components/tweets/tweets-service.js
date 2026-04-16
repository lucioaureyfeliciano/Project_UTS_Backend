const tweetsRepository = require('./tweets-repository');

async function createTweet(userId, username, text) {
  return tweetsRepository.createTweet(userId, username, text);
}

module.exports = {
  createTweet,
};
