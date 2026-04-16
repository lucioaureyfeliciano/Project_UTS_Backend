const express = require('express');
const usageController = require('./usage-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/usage', route);

  // Get usage summary (grouped by endpoint)
  route.get('/summary', usageController.getUsageSummary);

  // Get all usage logs
  route.get('/', usageController.getUsageLogs);
};
