import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext.jsx'

// The one door into shared state. Any component that needs to read or change
// the whiteboard goes through here — returns { state, dispatch }.
export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === null) {
    throw new Error('useQuiz must be used within a <QuizProvider>')
  }
  return context
}
