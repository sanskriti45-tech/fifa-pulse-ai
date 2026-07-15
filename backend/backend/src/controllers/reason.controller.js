const stateService = require('../services/state.service');
const { runCommanderReasoning } = require('../services/gemini.service');
const { ApiError } = require('../middleware/errorHandler');

async function postReason(req, res) {
  const { stadiumId, focus } = req.body || {};

  let stadiums = stateService.getAllStadiumSnapshots();

  if (stadiumId) {
    const single = stateService.getStadiumSnapshot(stadiumId);
    if (!single) {
      throw new ApiError(404, `Unknown stadiumId: ${stadiumId}`);
    }
    stadiums = [single];
  }

  const events = stateService.getEvents(30);

  const reasoning = await runCommanderReasoning({ stadiums, events, focus });

  stateService.setLastReasoning(reasoning);

  res.json({
    success: true,
    requestedStadiumId: stadiumId || 'ALL',
    reasoning,
  });
}

module.exports = { postReason };
