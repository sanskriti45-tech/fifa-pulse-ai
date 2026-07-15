export default function Emergency() {
  return (
    <section className="px-margin-desktop reveal" id="emergency">
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          <div className="glass-panel emergency-glass p-8 rounded-xl">
            <div className="flex items-center gap-3 text-emergency-red mb-4">
              <span className="material-symbols-outlined">emergency</span>
              <h3 className="font-headline-md text-headline-md">TACTICAL LOCKDOWN</h3>
            </div>
            <p className="text-on-surface-variant mb-6">
              Automated evacuation protocol active. All emergency routes synchronized with
              real-time crowd heatmaps.
            </p>
            <button className="w-full border border-emergency-red text-emergency-red py-4 font-bold hover:bg-emergency-red hover:text-white transition-all uppercase tracking-widest">
              EXECUTE PROTOCOL ALPHA
            </button>
          </div>
          <div className="glass-panel p-6 rounded-xl">
            <h4 className="text-data-label font-data-label mb-4 opacity-60 uppercase">
              Medical Units
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-data-value font-data-value">12 UNITS</span>
              <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs font-bold">
                READY
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden relative h-[500px]">
          <img
            alt="Emergency Response Tactical Map"
            className="w-full h-full object-cover"
            src="/images/emergency.png"
          />
          <div className="absolute inset-0 bg-emergency-red/5 mix-blend-overlay"></div>
        </div>
      </div>
    </section>
  )
}
