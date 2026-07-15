require('dotenv').config();

function toInt(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: toInt(process.env.PORT, 8080),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.0-flash',

  SIM_TICK_INTERVAL_MS: toInt(process.env.SIM_TICK_INTERVAL_MS, 4000),
  SIM_STADIUM_COUNT: toInt(process.env.SIM_STADIUM_COUNT, 6),
};

env.isProd = env.NODE_ENV === 'production';
env.hasGeminiKey = Boolean(env.GEMINI_API_KEY);

module.exports = env;
