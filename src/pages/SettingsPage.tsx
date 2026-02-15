import DashboardSidebar from "@/components/DashboardSidebar";
import { Bell, Search, Save, Monitor, Moon, Sun, Sliders, BellRing, Database, ShieldCheck, Palette } from "lucide-react";

const sections = [
  {
    title: "Appearance",
    icon: Palette,
    settings: [
      { label: "Theme", description: "Choose between dark and light mode", type: "toggle", value: "Dark" },
      { label: "Accent Color", description: "Primary accent color for the interface", type: "text", value: "Teal (170°)" },
      { label: "Data Density", description: "Adjust information density on dashboards", type: "select", value: "Comfortable" },
    ],
  },
  {
    title: "Notifications",
    icon: BellRing,
    settings: [
      { label: "Burnout Alerts", description: "Notify when team risk exceeds threshold", type: "toggle", value: "Enabled" },
      { label: "Recovery Reminders", description: "Send recovery block suggestions", type: "toggle", value: "Enabled" },
      { label: "Weekly Reports", description: "Automated cognitive load summary emails", type: "toggle", value: "Disabled" },
    ],
  },
  {
    title: "ML Models",
    icon: Sliders,
    settings: [
      { label: "LSTM Forecast Horizon", description: "Number of days for burnout prediction", type: "text", value: "30 days" },
      { label: "K-Means Clusters", description: "Number of team clusters for analysis", type: "text", value: "12" },
      { label: "Decay Rate (λ)", description: "Default cognitive decay rate constant", type: "text", value: "0.034/hr" },
    ],
  },
  {
    title: "Privacy & Compliance",
    icon: ShieldCheck,
    settings: [
      { label: "Differential Privacy ε", description: "Privacy budget epsilon value", type: "text", value: "0.5" },
      { label: "Data Retention", description: "Raw data auto-purge interval", type: "text", value: "24 hours" },
      { label: "K-Anonymity Threshold", description: "Minimum cluster size for anonymization", type: "text", value: "k = 8" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="border-b border-border px-6 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Settings</h2>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Search className="w-4 h-4" /></button>
            <button className="relative w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" /><span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">System Configuration</h2>
            <p className="text-sm text-muted-foreground">Manage dashboard preferences, ML model parameters, and privacy settings</p>
          </div>

          {sections.map((section, si) => (
            <div key={section.title} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${si * 80}ms` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.settings.map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between rounded-lg bg-muted/20 p-3">
                    <div>
                      <p className="text-xs font-medium text-foreground">{setting.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{setting.description}</p>
                    </div>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-lg">{setting.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/15 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/25 transition-colors">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </main>
      </div>
    </div>
  );
}
