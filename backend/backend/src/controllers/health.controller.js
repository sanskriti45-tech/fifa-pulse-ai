const env = require('../config/env');
const stateService = require('../services/state.service');

function getHealth(req, res) {
  res.json({
    success: true,
    status: 'ok',
    service: 'fifa-worldcup-ops-backend',
    environment: env.NODE_ENV,
    uptimeSeconds: Math.round(process.uptime()),
    simulation: {
      ticks: stateService.getTickCount(),
      stadiumsTracked: stateService.getAllStadiumSnapshots().length,
    },
    geminiConfigured: env.hasGeminiKey,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { getHealth };
