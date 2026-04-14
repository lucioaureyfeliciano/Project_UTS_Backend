const usageService = require('./usage.service');

/**
 * GET /api/usage
 * Get all API usage logs (paginated)
 * Query params: page, limit, method, endpoint
 */
const getAllUsage = async (req, res, next) => {
  try {
    const { page, limit, method, endpoint } = req.query;
    const result = await usageService.getAllUsage({ page, limit, method, endpoint });

    return res.status(200).json({
      success: true,
      message: 'API usage logs fetched successfully',
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/usage/summary
 * Get aggregated summary of API usage
 */
const getUsageSummary = async (req, res, next) => {
  try {
    const summary = await usageService.getUsageSummary();

    return res.status(200).json({
      success: true,
      message: 'Usage summary fetched successfully',
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsage,
  getUsageSummary,
};
