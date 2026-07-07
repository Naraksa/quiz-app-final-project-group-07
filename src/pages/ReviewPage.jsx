import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { useQuizData } from "../hooks/useQuizData.js";
import { QUIZ_TYPES, FETCH_STATUS } from "../utils/constants";
import { GradientHeading } from "../components/ui/GradientHeading";
import { PrimaryButton } from "../components/ui/PrimaryButton";

const CHOICES = ["A", "B", "C", "D"];

export default function ReviewPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { questions: vocabQuestions, status: vocabStatus } = useQuizData(QUIZ_TYPES.VOCAB, state.difficulty);
  const { questions: grammarQuestions, status: grammarStatus } = useQuizData(QUIZ_TYPES.GRAMMAR, state.difficulty);

  if (vocabStatus === FETCH_STATUS.LOADING || grammarStatus === FETCH_STATUS.LOADING) {
    return <p className="text-center text-sm text-muted-foreground py-12">Loading review...</p>;
  }

  const vocabScore = vocabQuestions.filter((q, i) => state.vocabAnswers[i] === q.answer).length;
  const grammarScore = grammarQuestions.filter((q, i) => state.grammarAnswers[i] === q.answer).length;

  const sections = [
    { label: "Vocabulary", questions: vocabQuestions, answers: state.vocabAnswers, score: vocabScore },
    { label: "Grammar", questions: grammarQuestions, answers: state.grammarAnswers, score: grammarScore },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-black tracking-tight"><GradientHeading>Answer Review</GradientHeading></h2>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>See what you got right and wrong.</p>
      </div>

      {sections.map((section) => (
        <div key={section.label} className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">{section.emoji}</span>
            <span className="font-black text-sm tracking-widest uppercase text-violet-300">{section.label}</span>
            <span className="ml-auto text-xs text-muted-foreground font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{section.score}/{section.questions.length}</span>
          </div>
          {section.questions.map((q, i) => {
            const userAns = section.answers[i];
            const correct = userAns === q.answer;
            return (
              <div key={q.id ?? i} className={["rounded-xl border p-4 space-y-2", correct ? "border-emerald-400/30 bg-emerald-500/5" : "border-rose-400/30 bg-rose-500/5"].join(" ")}>
                <div className="flex items-start gap-2">
                  <span className="text-base shrink-0 mt-0.5">{correct ? "✅" : "❌"}</span>
                  <p className="text-sm font-semibold text-foreground leading-snug">{q.question}</p>
                </div>
                <div className="pl-7 space-y-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {!correct && userAns !== undefined && (
                    <p className="text-xs text-rose-300">Your answer: <span className="font-semibold">{CHOICES[userAns]}. {q.choices[userAns]}</span></p>
                  )}
                  <p className="text-xs text-emerald-300">Correct answer: <span className="font-semibold">{CHOICES[q.answer]}. {q.choices[q.answer]}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="pb-6 space-y-3">
        <PrimaryButton
          onClick={() => { window.scrollTo(0, 0); navigate("/results"); }}
          className="w-full py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-violet-400/40 transition-all duration-200"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ← Back to Results
        </PrimaryButton>
        <PrimaryButton onClick={() => { window.scrollTo(0, 0); dispatch({ type: "RESET" }); navigate("/"); }}>Back to Main Menu </PrimaryButton>
      </div>
    </div>
  );
}