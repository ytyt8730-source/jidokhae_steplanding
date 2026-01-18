import Hero from './components/Hero'
import VibeCheck from './components/VibeCheck'
import OurStory from './components/OurStory'
import RecruitmentRoles from './components/RecruitmentRoles'
import LeadersLetter from './components/LeadersLetter'
import Benefits from './components/Benefits'
import FAQ from './components/FAQ'
import Epilogue from './components/Epilogue'
import StickyBottomBar from './components/StickyBottomBar'

function App() {
  return (
    <div className="min-h-screen pb-24">
      <Hero />
      <VibeCheck />
      <OurStory />
      <RecruitmentRoles />
      <LeadersLetter />
      <Benefits />
      <FAQ />
      <Epilogue />
      <StickyBottomBar />
    </div>
  )
}

export default App
