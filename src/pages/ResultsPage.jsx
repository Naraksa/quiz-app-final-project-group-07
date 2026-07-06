import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { GradientHeading } from "../components/ui/GradientHeading";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import "./ResultsPage.css";

function getScoreLabel(percentage) {
  if (percentage >= 90)
    return { label: "Outstanding! 🏆", className: "label label--green" };
  if (percentage >= 70)
    return { label: "Great work! ⚡", className: "label label--yellow" };
  if (percentage >= 50)
    return { label: "Good effort! 💪", className: "label label--purple" };
  return { label: "Keep practicing! 📚", className: "label label--red" };
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const [vocabQuestions, setVocabQuestions] = useState([]);
  const [grammarQuestions, setGrammarQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/vocabQuestions.json").then((res) => res.json()),
      fetch("/data/grammarQuestions.json").then((res) => res.json()),
    ])
      .then(([vocab, grammar]) => {
        setVocabQuestions(vocab);
        setGrammarQuestions(grammar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quiz questions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading results...</p>
      </div>
    );
  }

  const vocabScore = vocabQuestions.filter(
    (q, i) => state.vocabAnswers[i] === q.answer
  ).length;

  const grammarScore = grammarQuestions.filter(
    (q, i) => state.grammarAnswers[i] === q.answer
  ).length;

  const totalScore = vocabScore + grammarScore;
  const percentage = Math.round((totalScore / 30) * 100);
  const scoreLabel = getScoreLabel(percentage);

  return (
    <div className="results-container">
      <div className="header">
        <p className={scoreLabel.className}>{scoreLabel.label}</p>

        <h2 className="title">
          <GradientHeading>Your Results</GradientHeading>
        </h2>

        <p className="subtitle">
          Here's how you did, {state.name.trim()}.
        </p>
      </div>

      {/* Score Ring */}
      <div className="score-ring">
        <svg className="ring-svg" viewBox="0 0 144 144">
          <circle cx="72" cy="72" r="60" className="ring-bg" />

          <circle
            cx="72"
            cy="72"
            r="60"
            className="ring-progress"
            strokeDasharray={`${2 * Math.PI * 60}`}
            strokeDashoffset={`${2 * Math.PI * 60 * (1 - totalScore / 30)}`}
          />

          <defs>
            <linearGradient id="scoreGrad">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="score-text">
          <p className="score-number">{totalScore}</p>
          <p className="score-outof">out of 30</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="breakdown">
        <div className="breakdown-header">
          <span className="emoji">📊</span>
          <span>Score Breakdown</span>
        </div>

        {[
          { label: "Vocabulary", score: vocabScore, emoji: "🔤" },
          { label: "Grammar", score: grammarScore, emoji: "✏️" },
        ].map((s) => (
          <div key={s.label} className="breakdown-item">
            <span className="emoji-large">{s.emoji}</span>

            <div className="breakdown-content">
              <div className="breakdown-top">
                <span className="breakdown-label">{s.label}</span>
                <span className="breakdown-score">
                  {s.score} / 15
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(s.score / 15) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="breakdown-total">
          <span>Total Score</span>
          <span>
            {totalScore} / 30 ({percentage}%)
          </span>
        </div>
      </div>

      <div className="actions">
        <PrimaryButton
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/review");
          }}
        >
          Review Answers 📋
        </PrimaryButton>

        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            navigate("/");
          }}
          className="back-button"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
}