const stateService = require('../services/state.service');
const { ApiError } = require('../middleware/errorHandler');

function getDashboard(req, res) {
  const { stadiumId } = req.query;

  if (stadiumId) {
    const snapshot = stateService.getStadiumSnapshot(stadiumId);
    if (!snapshot) {
      throw new ApiError(404, `Unknown stadiumId: ${stadiumId}`);
    }
    return res.json({
      success: true,
      stadium: snapshot,
      events: stateService.getEvents(20).filter((e) => e.stadiumId === stadiumId),
      lastReasoning: stateService.getLastReasoning(),
    });
  }

  const stadiums = stateService.getAllStadiumSnapshots();

  const aggregate = {
    stadiumCount: stadiums.length,
    avgCrowdDensityPercent:
      stadiums.length === 0
        ? 0
        : parseFloat(
            (stadiums.reduce((sum, s) => sum + s.metrics.crowdDensity.overallPercent, 0) / stadiums.length).toFixed(1)
          ),
    activeEmergencies: stadiums.filter((s) => s.metrics.emergency.type !== 'None').length,
    totalVolunteersDeployed: stadiums.reduce((sum, s) => sum + s.metrics.volunteers.deployed, 0),
    totalTicketsScanned: stadiums.reduce((sum, s) => sum + s.metrics.ticketScans.scannedTotal, 0),
  };

  res.json({
    success: true,
    generatedAt: new Date().toISOString(),
    tickCount: stateService.getTickCount(),
    aggregate,
    stadiums,
    recentEvents: stateService.getEvents(20),
    lastReasoning: stateService.getLastReasoning(),
  });
}

module.exports = { getDashboard };
