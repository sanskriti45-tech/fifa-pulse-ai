import { useEffect } from 'react'

// Replicates the original inline script:
// observes every .reveal element and adds an "active" class
// once it scrolls into view.
export default function useReveal() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    const revealEls = document.querySelectorAll('.reveal')
    revealEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
