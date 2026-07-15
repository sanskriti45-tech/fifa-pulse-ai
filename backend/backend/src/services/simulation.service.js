const env = require('../config/env');
const logger = require('../utils/logger');
const stateService = require('./state.service');
const { drift, randInt, pick } = require('../utils/random');
const {
  WEATHER_CONDITIONS,
  EMERGENCY_TYPES,
  BROADCAST_STATUS,
  METRO_STATUS,
  PARKING_STATUS,
} = require('../data/mockGenerators');

let intervalHandle = null;

/**
 * Produces the next metrics snapshot for a stadium by drifting the
 * previous values, so telemetry evolves smoothly tick over tick
 * instead of teleporting to unrelated random values.
 */
function driftMetrics(prev) {
  const m = prev.metrics;

  const next = {
    cctv: {
      ...m.cctv,
      camerasOnline: Math.round(drift(m.cctv.camerasOnline, { min: 170, max: 200, maxDelta: 2 })),
      incidentsDetected: Math.max(0, Math.round(drift(m.cctv.incidentsDetected, { min: 0, max: 5, maxDelta: 1 }))),
      coveragePercent: drift(m.cctv.coveragePercent, { min: 90, max: 100, maxDelta: 1 }),
    },
    crowdDensity: {
      ...m.crowdDensity,
      overallPercent: drift(m.crowdDensity.overallPercent, { min: 20, max: 100, maxDelta: 4 }),
      hotZones: Math.max(0, Math.round(drift(m.crowdDensity.hotZones, { min: 0, max: 6, maxDelta: 1 }))),
      flowRatePerMin: Math.round(drift(m.crowdDensity.flowRatePerMin, { min: 100, max: 2000, maxDelta: 120 })),
      bottleneckGates: Math.max(0, Math.round(drift(m.crowdDensity.bottleneckGates, { min: 0, max: 5, maxDelta: 1 }))),
    },
    ticketScans: {
      ...m.ticketScans,
      scannedTotal: Math.round(m.ticketScans.scannedTotal + randInt(0, 400)),
      scanRatePerMin: Math.round(drift(m.ticketScans.scanRatePerMin, { min: 0, max: 1000, maxDelta: 80 })),
      invalidAttempts: Math.max(0, m.ticketScans.invalidAttempts + randInt(0, 3)),
      duplicateAttempts: Math.max(0, m.ticketScans.duplicateAttempts + randInt(0, 2)),
    },
    weather: {
      ...m.weather,
      condition: Math.random() < 0.1 ? pick(WEATHER_CONDITIONS) : m.weather.condition,
      tempCelsius: drift(m.weather.tempCelsius, { min: 10, max: 40, maxDelta: 0.6 }),
      windKph: drift(m.weather.windKph, { min: 0, max: 60, maxDelta: 3 }),
      precipitationChance: Math.round(drift(m.weather.precipitationChance, { min: 0, max: 100, maxDelta: 5 })),
    },
    parking: {
      ...m.parking,
      status: Math.random() < 0.15 ? pick(PARKING_STATUS) : m.parking.status,
      occupiedPercent: drift(m.parking.occupiedPercent, { min: 0, max: 100, maxDelta: 4 }),
      avgWaitMinutes: Math.max(0, Math.round(drift(m.parking.avgWaitMinutes, { min: 0, max: 40, maxDelta: 3 }))),
    },
    metro: {
      ...m.metro,
      status: Math.random() < 0.12 ? pick(METRO_STATUS) : m.metro.status,
      passengersPerHour: Math.round(drift(m.metro.passengersPerHour, { min: 500, max: 25000, maxDelta: 1500 })),
      nextArrivalMinutes: randInt(1, 12),
    },
    emergency: {
      ...m.emergency,
      type: Math.random() < 0.07 ? pick(EMERGENCY_TYPES) : m.emergency.type,
      medicalCallsLastHour: Math.max(0, m.emergency.medicalCallsLastHour + (Math.random() < 0.3 ? randInt(0, 2) : 0)),
      responseTeamsDeployed: Math.max(0, Math.round(drift(m.emergency.responseTeamsDeployed, { min: 0, max: 8, maxDelta: 1 }))),
    },
    broadcast: {
      ...m.broadcast,
      status: Math.random() < 0.1 ? pick(BROADCAST_STATUS) : m.broadcast.status,
      viewersMillions: drift(m.broadcast.viewersMillions, { min: 1, max: 150, maxDelta: 5 }),
      streamHealthPercent: drift(m.broadcast.streamHealthPercent, { min: 80, max: 100, maxDelta: 1.5 }),
      latencyMs: Math.round(drift(m.broadcast.latencyMs, { min: 100, max: 1200, maxDelta: 60 })),
    },
    volunteers: {
      ...m.volunteers,
      deployed: Math.max(0, Math.round(drift(m.volunteers.deployed, { min: 0, max: m.volunteers.totalRegistered, maxDelta: 15 }))),
      onBreak: Math.max(0, Math.round(drift(m.volunteers.onBreak, { min: 0, max: 60, maxDelta: 4 }))),
      stationsUncovered: Math.max(0, Math.round(drift(m.volunteers.stationsUncovered, { min: 0, max: 8, maxDelta: 1 }))),
    },
    iot: {
      ...m.iot,
      sensorsOnline: Math.round(drift(m.iot.sensorsOnline, { min: 1300, max: m.iot.sensorsTotal, maxDelta: 15 })),
      avgLatencyMs: Math.round(drift(m.iot.avgLatencyMs, { min: 10, max: 300, maxDelta: 15 })),
      anomalyEvents: Math.max(0, Math.round(drift(m.iot.anomalyEvents, { min: 0, max: 10, maxDelta: 1 }))),
      batteryLowCount: Math.max(0, Math.round(drift(m.iot.batteryLowCount, { min: 0, max: 20, maxDelta: 2 }))),
    },
  };

  return {
    ...prev,
    updatedAt: new Date().toISOString(),
    metrics: next,
  };
}

/**
 * Occasionally emits a synthetic operational event so the event log
 * feels alive (used by GET /api/events consumers / dashboards).
 */
function maybeEmitEvent(snapshot) {
  if (Math.random() > 0.25) return;

  const { metrics } = snapshot;
  const candidates = [];

  if (metrics.crowdDensity.overallPercent > 85) {
    candidates.push({
      type: 'CROWD_DENSITY_HIGH',
      severity: 'warning',
      message: `Crowd density at ${metrics.crowdDensity.overallPercent}% near ${snapshot.name}.`,
    });
  }
  if (metrics.emergency.type !== 'None') {
    candidates.push({
      type: 'EMERGENCY_FLAG',
      severity: 'critical',
      message: `${metrics.emergency.type} reported at ${snapshot.name}.`,
    });
  }
  if (metrics.parking.status === 'Full' || metrics.parking.status === 'Nearly Full') {
    candidates.push({
      type: 'PARKING_CONSTRAINED',
      severity: 'info',
      message: `Parking ${metrics.parking.status.toLowerCase()} at ${snapshot.name}.`,
    });
  }
  if (metrics.metro.status === 'Suspended' || metrics.metro.status === 'Delayed') {
    candidates.push({
      type: 'METRO_DISRUPTION',
      severity: 'warning',
      message: `Metro service ${metrics.metro.status.toLowerCase()} near ${snapshot.name}.`,
    });
  }
  if (metrics.broadcast.status === 'Technical Issue') {
    candidates.push({
      type: 'BROADCAST_ISSUE',
      severity: 'critical',
      message: `Broadcast technical issue affecting feed from ${snapshot.name}.`,
    });
  }
  if (metrics.iot.anomalyEvents > 5) {
    candidates.push({
      type: 'IOT_ANOMALY',
      severity: 'warning',
      message: `${metrics.iot.anomalyEvents} IoT sensor anomalies detected at ${snapshot.name}.`,
    });
  }

  if (candidates.length === 0) return;

  const chosen = candidates[randInt(0, candidates.length - 1)];
  stateService.addEvent({
    id: `evt-${Date.now()}-${randInt(1000, 9999)}`,
    stadiumId: snapshot.stadiumId,
    stadiumName: snapshot.name,
    timestamp: new Date().toISOString(),
    source: 'simulation',
    ...chosen,
  });
}

function tick() {
  const snapshots = stateService.getAllStadiumSnapshots();
  snapshots.forEach((snapshot) => {
    const next = driftMetrics(snapshot);
    stateService.setStadiumSnapshot(snapshot.stadiumId, next);
    maybeEmitEvent(next);
  });
  const count = stateService.incrementTick();
  logger.debug(`Simulation tick #${count} — ${snapshots.length} stadiums updated`);
}

function start() {
  if (intervalHandle) return;
  stateService.init();
  logger.info(`Simulation engine started (interval: ${env.SIM_TICK_INTERVAL_MS}ms)`);
  intervalHandle = setInterval(tick, env.SIM_TICK_INTERVAL_MS);
  if (intervalHandle.unref) intervalHandle.unref();
}

function stop() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    logger.info('Simulation engine stopped');
  }
}

module.exports = { start, stop, tick };
