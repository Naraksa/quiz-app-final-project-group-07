import "./ScoreRing.css";
// Role C (UI) — ScoreRing.jsx
export default function ScoreRing({ score, total }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="score-ring">
      <svg className="ring-svg" viewBox="0 0 144 144">
        <circle
          cx="72"
          cy="72"
          r={radius}
          className="ring-bg"
        />

        <circle
          cx="72"
          cy="72"
          r={radius}
          className="ring-progress"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / total)}
        />

        <defs>
          <linearGradient id="scoreGrad">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="score-text">
        <p className="score-number">{score}</p>
        <p className="score-outof">out of {total}</p>
      </div>
    </div>
  );
}