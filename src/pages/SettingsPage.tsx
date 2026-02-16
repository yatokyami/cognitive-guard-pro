import DashboardLayout from "@/components/DashboardLayout";
import { Save, Sliders, BellRing, ShieldCheck, Palette } from "lucide-react";

const sections = [
  {
    title: "Appearance",
    icon: Palette,
    settings: [
      { label: "Theme", description: "Choose between dark and light mode", value: "Dark" },
      { label: "Accent Color", description: "Primary accent color for the interface", value: "Teal (170°)" },
      { label: "Data Density", description: "Adjust information density on dashboards", value: "Comfortable" },
    ],
  },
  {
    title: "Notifications",
    icon: BellRing,
    settings: [
      { label: "Burnout Alerts", description: "Notify when team risk exceeds threshold", value: "Enabled" },
      { label: "Recovery Reminders", description: "Send recovery block suggestions", value: "Enabled" },
      { label: "Weekly Reports", description: "Automated cognitive load summary emails", value: "Disabled" },
    ],
  },
  {
    title: "ML Models",
    icon: Sliders,
    settings: [
      { label: "LSTM Forecast Horizon", description: "Number of days for burnout prediction", value: "30 days" },
      { label: "K-Means Clusters", description: "Number of team clusters for analysis", value: "12" },
      { label: "Decay Rate (λ)", description: "Default cognitive decay rate constant", value: "0.034/hr" },
    ],
  },
  {
    title: "Privacy & Compliance",
    icon: ShieldCheck,
    settings: [
      { label: "Differential Privacy ε", description: "Privacy budget epsilon value", value: "0.5" },
      { label: "Data Retention", description: "Raw data auto-purge interval", value: "24 hours" },
      { label: "K-Anonymity Threshold", description: "Minimum cluster size for anonymization", value: "k = 8" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout showMetrics={false}>
      <div>
        <h2 className="text-base font-semibold text-foreground">System Configuration</h2>
        <p className="text-xs text-muted-foreground">Manage dashboard preferences, ML model parameters, and privacy settings</p>
      </div>

      {sections.map((section, si) => (
        <div key={section.title} className="glass-card p-4 animate-fade-in" style={{ animationDelay: `${si * 60}ms` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
              <section.icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
          </div>
          <div className="space-y-2">
            {section.settings.map((setting) => (
              <div key={setting.label} className="flex items-center justify-between rounded-lg bg-muted/20 p-2.5">
                <div>
                  <p className="text-xs font-medium text-foreground">{setting.label}</p>
                  <p className="text-[11px] text-muted-foreground">{setting.description}</p>
                </div>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-lg">{setting.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/25 transition-colors">
        <Save className="w-4 h-4" />
        Save Configuration
      </button>
    </DashboardLayout>
  );
}
