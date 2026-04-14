const usageRepository = require('./usage.repository');

const getAllUsage = async ({ page = 1, limit = 50, method, endpoint } = {}) => {
  const filter = {};
  if (method) filter.method = method.toUpperCase();
  if (endpoint) filter.endpoint = { $regex: endpoint, $options: 'i' };

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    usageRepository.findAll({ limit, skip, filter }),
    usageRepository.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUsageSummary = async () => {

  const totalRequests = await usageRepository.countDocuments();

  const byEndpoint = await usageRepository.aggregate([
    {
      $group: {
        _id: { method: '$method', endpoint: '$endpoint' },
        count: { $sum: 1 },
        avgDuration: { $avg: '$duration' },
        errorCount: {
          $sum: { $cond: [{ $gte: ['$statusCode', 400] }, 1, 0] },
        },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  const byStatusCode = await usageRepository.aggregate([
    {
      $group: {
        _id: '$statusCode',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const perDay = await usageRepository.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
        avgDuration: { $avg: '$duration' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalRequests,
    byEndpoint,
    byStatusCode,
    perDay,
  };
};

module.exports = {
  getAllUsage,
  getUsageSummary,
};
