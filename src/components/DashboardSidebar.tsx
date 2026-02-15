import { useState } from "react";
import {
  Brain,
  LayoutDashboard,
  Users,
  Activity,
  Shield,
  Settings,
  ChevronDown,
  GraduationCap,
  Building2,
  Landmark,
  User,
  UserCog,
} from "lucide-react";

const viewModes = [
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "industrial", label: "Industrial", icon: Building2 },
  { id: "government", label: "General / Gov", icon: Landmark },
] as const;

const profiles = [
  { id: "manager", label: "Manager / Admin", icon: UserCog },
  { id: "individual", label: "Individual / User", icon: User },
] as const;

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Activity, label: "Cognitive Load" },
  { icon: Users, label: "Team Clusters" },
  { icon: Shield, label: "Privacy Guard" },
  { icon: Settings, label: "Settings" },
];

export default function DashboardSidebar() {
  const [viewMode, setViewMode] = useState<string>("academic");
  const [profile, setProfile] = useState<string>("manager");
  const [viewOpen, setViewOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const currentView = viewModes.find((v) => v.id === viewMode)!;
  const currentProfile = profiles.find((p) => p.id === profile)!;

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-teal">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground tracking-tight">NeuroNet</h1>
          <p className="text-[10px] text-muted-foreground font-mono">ML-DRIVEN COGNITIVE</p>
        </div>
      </div>

      {/* Route Switcher */}
      <div className="px-3 pt-4 pb-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-2">Context View</p>
        <div className="relative">
          <button
            onClick={() => setViewOpen(!viewOpen)}
            className="w-full glass-card px-3 py-2.5 flex items-center justify-between text-sm text-foreground hover:border-primary/20 transition-colors"
          >
            <span className="flex items-center gap-2">
              <currentView.icon className="w-4 h-4 text-primary" />
              {currentView.label}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${viewOpen ? "rotate-180" : ""}`} />
          </button>
          {viewOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 glass-card border border-border z-50 py-1 animate-scale-in">
              {viewModes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { setViewMode(v.id); setViewOpen(false); }}
                  className={`w-full px-3 py-2 flex items-center gap-2 text-sm transition-colors ${
                    v.id === viewMode ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <v.icon className="w-4 h-4" />
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Toggle */}
      <div className="px-3 pb-3">
        <div className="flex gap-1 p-1 glass-card">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setProfile(p.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                p.id === profile
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <p.icon className="w-3.5 h-3.5" />
              {p.id === "manager" ? "Admin" : "User"}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              activeNav === item.label
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom Status */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="glass-card px-3 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <currentProfile.icon className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {profile === "manager" ? "Dr. Sarah Chen" : "Alex Rivera"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {currentView.label} · {currentProfile.label}
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
        </div>
      </div>
    </aside>
  );
}
