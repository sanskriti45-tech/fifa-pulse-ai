export default function Hero() {
  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center px-margin-desktop relative overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0 z-[-1] opacity-50 scale-110">
        <img
          alt="Hero background"
          className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          src="/images/hero.png"
        />
      </div>
      <div className="max-w-4xl reveal active">
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-neon-green pulse-border"></span>
          <span className="text-data-label font-data-label text-neon-green">
            SYSTEM LIVE: TOURNAMENT READY
          </span>
        </div>
        <h1 className="font-display-lg text-display-lg mb-4 text-white leading-none">
          OPERATIONAL CONTROL
          <br />
          <span className="text-primary-fixed">WORLD CUP 2042</span>
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Unified Artificial Intelligence framework coordinating real-time security, broadcast
          precision, and predictive infrastructure across 12 digital-twin venues.
        </p>
        <div className="mt-12 flex gap-4">
          <button className="bg-neon-green text-surface px-8 py-4 font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3">
            INITIALIZE COMMAND <span className="material-symbols-outlined">terminal</span>
          </button>
          <button className="border border-white/20 glass-panel text-white px-8 py-4 font-bold hover:bg-white/10 transition-all">
            VIEW LIVE FEED
          </button>
        </div>
      </div>
    </section>
  )
}
