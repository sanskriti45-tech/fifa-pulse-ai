const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const env = require('./config/env');
const logger = require('./utils/logger');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');
const apiRouter = require('./routes');
const simulation = require('./services/simulation.service');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',').map((o) => o.trim()),
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FIFA World Cup Stadium Operations API',
    docs: {
      health: 'GET /api/health',
      dashboard: 'GET /api/dashboard',
      events: 'GET/POST /api/events',
      reason: 'POST /api/reason',
    },
  });
});

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

function start() {
  simulation.start();

  const server = app.listen(env.PORT, () => {
    logger.info(`FIFA Ops backend listening on port ${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`Health check:  http://localhost:${env.PORT}/api/health`);
    logger.info(`Dashboard:     http://localhost:${env.PORT}/api/dashboard`);
  });

  const shutdown = (signal) => {
    logger.warn(`${signal} received — shutting down gracefully`);
    simulation.stop();
    server.close(() => {
      logger.info('Server closed. Bye.');
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 5000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection', { reason: reason?.message || reason });
  });

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
  });

  return server;
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
