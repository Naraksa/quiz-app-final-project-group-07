import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { useQuizData } from "../hooks/useQuizData.js";
import { QUIZ_TYPES, FETCH_STATUS } from "../utils/constants";
import QuizSection from "../components/quiz/QuizSection";

export default function QuizGrammarPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { questions, status } = useQuizData(QUIZ_TYPES.GRAMMAR, state.difficulty);

  if (status === FETCH_STATUS.LOADING) {
    return <p className="text-center text-sm text-muted-foreground py-12">Loading grammar questions...</p>;
  }
  if (status === FETCH_STATUS.ERROR || questions.length === 0) {
    return <p className="text-center text-sm text-rose-300 py-12">Couldn't load grammar questions. Please try again.</p>;
  }

  return (
    <QuizSection
      sectionLabel="Grammar"
      sectionNumber={2}
      questions={questions}
      answers={state.grammarAnswers}
      onChange={(index, answer) => dispatch({ type: "ANSWER_GRAMMAR", payload: { index, answer } })}
      onSubmit={() => { window.scrollTo(0, 0); navigate("/results"); }}
    />
  );
}