import { useNavigate } from "react-router-dom";
import { useQuiz } from '../hooks/useQuiz.js'
import { GradientHeading } from "../components/ui/GradientHeading";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const canStart = state.name.trim().length > 0;

  return (
    <div className="page-container">
      <div className="home-page animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="home-badge">
          <span>✦</span><span>Brain Challenge</span><span>✦</span>
        </div>

        <div className="home-title-wrap">
          <h1 className="home-title">
            <GradientHeading>English Mastermind</GradientHeading>
          </h1>
          <p className="home-subtitle">Test your English knowledge. Challenge your limits.</p>
        </div>

        <div className="home-card">
          <div>
            <label htmlFor="name-input" className="home-label">Your name</label>
            <input
              id="name-input"
              type="text"
              value={state.name}
              onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && canStart && navigate("/difficulty")}
              placeholder="Enter your name..."
              className="home-input"
              autoFocus
            />
          </div>
          <PrimaryButton onClick={() => canStart && navigate("/difficulty")} disabled={!canStart}>
            Get Started →
          </PrimaryButton>
        </div>

        <div className="home-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="home-dot"
              style={{ background: `hsl(${260 + i * 15}, 70%, 70%)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}