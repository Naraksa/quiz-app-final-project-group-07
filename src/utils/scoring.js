// Role B (Data) — scoring.js
// Pure functions only, no React. e.g. countCorrect(answers, questions).
import { SCORE_TIERS } from "./constants";

/**
 * Calculates the number of correct answers.
 * @param {Array<{answer: number}>} questions - question objects with correct answer index
 * @param {Array<number|null>} userAnswers - user's selected choice index per question, same order
 * @returns {number} count of correct answers
 */
export function calculateScore(questions, userAnswers) {
  if (!Array.isArray(questions) || !Array.isArray(userAnswers)) return 0;

  return questions.reduce((score, question, index) => {
    const isCorrect = userAnswers[index] === question.answer;
    return isCorrect ? score + 1 : score;
  }, 0);
}

/**
 * Calculates percentage score, rounded to nearest whole number.
 * @param {number} score - number correct
 * @param {number} total - total number of questions
 * @returns {number} percentage 0-100
 */
export function calculatePercentage(score, total) {
  if (!total || total <= 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Looks up the label for a given percentage based on SCORE_TIERS.
 * @param {number} percentage - 0-100
 * @returns {string} tier label
 */
export function getScoreLabel(percentage) {
  const tier = getScoreTier(percentage);
  return tier.label;
}

/**
 * Looks up the color for a given percentage based on SCORE_TIERS.
 * @param {number} percentage - 0-100
 * @returns {string} hex color
 */
export function getScoreColor(percentage) {
  const tier = getScoreTier(percentage);
  return tier.color;
}

/**
 * Internal helper: finds the highest tier whose min threshold
 * the percentage meets or exceeds.
 * @param {number} percentage - 0-100
 * @returns {{min: number, label: string, color: string}}
 */
function getScoreTier(percentage) {
  const clamped = Math.max(0, Math.min(100, percentage || 0));
  // SCORE_TIERS is ordered ascending by min, so take the last match.
  let matched = SCORE_TIERS[0];
  for (const tier of SCORE_TIERS) {
    if (clamped >= tier.min) {
      matched = tier;
    }
  }
  return matched;
}

/**
 * Combines two subject scores into a single summary object.
 * @param {number} vocabScore - correct count for vocab
 * @param {number} vocabTotal - total vocab questions
 * @param {number} grammarScore - correct count for grammar
 * @param {number} grammarTotal - total grammar questions
 * @returns {{total: number, percentage: number, label: string, color: string}}
 */
export function combineScores(vocabScore, vocabTotal, grammarScore, grammarTotal) {
  const total = vocabScore + grammarScore;
  const totalQuestions = vocabTotal + grammarTotal;
  const percentage = calculatePercentage(total, totalQuestions);

  return {
    total,
    percentage,
    label: getScoreLabel(percentage),
    color: getScoreColor(percentage),
  };
}
