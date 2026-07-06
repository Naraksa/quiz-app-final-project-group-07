import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext.jsx'
import { router } from './route/AppRoute.jsx'
import './index.css'

// The power switch: wrap the whole app in the whiteboard (QuizProvider) and
// the receptionist (RouterProvider), then turn everything on.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  </StrictMode>,
)
