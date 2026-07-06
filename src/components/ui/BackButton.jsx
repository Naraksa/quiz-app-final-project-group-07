// Role C (UI) — BackButton.jsx
export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="self-start flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150" style={{ fontFamily: "'Inter', sans-serif" }}>
      ← Back
    </button>
  );
}