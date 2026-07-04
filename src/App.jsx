import { Outlet } from 'react-router-dom'
import BackgroundDecor from './components/layout/BackgroundDecor.jsx'

// The building's outer shell / hallway. Renders the shared background once,
// then whichever page is active via <Outlet />. No page-specific logic or
// styling here — UI/UX (Role C) owns the look.
export default function App() {
  return (
    <>
      <BackgroundDecor />
      <Outlet />
    </>
  )
}
