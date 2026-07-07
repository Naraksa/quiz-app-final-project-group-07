import { Outlet, useLocation } from 'react-router-dom'
import BackgroundDecor from './components/layout/BackgroundDecor.jsx'

// The building's outer shell / hallway. Renders the shared background once,
// then whichever page is active via <Outlet />. No page-specific logic or
// styling here — UI/UX (Role C) owns the look.
export default function App() {
  // for tailwind animation
  const location = useLocation() // subscribes to route changes so App re-renders on navigation

  return (
    <div className="min-h-screen w-full flex justify-center relative overflow-x-hidden">
      <BackgroundDecor />
      <div className="w-full max-w-2xl px-6 py-10">
        {/* for fade in from the bottom animation on all pages. */}
        {/* required "npm install tailwindcss-animate" for this to work. however, it is optional */}
        <div key={location.pathname} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
