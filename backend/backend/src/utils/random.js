function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function pickWeighted(weightedMap) {
  const entries = Object.entries(weightedMap);
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.random() * total;
  for (const [key, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return key;
  }
  return entries[entries.length - 1][0];
}

/**
 * Nudges a numeric value by a random delta while clamping it within
 * [min, max]. Used to make simulated metrics drift smoothly over time
 * instead of jumping erratically between ticks.
 */
function drift(current, { min, max, maxDelta = 3 }) {
  const delta = randFloat(-maxDelta, maxDelta, 1);
  const next = current + delta;
  return Math.min(max, Math.max(min, parseFloat(next.toFixed(1))));
}

module.exports = { randInt, randFloat, pick, pickWeighted, drift };
