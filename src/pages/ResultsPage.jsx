import { Link } from 'react-router-dom'

// PLACEHOLDER — owned by Role C. Real page shows score via useScore + ScoreRing.
export default function ResultsPage() {
  return (
    <div>
      <h1>Results</h1>
      <p>ResultsPage placeholder (Role C).</p>
      <Link to="/review">Review Answers</Link>
    </div>
  )
}
