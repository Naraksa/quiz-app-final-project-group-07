export default function BackgroundDecor() {
  return (
    <>
      <div className="fixed inset-0 -z-10" style={{ background: "radial-gradient(...)" }} />
      <div className="fixed top-1/4 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10" style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-15 blur-3xl -z-10" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
    </>
  )
}
