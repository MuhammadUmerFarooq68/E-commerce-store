const os = require('os');
const RequestLog = require('../models/requestLog');
const { performance } = require('perf_hooks');

async function loggerMiddleware(req, res, next) {
  const startMemoryUsage = process.memoryUsage().heapUsed;

  const startTime = performance.now();
  const userId = req.user ? req.user.id : null;
  const endpoint = req.originalUrl;
  const method = req.method;
  res.on('finish', async () => {
    const endTime = performance.now();
    const endMemoryUsage = process.memoryUsage().heapUsed;
    const memoryUsage = endMemoryUsage - startMemoryUsage;
    try {
      await RequestLog.create({
        userId,
        endpoint,
        method,
        timestamp: new Date(),
        memoryUsage,
        responseCode: res.statusCode,
      });
    } catch (error) {
      console.error('Error logging request:', error);
    }
  });

  next();
}

module.exports = loggerMiddleware;
