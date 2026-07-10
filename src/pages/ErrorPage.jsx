import { useNavigate, useRouteError } from "react-router-dom";
import { GradientHeading } from "../components/ui/GradientHeading";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  console.error("Unhandled route error:", error);

  function handleStartOver() {
    localStorage.removeItem("quiz-app-state");
    navigate("/", { replace: true });
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight">
          <GradientHeading>Something Went Wrong</GradientHeading>
        </h2>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
          The app hit an unexpected error. Starting over should fix it.
        </p>
      </div>
      <div className="w-full max-w-xs">
        <PrimaryButton onClick={handleStartOver}>Start Over</PrimaryButton>
      </div>
    </div>
  );
}