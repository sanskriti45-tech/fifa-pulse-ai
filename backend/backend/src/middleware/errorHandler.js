const logger = require('../utils/logger');
const env = require('../config/env');

class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;

  logger.error(`${req.method} ${req.originalUrl} -> ${statusCode} ${err.message}`, {
    stack: env.isProd ? undefined : err.stack,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(err.details ? { details: err.details } : {}),
      ...(env.isProd ? {} : { stack: err.stack }),
    },
  });
}

module.exports = { errorHandler, ApiError };
