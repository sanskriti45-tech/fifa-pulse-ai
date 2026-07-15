import Header from './components/Header'
import Hero from './components/Hero'
import Operations from './components/Operations'
import StadiumHub from './components/StadiumHub'
import Broadcast from './components/Broadcast'
import CrowdAnalytics from './components/CrowdAnalytics'
import Simulation from './components/Simulation'
import Emergency from './components/Emergency'
import GeminiCore from './components/GeminiCore'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'
import useGlassPanelMouse from './hooks/useGlassPanelMouse'

export default function App() {
  useReveal()
  useGlassPanelMouse()

  return (
    <>
      <Header />
      <main className="relative z-10 pt-24 space-y-32 pb-32">
        <Hero />
        <Operations />
        <StadiumHub />
        <Broadcast />
        <CrowdAnalytics />
        <Simulation />
        <Emergency />
        <GeminiCore />
      </main>
      <Footer />
    </>
  )
}
