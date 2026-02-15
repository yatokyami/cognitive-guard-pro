import DashboardSidebar from "@/components/DashboardSidebar";
import CognitiveEnergyMeter from "@/components/CognitiveEnergyMeter";
import RadialGauge from "@/components/RadialGauge";
import { Bell, Search, Shield, Users, AlertTriangle, ArrowUpRight, Network } from "lucide-react";

const teams = [
  { name: "Eng-A", members: 8, risk: 0.2, load: 42, lead: "M. Torres", status: "stable" },
  { name: "Eng-B", members: 6, risk: 0.45, load: 58, lead: "K. Patel", status: "moderate" },
  { name: "Design", members: 5, risk: 0.8, load: 82, lead: "L. Zhang", status: "critical" },
  { name: "Ops", members: 7, risk: 0.15, load: 35, lead: "R. Singh", status: "stable" },
  { name: "Research", members: 4, risk: 0.65, load: 71, lead: "A. Moreau", status: "warning" },
  { name: "QA", members: 6, risk: 0.3, load: 48, lead: "J. Kim", status: "stable" },
  { name: "ML-Ops", members: 3, risk: 0.9, load: 88, lead: "S. Chen", status: "critical" },
  { name: "DevRel", members: 4, risk: 0.1, load: 28, lead: "T. Okafor", status: "stable" },
  { name: "PM", members: 5, risk: 0.55, load: 64, lead: "N. Rivera", status: "moderate" },
  { name: "Data", members: 6, risk: 0.35, load: 50, lead: "C. Lee", status: "stable" },
  { name: "Infra", members: 4, risk: 0.72, load: 76, lead: "V. Petrov", status: "warning" },
  { name: "Sales", members: 8, risk: 0.25, load: 40, lead: "D. Brown", status: "stable" },
];

function getStatusStyles(status: string) {
  if (status === "critical") return { bg: "bg-destructive/15", border: "border-destructive/30", badge: "bg-destructive/20 text-destructive", dot: "bg-destructive" };
  if (status === "warning") return { bg: "bg-warning/10", border: "border-warning/25", badge: "bg-warning/20 text-warning", dot: "bg-warning" };
  if (status === "moderate") return { bg: "bg-warning/5", border: "border-warning/15", badge: "bg-warning/15 text-warning", dot: "bg-warning" };
  return { bg: "bg-success/5", border: "border-success/15", badge: "bg-success/20 text-success", dot: "bg-success" };
}

export default function TeamClusters() {
  const criticalCount = teams.filter(t => t.status === "critical").length;
  const warningCount = teams.filter(t => t.status === "warning" || t.status === "moderate").length;

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="border-b border-border px-6 py-3 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4">
            <CognitiveEnergyMeter />
            <RadialGauge />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Search className="w-4 h-4" /></button>
            <button className="relative w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" /><span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Team Clusters</h2>
              <p className="text-sm text-muted-foreground">K-Means cluster analysis across all teams</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Shield className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Anonymized</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-card p-4 animate-fade-in">
              <p className="text-xs text-muted-foreground">Total Teams</p>
              <p className="text-2xl font-bold font-mono text-primary mt-1">{teams.length}</p>
            </div>
            <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
              <p className="text-xs text-muted-foreground">Total Members</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{teams.reduce((s, t) => s + t.members, 0)}</p>
            </div>
            <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <p className="text-xs text-muted-foreground">Critical Clusters</p>
              <p className="text-2xl font-bold font-mono text-destructive mt-1">{criticalCount}</p>
            </div>
            <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
              <p className="text-xs text-muted-foreground">At-Risk Clusters</p>
              <p className="text-2xl font-bold font-mono text-warning mt-1">{warningCount}</p>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-3 gap-4">
            {teams.map((team, i) => {
              const s = getStatusStyles(team.status);
              return (
                <div key={team.name} className={`glass-card-hover p-4 ${s.border} border animate-fade-in`} style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      <h4 className="text-sm font-semibold text-foreground">{team.name}</h4>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.badge} capitalize`}>{team.status}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Burnout Risk</span>
                      <span className="font-mono text-foreground">{Math.round(team.risk * 100)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${team.risk >= 0.7 ? "bg-destructive" : team.risk >= 0.4 ? "bg-warning" : "bg-success"}`} style={{ width: `${team.risk * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Avg Load</span>
                      <span className="font-mono text-foreground">{team.load}%</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{team.members} members</span>
                      <span className="text-[11px] text-muted-foreground">{team.lead}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
