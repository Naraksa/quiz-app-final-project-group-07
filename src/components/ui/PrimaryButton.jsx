// Role C (UI) — PrimaryButton.jsx
export function PrimaryButton({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl font-bold text-base transition-all duration-200 relative overflow-hidden group"
      style={{
        background: disabled ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #7c3aed, #6366f1)",
        color: disabled ? "rgba(255,255,255,0.3)" : "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 4px 24px rgba(124,58,237,0.45)",
      }}
    >
      {!disabled && <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
      {children}
    </button>
  );
}
