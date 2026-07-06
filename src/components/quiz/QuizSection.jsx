import { GradientHeading } from "../ui/GradientHeading";
import { PrimaryButton } from "../ui/PrimaryButton";
import "./QuizSection.css";

const CHOICE_KEYS = ["A", "B", "C", "D"];

export default function QuizSection({
  sectionLabel,
  sectionEmoji,
  sectionNumber,
  questions = [],
  answers = [],
  onChange,
  onSubmit,
}) {
  const safeAnswers = Array.isArray(answers) ? answers : [];
  const answered = safeAnswers.filter((a) => a !== null && a !== undefined).length;
  const allAnswered = answered === questions.length;

  return (
    <div className="page-container">
      <div className="quiz-sticky-header">
        <div className="quiz-header-layout">
          <div className="quiz-header-left">
            <span className="card-emoji" style={{ fontSize: "1.35rem" }}>{sectionEmoji}</span>
            <div>
              <p className="section-indicator">
                Section {sectionNumber} of 2
              </p>
              <h2 className="title-text" style={{ fontSize: "1.5rem" }}>
                <GradientHeading>{sectionLabel}</GradientHeading>
              </h2>
            </div>
          </div>
          <div className="quiz-counter-right">
            <p className="counter-label">Answered</p>
            <p className="counter-numbers">
              {answered} <span className="counter-total">/ {questions.length}</span>
            </p>
          </div>
        </div>
        
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${questions.length ? (answered / questions.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="questions-stack">
        {questions.map((q, qi) => (
          <div key={qi} className="question-card">
            <div className="question-card-header">
              <span className="question-number-badge">
                Q{qi + 1}
              </span>
              <p className="question-text">{q.question}</p>
            </div>
            
            <div className="choices-grid">
              {q.choices.map((choice, ci) => {
                const isSelected = safeAnswers[qi] === ci;
                return (
                  <button
                    key={ci}
                    onClick={() => onChange(qi, ci)}
                    className={`choice-button ${isSelected ? "selected" : ""}`}
                  >
                    <span className="choice-letter-badge">
                      {CHOICE_KEYS[ci]}
                    </span>
                    <span className="choice-label-text">
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="submit-action-box">
        {!allAnswered && (
          <p className="warning-notice-text">
            Answer all {questions.length} questions to continue
          </p>
        )}
        <PrimaryButton onClick={onSubmit} disabled={!allAnswered}>
          {sectionNumber === 1 ? "Next Section: Grammar ✏️" : "Finish Quiz →"}
        </PrimaryButton>
      </div>
    </div>
  );
}