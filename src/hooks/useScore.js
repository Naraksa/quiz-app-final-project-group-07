// Role B (Data) — useScore.js
// Reads answers from context + question data, returns
// { vocabScore, grammarScore, total, percentage, label, color }.
import { useMemo } from "react";
import { calculateScore, combineScores } from "../utils/scoring";

export function useScore(vocabQuestions, vocabAnswers, grammarQuestions, grammarAnswers) {
  return useMemo(() => {
    const vocabScore = calculateScore(vocabQuestions, vocabAnswers);
    const grammarScore = calculateScore(grammarQuestions, grammarAnswers);

    const { total, percentage, label, color } = combineScores(
      vocabScore,
      vocabQuestions?.length || 0,
      grammarScore,
      grammarQuestions?.length || 0
    );

    return { vocabScore, grammarScore, total, percentage, label, color };
  }, [vocabQuestions, vocabAnswers, grammarQuestions, grammarAnswers]);
}
