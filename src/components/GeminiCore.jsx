export default function GeminiCore() {
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
        The neural backbone of the entire FIFA Pulse ecosystem. Processing 12 petabytes of data
        per second to ensure every fan experience is seamless and every operational decision is
        mathematically optimized.
      </p>
      <div className="grid grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-xl">
          <span className="text-display-lg font-display-lg text-neon-green block">1.2ms</span>
          <span className="text-data-label font-data-label opacity-60">REASONING SPEED</span>
        </div>
        <div className="glass-panel p-6 rounded-xl">
          <span className="text-display-lg font-display-lg text-neon-green block">99.9%</span>
          <span className="text-data-label font-data-label opacity-60">UPTIME SLA</span>
        </div>
        <div className="glass-panel p-6 rounded-xl">
          <span className="text-display-lg font-display-lg text-neon-green block">∞</span>
          <span className="text-data-label font-data-label opacity-60">SCALABILITY</span>
        </div>
      </div>
    </section>
  )
}
