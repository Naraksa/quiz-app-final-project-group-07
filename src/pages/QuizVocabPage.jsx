import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { useQuizData } from "../hooks/useQuizData.js";
import { QUIZ_TYPES, FETCH_STATUS } from "../utils/constants";
import QuizSection from "../components/quiz/QuizSection";

export default function QuizVocabPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { questions, status } = useQuizData(QUIZ_TYPES.VOCAB, state.difficulty);

  if (status === FETCH_STATUS.LOADING) {
    return <p className="text-center text-sm text-muted-foreground py-12">Loading vocabulary questions...</p>;
  }
  if (status === FETCH_STATUS.ERROR || questions.length === 0) {
    return <p className="text-center text-sm text-rose-300 py-12">Couldn't load vocabulary questions. Please try again.</p>;
  }

  return (
    <QuizSection
      sectionLabel="Vocabulary"
      sectionNumber={1}
      questions={questions}
      answers={state.vocabAnswers}
      onChange={(index, answer) => dispatch({ type: "ANSWER_VOCAB", payload: { index, answer } })}
      onSubmit={() => { window.scrollTo(0, 0); navigate("/quiz/grammar"); }}
    />
  );
}