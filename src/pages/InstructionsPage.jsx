import { Link } from 'react-router-dom'

// PLACEHOLDER — owned by Role C. Real page shows the rules before starting.
export default function InstructionsPage() {
  return (
    <div>
      <h1>Instructions</h1>
      <p>InstructionsPage placeholder (Role C).</p>
      <Link to="/quiz/vocab">Start Vocab Quiz</Link>
    </div>
  )
}
