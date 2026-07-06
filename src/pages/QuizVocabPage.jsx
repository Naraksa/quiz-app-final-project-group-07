import { Link } from 'react-router-dom'

// PLACEHOLDER — owned by Role C. Real page renders the vocab QuizSection.
export default function QuizVocabPage() {
  return (
    <div>
      <h1>Vocab Quiz</h1>
      <p>QuizVocabPage placeholder (Role C).</p>
      <Link to="/quiz/grammar">Grammar Quiz</Link>
    </div>
  )
}
