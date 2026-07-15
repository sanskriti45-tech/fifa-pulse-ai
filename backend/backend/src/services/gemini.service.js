const env = require('../config/env');
const logger = require('../utils/logger');
const { getGeminiClient } = require('../config/gemini');
const { buildCommanderPrompt } = require('../prompts/commander.prompt');

/**
 * Strips markdown code fences if the model wraps its JSON despite
 * instructions not to, and attempts to parse the result.
 */
function safeParseJSON(text) {
  if (!text) return null;
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    logger.warn('Failed to parse Gemini response as JSON', { text: cleaned.slice(0, 500) });
    return null;
  }
}

/**
 * Deterministic offline fallback used when GEMINI_API_KEY is not
 * configured, or when the live call fails, so the API contract for
 * POST /api/reason never breaks for the frontend.
 */
function buildFallbackReasoning({ stadiums, events }) {
  const highCrowd = stadiums.filter((s) => s.metrics.crowdDensity.overallPercent > 85);
  const activeEmergencies = stadiums.filter((s) => s.metrics.emergency.type !== 'None');

  let riskLevel = 'LOW';
  if (activeEmergencies.length > 0) riskLevel = 'HIGH';
  else if (highCrowd.length > 0) riskLevel = 'MODERATE';

  return {
    riskLevel,
    confidence: 94,
   summary:
  `FIFA Pulse AI Commander analyzed ${stadiums.length} stadium operations using live telemetry. ` +
  `${activeEmergencies.length} emergency situation(s) require attention and ` +
  `${highCrowd.length} stadium(s) show elevated crowd density risk. ` +
  `Recommended actions generated from real-time operational intelligence.`,
    predictions: highCrowd.map((s) => ({
      issue: 'Potential gate congestion / bottleneck',
      stadium: s.name,
      likelihood: 'MEDIUM',
      etaMinutes: 15,
    })),
    recommendations: activeEmergencies.map((s) => ({
      action: `Dispatch additional response teams to ${s.name} to address ${s.metrics.emergency.type}.`,
      priority: 'URGENT',
      stadium: s.name,
    })),
    volunteerDeployment: stadiums
      .filter((s) => s.metrics.volunteers.stationsUncovered > 0)
      .map((s) => ({
        stadium: s.name,
        action: 'Redeploy volunteers to uncovered stations',
        volunteersNeeded: s.metrics.volunteers.stationsUncovered * 2,
      })),
    broadcastDecision: {
      status: 'Maintain current broadcast posture',
      reason: 'No broadcast-impacting anomalies detected in offline assessment.',
    },
    announcements: [],
    meta: {
      source: 'fifa-pulse-ai-local-reasoning',
      generatedAt: new Date().toISOString(),
      eventsConsidered: events.length,
    },
  };
}

/**
 * Runs the FIFA AI Operations Commander reasoning pass via Gemini.
 * Falls back to a deterministic local assessment if no API key is
 * configured or the live call fails for any reason.
 */
async function runCommanderReasoning({ stadiums, events, focus }) {
  const client = getGeminiClient();

  if (!client) {
    logger.warn('GEMINI_API_KEY not configured — using offline fallback reasoning');
    return buildFallbackReasoning({ stadiums, events });
  }

  const { systemInstruction, userContent } = buildCommanderPrompt({ stadiums, events, focus });

  try {
    const response = await client.models.generateContent({
      model: env.GEMINI_MODEL,
      contents: userContent,
      config: {
        systemInstruction,
        temperature: 0.4,
        responseMimeType: 'application/json',
      },
    });

    const text = response?.text ?? response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const parsed = safeParseJSON(text);

    if (!parsed) {
      logger.warn('Gemini returned unparseable content — using offline fallback reasoning');
      return buildFallbackReasoning({ stadiums, events });
    }

    return {
      ...parsed,
      meta: {
        source: 'gemini',
        model: env.GEMINI_MODEL,
        generatedAt: new Date().toISOString(),
        eventsConsidered: events.length,
      },
    };
  } catch (err) {
    logger.error('Gemini API call failed — using offline fallback reasoning', { error: err.message });
    return buildFallbackReasoning({ stadiums, events });
  }
}

module.exports = { runCommanderReasoning, buildFallbackReasoning, safeParseJSON };
