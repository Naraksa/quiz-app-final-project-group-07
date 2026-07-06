import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import QuizSection from "../components/quiz/QuizSection";

export default function QuizVocabPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/vocabQuestions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load vocabulary questions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <QuizSection
      sectionLabel="Vocabulary"
      sectionEmoji="🔤"
      sectionNumber={1}
      questions={questions}
      answers={state.vocabAnswers}
      onChange={(index, answer) =>
        dispatch({
          type: "ANSWER_VOCAB",
          payload: { index, answer },
        })
      }
      onSubmit={() => {
        window.scrollTo(0, 0);
        navigate("/quiz/grammar");
      }}
    />
  );
}