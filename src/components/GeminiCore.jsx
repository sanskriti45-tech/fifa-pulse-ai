import { useEffect, useState } from "react";
import { getDashboardData } from "../api";
import axios from "axios";
export default function GeminiCore() {
  const [dashboard, setDashboard] = useState(null);
  const [analysis, setAnalysis] = useState(null);
const [loading, setLoading] = useState(false);

const runAIAnalysis = async () => {
  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:8080/api/reason",
      {
        focus: "Analyze current stadium operations and suggest actions"
      }
    );

    setAnalysis(response.data.reasoning);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {

  const fetchData = () => {
    getDashboardData().then((data) => {
      setDashboard(data);
    });
  };

  fetchData();

  const interval = setInterval(fetchData, 4000);

  return () => clearInterval(interval);
}, []);
  return (
    <section
      className="px-margin-desktop max-w-4xl mx-auto text-center reveal"
      id="gemini-core"
    >
      <div className="mb-16 relative inline-block">
        <div className="absolute inset-0 bg-neon-green/20 blur-3xl rounded-full scale-150"></div>
        <img
          alt="Gemini AI Reasoning Engine"
          className="w-80 h-80 object-contain relative z-10"
          src="/images/gemini.png"
        />
      </div>
      <h2 className="font-display-lg text-display-lg mb-6">GEMINI CORE v7</h2>
     <p className="text-body-lg font-body-lg text-on-surface-variant mb-12">
  Gemini AI is monitoring{" "}
  <span className="text-neon-green font-bold">
    {dashboard ? dashboard.aggregate.stadiumCount : 0} stadiums
  </span>{" "}
  using live crowd, CCTV, IoT, weather and emergency intelligence.
  <br /><br />
  Current system state:{" "}
  <span className="text-neon-green">
    {dashboard ? "ACTIVE REASONING" : "INITIALIZING"}
  </span>
</p>
<button
  onClick={runAIAnalysis}
  className="glass-panel px-8 py-4 rounded-xl text-neon-green font-bold tracking-widest hover:bg-neon-green hover:text-black transition-all"
>
  {loading ? "GEMINI ANALYZING..." : "RUN AI COMMANDER"}
</button>
{analysis && (
  <div className="glass-panel mt-8 p-6 rounded-xl text-left">
    <h3 className="text-neon-green font-bold mb-4">
      AI COMMANDER REPORT
    </h3>

    <p>
      Risk Level:
      <span className="text-red-400 ml-2">
        {analysis.riskLevel}
      </span>
    </p>

    <p className="mt-3">
      Confidence:
      {analysis.confidence}%
    </p>

    <p className="mt-4 text-on-surface-variant">
      {analysis.summary}
    </p>

    {analysis.recommendations?.map((item, index)=>(
      <div key={index} className="mt-3">
        ⚡ {item.action}
      </div>
    ))}
  </div>
)}
      <div className="grid grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-xl">
          <span className="text-display-lg font-display-lg text-neon-green block">
  {dashboard
    ? `${dashboard.stadiums[0].metrics.iot.avgLatencyMs}ms`
    : "--"}
</span>
          <span className="text-data-label font-data-label opacity-60">REASONING SPEED</span>
        </div>
        <div className="glass-panel p-6 rounded-xl">
          <span className="text-display-lg font-display-lg text-neon-green block">
  {dashboard
    ? `${dashboard.stadiums[0].metrics.cctv.coveragePercent}%`
    : "--"}
</span>
          <span className="text-data-label font-data-label opacity-60">UPTIME SLA</span>
        </div>
        <div className="glass-panel p-6 rounded-xl">
          <span className="text-display-lg font-display-lg text-neon-green block">
  {dashboard
    ? dashboard.aggregate.stadiumCount
    : "--"}
</span>
          <span className="text-data-label font-data-label opacity-60">SCALABILITY</span>
        </div>
      </div>
    </section>
  )
}
