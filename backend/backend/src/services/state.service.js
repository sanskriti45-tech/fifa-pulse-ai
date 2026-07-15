const { STADIUMS } = require('../data/stadiums');
const { generateStadiumSnapshot } = require('../data/mockGenerators');

const MAX_EVENTS = 200;

const state = {
  stadiums: new Map(),
  events: [],
  lastReasoning: null,
  tickCount: 0,
};

function init() {
  STADIUMS.forEach((stadium) => {
    state.stadiums.set(stadium.id, generateStadiumSnapshot(stadium));
  });
}

function getAllStadiumSnapshots() {
  return Array.from(state.stadiums.values());
}

function getStadiumSnapshot(stadiumId) {
  return state.stadiums.get(stadiumId) || null;
}

function setStadiumSnapshot(stadiumId, snapshot) {
  state.stadiums.set(stadiumId, snapshot);
}

function addEvent(event) {
  state.events.unshift(event);
  if (state.events.length > MAX_EVENTS) {
    state.events.length = MAX_EVENTS;
  }
  return event;
}

function getEvents(limit = 50) {
  return state.events.slice(0, limit);
}

function setLastReasoning(reasoning) {
  state.lastReasoning = reasoning;
}

function getLastReasoning() {
  return state.lastReasoning;
}

function incrementTick() {
  state.tickCount += 1;
  return state.tickCount;
}

function getTickCount() {
  return state.tickCount;
}

module.exports = {
  init,
  getAllStadiumSnapshots,
  getStadiumSnapshot,
  setStadiumSnapshot,
  addEvent,
  getEvents,
  setLastReasoning,
  getLastReasoning,
  incrementTick,
  getTickCount,
};
