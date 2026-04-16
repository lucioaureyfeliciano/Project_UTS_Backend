const { ApiUsage } = require('../../models');

function trackUsage(request, response, next) {
  const start = Date.now();

  response.on('finish', async () => {
    try {
      await ApiUsage.create({
        method: request.method,
        endpoint: request.originalUrl,
        statusCode: response.statusCode,
        userId: request.user ? request.user._id : null,
        ip: request.ip || '',
        duration: Date.now() - start,
        userAgent: request.headers['user-agent'] || '',
      });
    } catch (err) {
      // Jangan sampai error tracking mematikan server
      console.error('[trackUsage] Failed to log:', err.message);
    }
  });

  next();
}

module.exports = trackUsage;
