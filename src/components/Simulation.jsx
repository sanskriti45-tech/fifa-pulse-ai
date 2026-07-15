export default function Simulation() {
  return (
    <section className="px-margin-desktop max-w-container-max mx-auto reveal" id="simulation">
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/30">
          <div>
            <span className="text-data-label font-data-label text-neon-green uppercase tracking-widest">
              Digital Twin Simulation
            </span>
            <h2 className="font-headline-md text-headline-md mt-1">AI SCENARIO RUNTIME: V4.2</h2>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <span className="text-data-label font-data-label opacity-40 block">
                RISK INDEX
              </span>
              <span className="text-data-value font-data-value">0.02%</span>
            </div>
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>
        <div className="relative min-h-[500px]">
          <img
            alt="Stadium Digital Twin Simulation"
            className="w-full h-full object-cover opacity-60"
            src="/images/simulation.png"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-64 h-64 border border-neon-green/40 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
