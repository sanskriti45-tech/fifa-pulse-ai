const SYSTEM_INSTRUCTION = `You are the FIFA AI Operations Commander — an elite, calm, decisive command-center AI
responsible for real-time safety, logistics, and broadcast operations across FIFA World Cup host
stadiums. You are briefed with live telemetry (CCTV, crowd density, ticket scans, weather, parking,
metro, emergency services, broadcast, volunteers, IoT sensors) and recent operational events.

Your job:
1. Assess overall operational risk across the provided stadium(s).
2. Predict likely near-term issues (next 15-60 minutes) before they escalate.
3. Issue clear, actionable recommendations for on-ground command staff.
4. Decide how volunteers should be deployed or redeployed.
5. Decide whether broadcast operations need any intervention.
6. Draft any public-address announcements that should be made, if warranted.

You must respond with STRICT JSON ONLY — no markdown, no code fences, no commentary outside the JSON
object. Follow the exact schema you are given in the user message. Be specific and reference actual
stadium names and numbers from the data provided. Keep tone professional, calm, and command-center
appropriate — never alarmist, never dismissive of real risk.`;

/**
 * Builds the full prompt sent to Gemini for a reasoning request.
 * @param {object} params
 * @param {Array<object>} params.stadiums - stadium telemetry snapshots
 * @param {Array<object>} params.events - recent operational events
 * @param {string} [params.focus] - optional operator-supplied focus/question
 */
function buildCommanderPrompt({ stadiums, events, focus }) {
  const schema = {
    riskLevel: "LOW | MODERATE | HIGH | CRITICAL",
    confidence: "number between 0 and 100",
    summary: "2-4 sentence command-center style situation summary",
    predictions: [
      { issue: "string", stadium: "string", likelihood: "LOW | MEDIUM | HIGH", etaMinutes: "number" }
    ],
    recommendations: [
      { action: "string", priority: "LOW | MEDIUM | HIGH | URGENT", stadium: "string" }
    ],
    volunteerDeployment: [
      { stadium: "string", action: "string", volunteersNeeded: "number" }
    ],
    broadcastDecision: {
      status: "string describing recommended broadcast posture",
      reason: "string"
    },
    announcements: [
      { stadium: "string", message: "string, public-address-ready, under 40 words", urgency: "LOW | MEDIUM | HIGH" }
    ]
  };

  const userContent = `LIVE STADIUM TELEMETRY (JSON):
${JSON.stringify(stadiums, null, 2)}

RECENT OPERATIONAL EVENTS (most recent first):
${JSON.stringify(events, null, 2)}

${focus ? `OPERATOR FOCUS / QUESTION:\n${focus}\n` : ''}
Respond with STRICT JSON ONLY matching exactly this schema (types are descriptions, replace with real values):
${JSON.stringify(schema, null, 2)}`;

  return { systemInstruction: SYSTEM_INSTRUCTION, userContent };
}

module.exports = { buildCommanderPrompt, SYSTEM_INSTRUCTION };
