import { createContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// The single source of truth — "the whiteboard" everyone reads from and
// writes to. Shape and action names are the contract for Roles B and C.
// See docs/interfaces.md. Do not change silently.

const STORAGE_KEY = 'quiz-app-state'

export const initialState = {
  name: '', // player's name
  difficulty: null, // 'easy' | 'medium' | 'hard'
  vocabAnswers: [], // vocabAnswers[questionIndex] = selected choice index
  grammarAnswers: [], // grammarAnswers[questionIndex] = selected choice index
}

export function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload }

    case 'ANSWER_VOCAB': {
      const vocabAnswers = [...state.vocabAnswers]
      vocabAnswers[action.payload.index] = action.payload.answer
      return { ...state, vocabAnswers }
    }

    case 'ANSWER_GRAMMAR': {
      const grammarAnswers = [...state.grammarAnswers]
      grammarAnswers[action.payload.index] = action.payload.answer
      return { ...state, grammarAnswers }
    }

    case 'RESET':
      return initialState

    default:
      throw new Error(`Unknown quiz action type: ${action.type}`)
  }
}

export const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  // Persistence hooks into the same reducer: the initial state is restored
  // from localStorage, and every dispatch is written back — so refreshing
  // mid-quiz (e.g. on /quiz/vocab) doesn't wipe progress.
  const [persisted, setPersisted] = useLocalStorage(STORAGE_KEY, initialState)
  const [state, dispatch] = useReducer(quizReducer, persisted)

  useEffect(() => {
    setPersisted(state)
  }, [state, setPersisted])

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}
