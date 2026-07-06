import { Link } from 'react-router-dom'

// PLACEHOLDER — owned by Role C. Real page collects the player's name.
export default function HomePage() {
  return (
    <div>
      <h1>Quiz App</h1>
      <p>HomePage placeholder (Role C).</p>
      <Link to="/difficulty">Go to Difficulty</Link>
    </div>
  )
}
