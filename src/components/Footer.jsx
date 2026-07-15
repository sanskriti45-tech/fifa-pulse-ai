export default function Footer() {
  return (
    <footer className="w-full py-16 px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/10 relative z-10">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 max-w-sm">
          <span className="text-headline-md font-headline-md font-black text-primary">
            FIFA OPERATIONAL COMMAND
          </span>
          <p className="text-on-surface-variant text-sm opacity-60">
            Global Headquarters Alpha. Integrating human intuition with hyper-scale artificial
            intelligence for the future of sport.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">
              Protocols
            </h5>
            <ul className="space-y-2 text-on-surface-variant text-sm">
              <li>
                <a className="hover:text-neon-green transition-colors" href="#">
                  Security Protocol
                </a>
              </li>
              <li>
                <a className="hover:text-neon-green transition-colors" href="#">
                  System Status
                </a>
              </li>
              <li>
                <a className="hover:text-neon-green transition-colors" href="#">
                  AI Ethics Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">
              Network
            </h5>
            <ul className="space-y-2 text-on-surface-variant text-sm">
              <li>
                <a className="hover:text-neon-green transition-colors" href="#">
                  Node Registry
                </a>
              </li>
              <li>
                <a className="hover:text-neon-green transition-colors" href="#">
                  API Console
                </a>
              </li>
              <li>
                <a className="hover:text-neon-green transition-colors" href="#">
                  Digital Twins
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">
              System Health
            </h5>
            <div className="flex items-center gap-2 text-neon-green">
              <span className="w-2 h-2 rounded-full bg-neon-green pulse-border"></span>
              <span className="text-data-label font-data-label">ALL NODES NOMINAL</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-data-label font-data-label text-on-surface-variant opacity-40 text-xs">
          © 2026 FIFA OPERATIONAL COMMAND. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <a
            className="text-data-label font-data-label text-on-surface-variant hover:text-white transition-colors text-xs"
            href="#"
          >
            PRIVACY POLICY
          </a>
          <a
            className="text-data-label font-data-label text-on-surface-variant hover:text-white transition-colors text-xs"
            href="#"
          >
            TERMS OF SERVICE
          </a>
        </div>
      </div>
    </footer>
  )
}
