const trendingService = require('./trending-service');

async function getTrending(request, response, next) {
  try {
    const data = await trendingService.getTrendingHashtags();

    return response.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTrending,
};
