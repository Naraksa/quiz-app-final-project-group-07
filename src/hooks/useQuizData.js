import { useState, useEffect } from "react";
import { QUIZ_TYPES, FETCH_STATUS } from "../utils/constants";

const FILE_MAP = {
  [QUIZ_TYPES.VOCAB]: "/data/vocabQuestions.json",
  [QUIZ_TYPES.GRAMMAR]: "/data/grammarQuestions.json",
};

export function useQuizData(quizType, difficulty) {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.LOADING);

  useEffect(() => {
    let isCancelled = false;
    const path = FILE_MAP[quizType];

    if (!path) {
      setStatus(FETCH_STATUS.ERROR);
      setQuestions([]);
      return;
    }

    setStatus(FETCH_STATUS.LOADING);

    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${path}: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isCancelled) return;
        const filtered = difficulty
          ? data.filter((q) => q.difficulty === difficulty)
          : data;
        setQuestions(filtered);
        setStatus(FETCH_STATUS.SUCCESS);
      })
      .catch(() => {
        if (isCancelled) return;
        setQuestions([]);
        setStatus(FETCH_STATUS.ERROR);
      });

    return () => {
      isCancelled = true;
    };
  }, [quizType, difficulty]); // difficulty added to dep array — refetch/refilter on change

  return { questions, status };
}