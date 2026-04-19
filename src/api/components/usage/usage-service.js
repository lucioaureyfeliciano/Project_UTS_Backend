const usageRepository = require('./usage-repository');

async function getUsageLogs({ page, limit, method, endpoint }) {
  return usageRepository.getUsageLogs({ page, limit, method, endpoint });
}

async function getUsageSummary() {
  return usageRepository.getUsageSummary();
}

module.exports = {
  getUsageLogs,
  getUsageSummary,
};
