const trendingRepository = require('./trending-repository');

async function getTrendingHashtags() {
  const tweets = await trendingRepository.getAllTweets();

  const hashtagCount = {};

  tweets.forEach((tweet) => {
    const matches = tweet.text.match(/#[a-zA-Z0-9_]+/g);

    if (matches) {
      // 🔥 hindari duplikat dalam 1 tweet
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

  // urutkan dari terbesar
  result.sort((a, b) => b.count - a.count);

  // ambil top 10
  return result.slice(0, 10);
}

module.exports = {
  getTrendingHashtags,
};
