export default function StadiumHub() {
  return (
    <section className="px-margin-desktop reveal" id="stadium-hub">
      <div className="glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <div className="w-full md:w-2/3 relative h-[400px] md:h-auto">
          <img
            alt="Stadium Intelligence Hub"
            className="w-full h-full object-cover"
            src="/images/stadium.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent"></div>
        </div>
        <div className="w-full md:w-1/3 p-12 flex flex-col justify-center">
          <h2 className="font-display-lg text-display-lg mb-6 leading-tight">
            STADIUM
            <br />
            INTELLIGENCE
          </h2>
          <p className="text-on-surface-variant mb-8 font-body-lg">
            Real-time 3D telemetry synchronization. Every ticket, every sensor, and every climate
            control unit mapped into a singular living digital twin.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-neon-green">wifi_tethering</span>
              <span className="text-data-label font-data-label">5.2M SENSOR NODES</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-neon-green">ac_unit</span>
              <span className="text-data-label font-data-label">DYNAMIC CLIMATE ADAPTATION</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-neon-green">emergency</span>
              <span className="text-data-label font-data-label">INSTANT FAILOVER PROTOCOLS</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
