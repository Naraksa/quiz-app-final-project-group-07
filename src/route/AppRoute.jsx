import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import HomePage from '../pages/HomePage.jsx'
import DifficultyPage from '../pages/DifficultyPage.jsx'
import InstructionsPage from '../pages/InstructionsPage.jsx'
import QuizVocabPage from '../pages/QuizVocabPage.jsx'
import QuizGrammarPage from '../pages/QuizGrammarPage.jsx'
import ResultsPage from '../pages/ResultsPage.jsx'
import ReviewPage from '../pages/ReviewPage.jsx'

// The map: App is the layout shell, every page is a child rendered into its
// <Outlet />. All 7 routes point at a real file in pages/.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'difficulty', element: <DifficultyPage /> },
      { path: 'instructions', element: <InstructionsPage /> },
      { path: 'quiz/vocab', element: <QuizVocabPage /> },
      { path: 'quiz/grammar', element: <QuizGrammarPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'review', element: <ReviewPage /> },
    ],
  },
])
