// Role C (UI) — GradientHeading.jsx
export function GradientHeading({ children, className = "" }) {
  return (
    <span
      className={`text-transparent bg-clip-text ${className}`}
      style={{ backgroundImage: "linear-gradient(135deg, #f0eeff 0%, #a78bfa 60%, #818cf8 100%)" }}
    >
      {children}
    </span>
  );
}
