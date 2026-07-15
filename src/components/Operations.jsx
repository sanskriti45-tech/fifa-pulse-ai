import { useEffect, useState } from "react";
import { getDashboardData } from "../api";
export default function Operations() {
  const [dashboard, setDashboard] = useState(null);
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
    <section className="px-margin-desktop max-w-container-max mx-auto reveal" id="operations">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden min-h-[600px] relative">
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="glass-panel p-4 rounded-lg">
              <span className="text-data-label font-data-label text-neon-green block">
                STADIUM HUB ALPHA
              </span>
              <span className="text-display-lg font-display-lg text-white">LUSAIL 2.0</span>
            </div>
          </div>
          <img
            alt="Operational Tactical Overview"
            className="w-full h-full object-cover opacity-80"
            src="/images/operations.png"
          />
        </div>
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="glass-panel p-8 rounded-xl flex-1">
            <h3 className="font-headline-md text-headline-md mb-6 border-l-4 border-neon-green pl-4">
              AI CORE METRICS
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="text-data-label font-data-label opacity-60">
                    CONFIDENCE SCORE
                  </span>
                 <p className="text-data-value font-data-value text-neon-green">
  {dashboard ? `${dashboard.aggregate.avgCrowdDensityPercent}%` : "Loading..."}
</p>
                </div>
                <span className="material-symbols-outlined text-neon-green">query_stats</span>
              </div>
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="text-data-label font-data-label opacity-60">
                    DATA LATENCY
                  </span>
                  <p className="text-data-value font-data-value">12.4ms</p>
                </div>
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="text-data-label font-data-label opacity-60">AI INSTANCE</span>
                  <p className="text-data-value font-data-value">G-CORE VII</p>
                </div>
                <span className="material-symbols-outlined">memory</span>
              </div>
              <div className="pt-4">
                <span className="text-data-label font-data-label opacity-60 block mb-2">
                  SYSTEM CONSOLE
                </span>
                <div className="bg-black/40 p-4 font-data-label text-xs text-neon-green/80 overflow-hidden h-32 leading-relaxed">
                  &gt; Syncing node-alpha-22...
                  <br />
                  &gt; Crowd density optimization active...
                  <br />
                  &gt; Threat detection pass complete: 0 found.
                  <br />
                  &gt; Field mode ready for deployment.
                  <br />
                  <span className="terminal-cursor"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-data-label font-data-label opacity-60">NETWORK STATUS</span>
              <p className="font-headline-md text-headline-md text-white">OPTIMAL</p>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-8 bg-neon-green"></div>
              <div className="w-2 h-8 bg-neon-green"></div>
              <div className="w-2 h-8 bg-neon-green"></div>
              <div className="w-2 h-8 bg-neon-green/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
