const { GoogleGenAI } = require('@google/genai');
const env = require('./env');
const logger = require('../utils/logger');

let client = null;

/**
 * Lazily instantiate and return a singleton GoogleGenAI client.
 * Returns null if no API key is configured — callers must handle
 * the fallback (mock/offline) path gracefully.
 */
function getGeminiClient() {
  if (!env.hasGeminiKey) {
    return null;
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    logger.info(`Gemini client initialized (model: ${env.GEMINI_MODEL})`);
  }

  return client;
}

module.exports = { getGeminiClient };
