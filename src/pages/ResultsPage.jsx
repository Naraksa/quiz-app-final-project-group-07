import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { useQuizData } from "../hooks/useQuizData.js";
import { useScore } from "../hooks/useScore.js";
import { QUIZ_TYPES, FETCH_STATUS } from "../utils/constants";
import { GradientHeading } from "../components/ui/GradientHeading";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import ScoreRing from "../components/quiz/ScoreRing.jsx";

const LABEL_DISPLAY = {
  "Keep Practicing": "Keep practicing!",
  "Getting There": "Getting there!",
  "Good Job": "Good job!",
  "Excellent": "Excellent!",
};

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { questions: vocabQuestions, status: vocabStatus } = useQuizData(QUIZ_TYPES.VOCAB, state.difficulty);
  const { questions: grammarQuestions, status: grammarStatus } = useQuizData(QUIZ_TYPES.GRAMMAR, state.difficulty);

  const { vocabScore, grammarScore, total, percentage, label, color } = useScore(
    vocabQuestions,
    state.vocabAnswers,
    grammarQuestions,
    state.grammarAnswers
  );

  const displayLabel = LABEL_DISPLAY[label] ?? label;

  if (vocabStatus === FETCH_STATUS.LOADING || grammarStatus === FETCH_STATUS.LOADING) {
    return <p className="text-center text-sm text-muted-foreground py-12">Loading and Calculating results...</p>;
  }

  const maxScore = vocabQuestions.length + grammarQuestions.length;

  return (
    <div className="flex flex-col items-center gap-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-lg font-black" style={{ color }}>{displayLabel}</p>
        <h2 className="text-4xl font-black tracking-tight"><GradientHeading>Your Results</GradientHeading></h2>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>Here's how you did, {state.name.trim()}.</p>
      </div>

      <ScoreRing score={total} total={maxScore} />

      <div className="w-full rounded-2xl border border-border bg-card backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3" style={{ background: "rgba(124,58,237,0.12)" }}>
          <span className="text-xl">📊</span>
          <span className="font-bold text-foreground tracking-wide">Score Breakdown</span>
        </div>
        {[
          { label: "Vocabulary", score: vocabScore, outOf: vocabQuestions.length, emoji: "🔤" },
          { label: "Grammar", score: grammarScore, outOf: grammarQuestions.length, emoji: "✏️" },
        ].map((s) => (
          <div key={s.label} className="px-6 py-4 flex items-center gap-4 border-b border-border last:border-0">
            <span className="text-2xl">{s.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-bold text-foreground">{s.label}</span>
                <span className="text-sm font-bold text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>{s.score} / {s.outOf}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${s.outOf ? (s.score / s.outOf) * 100 : 0}%`, background: "linear-gradient(90deg, #7c3aed, #6366f1)" }} />
              </div>
            </div>
          </div>
        ))}
        <div className="px-6 py-3 flex justify-between items-center" style={{ background: "rgba(167,139,250,0.06)" }}>
          <span className="text-sm font-bold text-foreground">Total Score</span>
          <span className="text-sm font-black text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>{total} / {maxScore} ({percentage}%)</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <PrimaryButton onClick={() => { window.scrollTo(0, 0); navigate("/review"); }}>Review Answers</PrimaryButton>
        <PrimaryButton
          onClick={() => { dispatch({ type: "RESET" }); navigate("/"); }}
          className="w-full py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-violet-400/40 transition-all duration-200"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ← Back to Main Menu
        </PrimaryButton>
      </div>
    </div>
  );
}