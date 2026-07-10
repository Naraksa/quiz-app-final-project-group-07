import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz.js";
import { GradientHeading } from "../components/ui/GradientHeading";
import { BackButton } from "../components/ui/BackButton";
import "./DifficultyPage.css";

export default function DifficultyPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [difficulties, setDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load difficulty configurations");
        return res.json();
      })
      .then((data) => {
        if (isCancelled) return;
        setDifficulties(data.difficulties);
        setLoading(false);
      })
      .catch((err) => {
        if (isCancelled) return;
        console.error("Error loading quiz configurations:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-muted-foreground">Loading difficulties...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-rose-300">Couldn't load difficulties. Please try again.</div>;
  }

  return (
    <div className="page-container">
      <div className="difficulty-container">
        <div className="back-btn-wrapper">
          <BackButton onClick={() => navigate("/")} />
        </div>
        <div className="header-wrapper">
          <p className="greeting-text">
            HELLO, {state.name?.trim().toUpperCase() || "EXPLORER"}!
          </p>
          <h2 className="title-text">
            <GradientHeading>Pick a Difficulty</GradientHeading>
          </h2>
          <p className="subtitle-text">
            How brave are you feeling today?
          </p>
        </div>
        <div className="difficulty-list">
          {difficulties.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                dispatch({ type: "SET_DIFFICULTY", payload: d.id });
                navigate("/instructions");
              }}
              className={`difficulty-card ${d.color || ""} ${d.border || ""}`}
            >
              <div className="card-content-wrapper">
                <div className="card-left-section">
                  <span className="card-emoji">{d.emoji}</span>
                  <div>
                    <div className="card-title-row">
                      <span className="card-label">{d.label}</span>
                      <span className={`card-badge ${d.badge || ""}`}>
                        {d.id}
                      </span>
                    </div>
                    <p className="card-description">
                      {d.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}