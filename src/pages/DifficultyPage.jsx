import { Link } from 'react-router-dom'

// PLACEHOLDER — owned by Role C. Real page picks easy / medium / hard.
export default function DifficultyPage() {
  return (
    <div>
      <h1>Difficulty</h1>
      <p>DifficultyPage placeholder (Role C).</p>
      <Link to="/instructions">Go to Instructions</Link>
    </div>
  )
}
