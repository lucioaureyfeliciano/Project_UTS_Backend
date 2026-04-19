const usageService = require('./usage-service');

async function getUsageLogs(request, response, next) {
  try {
    const { page = 1, limit = 50, method, endpoint } = request.query;
    const result = await usageService.getUsageLogs({
      page,
      limit,
      method,
      endpoint,
    });
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getUsageSummary(request, response, next) {
  try {
    const summary = await usageService.getUsageSummary();
    return response.status(200).json(summary);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsageLogs,
  getUsageSummary,
};
