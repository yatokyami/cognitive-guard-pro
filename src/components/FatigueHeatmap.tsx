import { Shield } from "lucide-react";

const clusters = [
  { id: 1, risk: 0.2, label: "Eng-A" },
  { id: 2, risk: 0.45, label: "Eng-B" },
  { id: 3, risk: 0.8, label: "Design" },
  { id: 4, risk: 0.15, label: "Ops" },
  { id: 5, risk: 0.65, label: "Research" },
  { id: 6, risk: 0.3, label: "QA" },
  { id: 7, risk: 0.9, label: "ML-Ops" },
  { id: 8, risk: 0.1, label: "DevRel" },
  { id: 9, risk: 0.55, label: "PM" },
  { id: 10, risk: 0.35, label: "Data" },
  { id: 11, risk: 0.72, label: "Infra" },
  { id: 12, risk: 0.25, label: "Sales" },
];

function getColor(risk: number) {
  if (risk >= 0.7) return { bg: "bg-destructive/30", border: "border-destructive/40", text: "text-destructive" };
  if (risk >= 0.4) return { bg: "bg-warning/20", border: "border-warning/30", text: "text-warning" };
  return { bg: "bg-success/20", border: "border-success/30", text: "text-success" };
}

export default function FatigueHeatmap() {
  return (
    <div className="glass-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Fatigue Heatmap</h3>
          <p className="text-xs text-muted-foreground mt-0.5">K-Means Team Clusters</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Shield className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Anonymized Data</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {clusters.map((c) => {
          const colors = getColor(c.risk);
          return (
            <div
              key={c.id}
              className={`relative ${colors.bg} ${colors.border} border rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 cursor-pointer group`}
            >
              {/* Hex-style shape overlay */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: c.risk >= 0.7 ? "inset 0 0 20px hsl(348 75% 60% / 0.15)" : c.risk >= 0.4 ? "inset 0 0 20px hsl(38 90% 55% / 0.1)" : "inset 0 0 20px hsl(155 70% 45% / 0.1)" }}
              />
              <span className={`text-lg font-bold font-mono ${colors.text}`}>
                {Math.round(c.risk * 100)}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">{c.label}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-success" />
          <span className="text-[10px] text-muted-foreground">Stable (&lt;40)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-warning" />
          <span className="text-[10px] text-muted-foreground">Moderate (40-70)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-destructive" />
          <span className="text-[10px] text-muted-foreground">High Risk (&gt;70)</span>
        </div>
      </div>
    </div>
  );
}
