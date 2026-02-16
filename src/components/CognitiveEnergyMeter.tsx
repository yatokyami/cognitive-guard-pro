import { Battery, Zap } from "lucide-react";

export default function CognitiveEnergyMeter() {
  const energyLevel = 67;

  return (
    <div className="glass-card px-3 py-2 flex items-center gap-3 flex-1">
      <div className="flex items-center gap-2">
        <Battery className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cognitive Energy</span>
      </div>
      <div className="flex-1 relative">
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full animate-energy-flow relative"
            style={{
              width: `${energyLevel}%`,
              background: `linear-gradient(90deg, hsl(170 100% 45%), hsl(170 100% 35%), hsl(170 100% 45%))`,
            }}
          >
            <div className="absolute inset-0 rounded-full opacity-50"
              style={{ boxShadow: "0 0 12px hsl(170 100% 45% / 0.6)" }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-primary" />
        <span className="text-lg font-semibold font-mono text-primary text-glow-teal">{energyLevel}%</span>
      </div>
    </div>
  );
}
