const { Tweets } = require('../../../models');

async function getAllTweets() {
  return Tweets.find({}, { text: 1 });
}

module.exports = {
  getAllTweets,
};
