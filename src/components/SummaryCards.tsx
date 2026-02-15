import { TrendingUp, Dna, ShieldCheck, ArrowUpRight, Eye, RotateCcw } from "lucide-react";

const cards = [
  {
    title: "Predictive Risk Detection",
    value: "87.3%",
    subtitle: "Model Accuracy (F1-Score)",
    trend: "+2.1%",
    icon: TrendingUp,
    accent: "primary",
  },
  {
    title: "GA Schedule Optimization",
    value: "34.7%",
    subtitle: "Cognitive Load Reduction",
    trend: "+8.4%",
    icon: Dna,
    accent: "success",
  },
  {
    title: "Privacy Compliance",
    value: "100%",
    subtitle: "Differential Privacy Active",
    trend: "Verified",
    icon: ShieldCheck,
    accent: "primary",
  },
];

const accentMap: Record<string, { bg: string; text: string; glow: string }> = {
  primary: { bg: "bg-primary/15", text: "text-primary", glow: "text-glow-teal" },
  success: { bg: "bg-success/15", text: "text-success", glow: "" },
};

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => {
        const a = accentMap[card.accent] || accentMap.primary;
        return (
          <div key={card.title} className="glass-card-hover p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${a.bg} flex items-center justify-center`}>
                <card.icon className={`w-4.5 h-4.5 ${a.text}`} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-success">
                <ArrowUpRight className="w-3 h-3" />
                {card.trend}
              </span>
            </div>
            <p className={`text-2xl font-bold font-mono ${a.text} ${a.glow}`}>{card.value}</p>
            <p className="text-xs font-medium text-foreground mt-1">{card.title}</p>
            <p className="text-[11px] text-muted-foreground">{card.subtitle}</p>
          </div>
        );
      })}

      {/* Action buttons row */}
      <div className="col-span-3 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-all">
          <Eye className="w-4 h-4" />
          View Full Load Details
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-warning/10 border border-warning/20 text-sm font-medium text-warning hover:bg-warning/20 transition-all">
          <RotateCcw className="w-4 h-4" />
          Trigger Recovery Block
        </button>
      </div>
    </div>
  );
}
