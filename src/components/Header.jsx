export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 bg-surface/15 dark:bg-surface-dim/20 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="flex items-center gap-8">
        <span className="text-headline-md font-headline-md font-extrabold tracking-tighter text-primary dark:text-primary-fixed">
          FIFA PULSE AI
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Operational Hub
          </a>
          <a
            className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Analytics
          </a>
          <a
            className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Logs
          </a>
          <a
            className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed transition-colors duration-300"
            href="#"
          >
            Support
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
          <span className="material-symbols-outlined text-primary/60">sensors</span>
          <span className="material-symbols-outlined text-primary/60">memory</span>
          <span className="material-symbols-outlined text-primary/60">signal_cellular_alt</span>
        </div>
        <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold hover:scale-95 transition-all">
          Deploy Field Mode
        </button>
      </div>
    </header>
  )
}
