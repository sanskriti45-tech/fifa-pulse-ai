import { useEffect } from 'react'

// Replicates the original inline script:
// tracks mouse position and sets --mouse-x / --mouse-y custom
// properties on nearby .glass-panel elements.
export default function useGlassPanelMouse() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll('.glass-panel').forEach((panel) => {
        const rect = panel.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)

        if (Math.abs(dx) < 500 && Math.abs(dy) < 500) {
          panel.style.setProperty('--mouse-x', `${dx / 20}px`)
          panel.style.setProperty('--mouse-y', `${dy / 20}px`)
        }
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])
}
