const ApiUsage = require('../../../models/ApiUsage');

const findAll = ({ limit = 100, skip = 0, filter = {} } = {}) => {
  return ApiUsage.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));
};

const countDocuments = (filter = {}) => {
  return ApiUsage.countDocuments(filter);
};

const aggregate = (pipeline) => {
  return ApiUsage.aggregate(pipeline);
};

const create = (data) => {
  return ApiUsage.create(data);
};

module.exports = {
  findAll,
  countDocuments,
  aggregate,
  create,
};
