const trendingRepository = require('./trending-repository');

async function getTrendingHashtags() {
  const tweets = await trendingRepository.getAllTweets();

  const hashtagCount = {};

  tweets.forEach((tweet) => {
    const matches = tweet.text.match(/#[a-zA-Z0-9_]+/g);

    if (matches) {
      const uniqueTags = [...new Set(matches.map((tag) => tag.toLowerCase()))];

      uniqueTags.forEach((tag) => {
        hashtagCount[tag] = (hashtagCount[tag] || 0) + 1;
      });
    }
  });

  const result = Object.keys(hashtagCount).map((tag) => ({
    hashtag: tag,
    count: hashtagCount[tag],
  }));

  result.sort((a, b) => b.count - a.count);

  return result.slice(0, 10);
}

module.exports = {
  getTrendingHashtags,
};
