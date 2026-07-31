export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-purple-600/25 blur-[130px] animate-aurora" />
      <div
        className="absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-[130px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-emerald-500/15 blur-[130px] animate-aurora"
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#07070f] to-transparent" />
    </div>
  );
}
