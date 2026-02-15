import DashboardSidebar from "@/components/DashboardSidebar";
import CognitiveEnergyMeter from "@/components/CognitiveEnergyMeter";
import RadialGauge from "@/components/RadialGauge";
import { Bell, Search, Shield, ShieldCheck, Lock, Eye, EyeOff, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

const policies = [
  { name: "Differential Privacy", status: "active", description: "ε = 0.5, δ = 10⁻⁵ noise injection on all biometric signals", icon: Lock },
  { name: "K-Anonymity", status: "active", description: "k = 8 minimum cluster size enforced across all team views", icon: Shield },
  { name: "Data Minimization", status: "active", description: "Only aggregated metrics retained; raw data purged after 24h", icon: EyeOff },
  { name: "Consent Management", status: "active", description: "All participants opted-in with revocable consent tokens", icon: FileCheck },
];

const auditLog = [
  { time: "2 min ago", event: "Privacy audit completed", severity: "info", detail: "All 12 clusters meet k-anonymity threshold" },
  { time: "15 min ago", event: "Noise calibration updated", severity: "info", detail: "ε adjusted from 0.6 to 0.5 for stricter privacy" },
  { time: "1h ago", event: "Access request denied", severity: "warning", detail: "Unauthorized query for individual-level data blocked" },
  { time: "3h ago", event: "Data retention purge", severity: "info", detail: "Raw biometric data older than 24h successfully purged" },
  { time: "6h ago", event: "New consent registered", severity: "info", detail: "3 new participants opted in with consent tokens" },
  { time: "1d ago", event: "Compliance report generated", severity: "info", detail: "Monthly GDPR compliance report auto-generated" },
];

export default function PrivacyGuard() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="border-b border-border px-6 py-3 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-4"><CognitiveEnergyMeter /><RadialGauge /></div>
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
              <h2 className="text-lg font-semibold text-foreground">Privacy Guard</h2>
              <p className="text-sm text-muted-foreground">Data protection policies and compliance monitoring</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="text-xs font-medium text-success">All Systems Compliant</span>
            </div>
          </div>

          {/* Compliance Score */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-5 text-center animate-fade-in">
              <p className="text-xs text-muted-foreground mb-2">Privacy Score</p>
              <p className="text-4xl font-bold font-mono text-success text-glow-teal">100%</p>
              <p className="text-[11px] text-muted-foreground mt-1">All policies active</p>
            </div>
            <div className="glass-card p-5 text-center animate-fade-in" style={{ animationDelay: "50ms" }}>
              <p className="text-xs text-muted-foreground mb-2">Data Anonymized</p>
              <p className="text-4xl font-bold font-mono text-primary">12/12</p>
              <p className="text-[11px] text-muted-foreground mt-1">Clusters protected</p>
            </div>
            <div className="glass-card p-5 text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
              <p className="text-xs text-muted-foreground mb-2">Access Violations</p>
              <p className="text-4xl font-bold font-mono text-foreground">1</p>
              <p className="text-[11px] text-muted-foreground mt-1">Blocked in last 24h</p>
            </div>
          </div>

          {/* Policies */}
          <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <h3 className="text-sm font-semibold text-foreground mb-4">Active Privacy Policies</h3>
            <div className="grid grid-cols-2 gap-3">
              {policies.map((p) => (
                <div key={p.name} className="rounded-lg bg-muted/30 border border-border/50 p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                      <span className="flex items-center gap-1 text-[10px] font-medium text-success bg-success/15 px-1.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Active
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="text-sm font-semibold text-foreground mb-4">Audit Log</h3>
            <div className="space-y-2">
              {auditLog.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-muted/20 p-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${entry.severity === "warning" ? "bg-warning/15" : "bg-primary/10"}`}>
                    {entry.severity === "warning" ? <AlertTriangle className="w-3 h-3 text-warning" /> : <CheckCircle2 className="w-3 h-3 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{entry.event}</span>
                      <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
