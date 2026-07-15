export default function Broadcast() {
  return (
    <section className="px-margin-desktop max-w-container-max mx-auto reveal" id="broadcast">
      <div className="flex flex-col lg:flex-row gap-gutter">
        <div className="flex-1 glass-panel p-1 rounded-xl overflow-hidden">
          <img
            alt="Broadcast Command Station"
            className="w-full aspect-video object-cover"
            src="/images/broadcast.png"
          />
        </div>
        <div className="w-full lg:w-96 space-y-gutter">
          <div className="glass-panel p-6 rounded-xl">
            <h4 className="text-data-label font-data-label text-neon-green mb-4">
              LIVE CAMERA GRID
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-surface-container-highest flex items-center justify-center opacity-40">
                CAM_01
              </div>
              <div className="aspect-square bg-surface-container-highest flex items-center justify-center opacity-40">
                CAM_02
              </div>
              <div className="aspect-square bg-neon-green/20 border border-neon-green flex items-center justify-center text-neon-green">
                CAM_ACTIVE
              </div>
              <div className="aspect-square bg-surface-container-highest flex items-center justify-center opacity-40">
                CAM_04
              </div>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-xl">
            <h4 className="text-data-label font-data-label text-neon-green mb-4">
              PRODUCTION TIMELINE
            </h4>
            <div className="space-y-4 font-data-label text-xs">
              <div className="flex justify-between">
                <span className="opacity-40">14:02:11</span>
                <span>INTRO GRAPHICS END</span>
              </div>
              <div className="flex justify-between text-neon-green">
                <span>14:02:15</span>
                <span>LIVE KICK-OFF</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">14:22:00</span>
                <span>COMMERCIAL BREAK 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
