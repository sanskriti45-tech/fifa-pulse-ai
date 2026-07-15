import { useEffect, useState } from "react";
import { getDashboardData } from "../api";
export default function CrowdAnalytics() {
  const [crowd, setCrowd] = useState(null);

useEffect(() => {
  const fetchData = () => {
    getDashboardData().then((data) => {
      setCrowd(data.stadiums[0].metrics.crowdDensity);
    });
  };

  fetchData();

  const interval = setInterval(fetchData, 4000);

  return () => clearInterval(interval);
}, []);
  return (
    <section className="px-margin-desktop reveal" id="crowd-analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="glass-panel rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display-lg text-display-lg mb-4">
              CROWD
              <br />
              DYNAMICS
            </h3>
            <p className="text-on-surface-variant font-body-lg">
              AI-driven pedestrian flow prediction minimizing bottleneck risk by 42% through
              adaptive gate steering.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
  className="h-full bg-neon-green"
  style={{
    width: `${crowd ? crowd.overallPercent : 0}%`
  }}
></div>
            </div>
            <div className="flex justify-between font-data-label text-sm">
              <span className="opacity-60">
  CROWD DENSITY: {crowd ? `${crowd.overallPercent}%` : "Loading..."}
</span>
              <span className="text-neon-green">
  HOT ZONES: {crowd ? crowd.hotZones : 0}
</span>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-xl overflow-hidden relative min-h-[400px]">
          <img
            alt="Crowd Predictive Flow Heatmap"
            className="w-full h-full object-cover"
            src="/images/crowd.png"
          />
        </div>
      </div>
    </section>
  )
}
