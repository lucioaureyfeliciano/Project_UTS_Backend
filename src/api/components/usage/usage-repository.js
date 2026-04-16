const { ApiUsage } = require('../../../models');

async function getUsageLogs({ page = 1, limit = 50, method, endpoint } = {}) {
  const filter = {};
  if (method) filter.method = method.toUpperCase();
  if (endpoint) filter.endpoint = { $regex: endpoint, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);
  const total = await ApiUsage.countDocuments(filter);
  const data = await ApiUsage.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    data,
  };
}

async function getUsageSummary() {
  const total = await ApiUsage.countDocuments();

  const byEndpoint = await ApiUsage.aggregate([
    {
      $group: {
        _id: { method: '$method', endpoint: '$endpoint' },
        count: { $sum: 1 },
        avgDuration: { $avg: '$duration' },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  const byStatusCode = await ApiUsage.aggregate([
    {
      $group: {
        _id: '$statusCode',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalRequests: total,
    byEndpoint,
    byStatusCode,
  };
}

async function createLog(data) {
  return ApiUsage.create(data);
}

module.exports = {
  getUsageLogs,
  getUsageSummary,
  createLog,
};
