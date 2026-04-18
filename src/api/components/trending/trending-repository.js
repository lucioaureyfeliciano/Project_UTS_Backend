const { Tweets } = require('../../../models');

// ambil hanya text biar ringan
async function getAllTweets() {
  return Tweets.find({}, { text: 1 });
}

module.exports = {
  getAllTweets,
};
