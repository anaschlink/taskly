interface ProgressRingProps {
    progress: number;
}

export function ProgressRing({progress}: ProgressRingProps){
    const pct = Math.round(progress*100)
    const raio = 15;
    const circunferencia = 2 * Math.PI * raio;
    const preenchido = circunferencia * (1- progress);
    return (
    <div className="relative h-11 w-11">
      <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
        <circle
          cx="20" cy="20" r={raio}
          fill="none" stroke="#EAE8E2" strokeWidth="3.5"
        />
        <circle
          cx="20" cy="20" r={raio}
          fill="none" stroke="#5546FF" strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={preenchido}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-neutral-500">
        {pct}
      </span>
    </div>
  );
}