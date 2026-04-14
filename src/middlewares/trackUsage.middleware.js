const ApiUsage = require('../models/ApiUsage');

const trackUsage = (req, res, next) => {
  const start = Date.now();

  res.on('finish', async () => {
    try {
      await ApiUsage.create({
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        userId: req.user?.id || null,
        ip: req.ip || req.connection?.remoteAddress || '',
        duration: Date.now() - start,
        userAgent: req.headers['user-agent'] || '',
      });
    } catch (err) {

      console.error('[trackUsage] Failed to log usage:', err.message);
    }
  });

  next();
};

module.exports = trackUsage;