const stateService = require('../services/state.service');
const { ApiError } = require('../middleware/errorHandler');
const { randInt } = require('../utils/random');

const VALID_SEVERITIES = ['info', 'warning', 'critical'];

function listEvents(req, res) {
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
  res.json({
    success: true,
    count: stateService.getEvents(limit).length,
    events: stateService.getEvents(limit),
  });
}

function createEvent(req, res) {
  const { stadiumId, type, message, severity = 'info' } = req.body || {};

  if (!stadiumId || !type || !message) {
    throw new ApiError(400, 'stadiumId, type, and message are required fields.');
  }

  if (!VALID_SEVERITIES.includes(severity)) {
    throw new ApiError(400, `severity must be one of: ${VALID_SEVERITIES.join(', ')}`);
  }

  const stadium = stateService.getStadiumSnapshot(stadiumId);
  if (!stadium) {
    throw new ApiError(404, `Unknown stadiumId: ${stadiumId}`);
  }

  const event = stateService.addEvent({
    id: `evt-${Date.now()}-${randInt(1000, 9999)}`,
    stadiumId,
    stadiumName: stadium.name,
    timestamp: new Date().toISOString(),
    source: 'manual',
    type,
    severity,
    message,
  });

  res.status(201).json({ success: true, event });
}

module.exports = { listEvents, createEvent };
