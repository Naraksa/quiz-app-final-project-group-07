# Interfaces Contract (Role A → B & C)

This is the shape everyone builds against. **Locked on Day 1.** Role A must not
change the state shape or action names without telling B and C first.

## Global state shape

`QuizProvider` (React Context + `useReducer`) holds:

```js
{
  name: '',            // string — player's name
  difficulty: null,    // 'easy' | 'medium' | 'hard' | null
  vocabAnswers: [],    // vocabAnswers[questionIndex] = selected choice index (0-3)
  grammarAnswers: [],  // grammarAnswers[questionIndex] = selected choice index (0-3)
}
```

## Actions (dispatch these)

| Action type       | payload                    | Effect                                  |
| ----------------- | -------------------------- | --------------------------------------- |
| `SET_NAME`        | `string`                   | Sets `name`                             |
| `SET_DIFFICULTY`  | `'easy' \| 'medium' \| 'hard'` | Sets `difficulty`                   |
| `ANSWER_VOCAB`    | `{ index, answer }`        | Records vocab answer at `index`         |
| `ANSWER_GRAMMAR`  | `{ index, answer }`        | Records grammar answer at `index`       |
| `RESET`           | —                          | Clears state back to `initialState`     |

Example:

```js
dispatch({ type: 'SET_NAME', payload: 'Visal' })
dispatch({ type: 'ANSWER_VOCAB', payload: { index: 3, answer: 2 } })
```

## How to read/write state

```js
import { useQuiz } from '../hooks/useQuiz.js'

const { state, dispatch } = useQuiz()
```

`useQuiz()` throws if used outside `<QuizProvider>`.

## Persistence

Every dispatch is auto-saved to `localStorage` (key `quiz-app-state`) via the
generic `useLocalStorage` hook, and restored on load. Refreshing mid-quiz keeps
progress — no extra work needed from B or C.

## Routes (Role A owns)

| Path             | Page                |
| ---------------- | ------------------- |
| `/`              | `HomePage`          |
| `/difficulty`    | `DifficultyPage`    |
| `/instructions`  | `InstructionsPage`  |
| `/quiz/vocab`    | `QuizVocabPage`     |
| `/quiz/grammar`  | `QuizGrammarPage`   |
| `/results`       | `ResultsPage`       |
| `/review`        | `ReviewPage`        |

## Open items for B (data schema — B locks this)

Question JSON shape used by `useQuizData` and `QuestionCard` (confirm with B):

```js
{ question: string, choices: [string, string, string, string], answer: number /* 0-3 */ }
```
