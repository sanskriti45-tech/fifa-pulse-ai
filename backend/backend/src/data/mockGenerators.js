const { randInt, randFloat, pick } = require('../utils/random');

const WEATHER_CONDITIONS = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorm', 'Windy'];
const EMERGENCY_TYPES = ['None', 'Medical', 'Crowd Surge Risk', 'Fire Alarm Test', 'Suspicious Package'];
const BROADCAST_STATUS = ['Live', 'Pre-Show', 'Ad Break', 'Delayed', 'Technical Issue'];
const METRO_STATUS = ['Normal', 'Delayed', 'Crowded', 'Suspended'];
const PARKING_STATUS = ['Available', 'Filling Up', 'Nearly Full', 'Full'];

function genCCTV() {
  return {
    camerasOnline: randInt(180, 200),
    camerasTotal: 200,
    incidentsDetected: randInt(0, 3),
    facialMatchAlerts: randInt(0, 1),
    coveragePercent: randFloat(96, 100, 1),
  };
}

function genCrowdDensity() {
  return {
    overallPercent: randFloat(40, 98, 1),
    hotZones: randInt(0, 4),
    flowRatePerMin: randInt(200, 1800),
    bottleneckGates: randInt(0, 3),
  };
}

function genTicketScans() {
  const scanned = randInt(10000, 82000);
  return {
    scannedTotal: scanned,
    scanRatePerMin: randInt(50, 900),
    invalidAttempts: randInt(0, 40),
    duplicateAttempts: randInt(0, 15),
  };
}

function genWeather() {
  return {
    condition: pick(WEATHER_CONDITIONS),
    tempCelsius: randFloat(14, 34, 1),
    windKph: randFloat(2, 45, 1),
    precipitationChance: randInt(0, 90),
    lightningRisk: pick(['Low', 'Low', 'Low', 'Moderate', 'High']),
  };
}

function genParking() {
  return {
    status: pick(PARKING_STATUS),
    occupiedPercent: randFloat(30, 100, 1),
    lotsOpen: randInt(5, 12),
    lotsTotal: 12,
    avgWaitMinutes: randInt(0, 25),
  };
}

function genMetro() {
  return {
    status: pick(METRO_STATUS),
    passengersPerHour: randInt(2000, 20000),
    nextArrivalMinutes: randInt(1, 12),
    lineIssues: randInt(0, 2),
  };
}

function genEmergency() {
  const type = pick(EMERGENCY_TYPES);
  return {
    activeIncidents: type === 'None' ? 0 : randInt(1, 2),
    type,
    medicalCallsLastHour: randInt(0, 12),
    responseTeamsDeployed: randInt(0, 6),
    avgResponseTimeMin: randFloat(2, 9, 1),
  };
}

function genBroadcast() {
  return {
    status: pick(BROADCAST_STATUS),
    viewersMillions: randFloat(5, 120, 1),
    streamHealthPercent: randFloat(90, 100, 1),
    activeCameraFeeds: randInt(20, 40),
    latencyMs: randInt(150, 900),
  };
}

function genVolunteers() {
  const total = randInt(300, 600);
  const deployed = randInt(Math.floor(total * 0.6), total);
  return {
    totalRegistered: total,
    deployed,
    onBreak: randInt(0, 40),
    stationsUncovered: randInt(0, 5),
  };
}

function genIoT() {
  return {
    sensorsOnline: randInt(1400, 1500),
    sensorsTotal: 1500,
    avgLatencyMs: randInt(20, 200),
    anomalyEvents: randInt(0, 5),
    batteryLowCount: randInt(0, 12),
  };
}

/**
 * Builds a full fresh telemetry snapshot for a single stadium.
 */
function generateStadiumSnapshot(stadium) {
  return {
    stadiumId: stadium.id,
    name: stadium.name,
    city: stadium.city,
    country: stadium.country,
    capacity: stadium.capacity,
    match: stadium.match,
    updatedAt: new Date().toISOString(),
    metrics: {
      cctv: genCCTV(),
      crowdDensity: genCrowdDensity(),
      ticketScans: genTicketScans(),
      weather: genWeather(),
      parking: genParking(),
      metro: genMetro(),
      emergency: genEmergency(),
      broadcast: genBroadcast(),
      volunteers: genVolunteers(),
      iot: genIoT(),
    },
  };
}

module.exports = {
  generateStadiumSnapshot,
  WEATHER_CONDITIONS,
  EMERGENCY_TYPES,
  BROADCAST_STATUS,
  METRO_STATUS,
  PARKING_STATUS,
};
