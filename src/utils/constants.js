// Role B (Data) — constants.js
// Fixed values: difficulty levels, score-tier thresholds and colors.
export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

// Ordered from lowest to highest threshold.
// `min` is the inclusive lower bound of the percentage (0-100) for that tier.
export const SCORE_TIERS = [
  { min: 0, label: "Keep Practicing", color: "#e74c3c" }, // red
  { min: 40, label: "Getting There", color: "#f39c12" }, // orange
  { min: 70, label: "Good Job", color: "#3498db" }, // blue
  { min: 90, label: "Excellent", color: "#2ecc71" }, // green
];

export const QUIZ_TYPES = {
  VOCAB: "vocab",
  GRAMMAR: "grammar",
};

// Fetch status values returned by useQuizData
export const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
