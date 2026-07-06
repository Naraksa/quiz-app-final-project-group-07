import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import QuizSection from "../components/quiz/QuizSection";

export default function QuizGrammarPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/grammarQuestions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load grammar questions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <QuizSection
      sectionLabel="Grammar"
      sectionEmoji="✏️"
      sectionNumber={2}
      questions={questions}
      answers={state.grammarAnswers}
      onChange={(index, answer) =>
        dispatch({
          type: "ANSWER_GRAMMAR",
          payload: { index, answer },
        })
      }
      onSubmit={() => {
        window.scrollTo(0, 0);
        navigate("/results"); // change if your route is different
      }}
    />
  );
}