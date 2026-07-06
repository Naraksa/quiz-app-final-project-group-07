import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { GradientHeading } from "../components/ui/GradientHeading";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { BackButton } from "../components/ui/BackButton";
import "./InstructionsPage.css"; // <--- Clean standard CSS import

export default function InstructionsPage() {
  const navigate = useNavigate();
  const { state } = useQuiz();
  
  const [difficulties, setDifficulties] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load quiz data");
        return res.json();
      })
      .then((data) => {
        setDifficulties(data.difficulties || []);
        setRules(data.rules || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading instruction data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-muted-foreground">Loading rules...</div>;
  }

  const diff = difficulties.find((d) => d.id === state.difficulty) ?? null;

  if (!diff) return <Navigate to="/difficulty" replace />;

  const difficultyId = diff.id.toLowerCase();

  return (
    <div className="page-container">
      <div className="instructions-container">
        <div className="back-btn-wrapper">
          <BackButton onClick={() => navigate("/difficulty")} />
        </div>
        
        <div className="instructions-header">
          {/* Dynamically computes the custom difficulty pill backgrounds */}
          <div className={`dynamic-badge badge-wrapper-${difficultyId}`}>
            <span>{diff.emoji}</span>
            <span>{diff.label} Mode</span>
          </div>
          <h2 className="title-text">
            <GradientHeading>How to Play</GradientHeading>
          </h2>
          <p className="subtitle-text">
            Read the rules before you jump in, {state.name?.trim() || "Explorer"}.
          </p>
        </div>

        <div className="instructions-card">
          <div className="card-header-bar">
            <span className="card-emoji">📖</span>
            <span className="card-header-title">Instructions</span>
          </div>
          
          <div className="rules-list">
            {rules.map((rule, i) => (
              <div key={i} className="rule-item-row">
                <div className="rule-icon-box">
                  {rule.icon}
                </div>
                <div className="rule-text-content">
                  <p className="rule-title">{rule.title}</p>
                  <p className="rule-body">{rule.body}</p>
                </div>
                <span className="rule-number">0{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="card-footer-bar">
            <p className="card-footer-text">
              Good luck — you've got this! ✦
            </p>
          </div>
        </div>

        <PrimaryButton onClick={() => navigate("/quiz/vocab")}>
          Start {diff.label} Quiz {diff.emoji}
        </PrimaryButton>
      </div>
    </div>
  );
}