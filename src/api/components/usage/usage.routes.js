const express = require('express');
const router = express.Router();
const usageController = require('./usage.controller');
const { authenticate } = require('../../../middlewares/auth.middleware');

router.get('/', authenticate, usageController.getAllUsage);
router.get('/summary', authenticate, usageController.getUsageSummary);

module.exports = router;