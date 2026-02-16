import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import CognitiveEnergyMeter from "@/components/CognitiveEnergyMeter";
import RadialGauge from "@/components/RadialGauge";
import { Bell, Search, X, Check, AlertTriangle, Info, BrainCircuit, Calendar, Shield } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, type: "critical", title: "ML-Ops cluster burnout risk at 90%", time: "2m ago", read: false, icon: AlertTriangle },
  { id: 2, type: "warning", title: "Design team cognitive load above threshold", time: "15m ago", read: false, icon: BrainCircuit },
  { id: 3, type: "info", title: "Weekly compliance report generated", time: "1h ago", read: true, icon: Shield },
  { id: 4, type: "info", title: "Sprint-14 deadline shift approved", time: "2h ago", read: true, icon: Calendar },
  { id: 5, type: "warning", title: "Infra team decay rate increasing", time: "3h ago", read: true, icon: AlertTriangle },
];

const searchItems = [
  { label: "Dashboard", path: "/", group: "Pages" },
  { label: "Cognitive Load Analysis", path: "/cognitive-load", group: "Pages" },
  { label: "Team Clusters", path: "/team-clusters", group: "Pages" },
  { label: "Privacy Guard", path: "/privacy-guard", group: "Pages" },
  { label: "Settings", path: "/settings", group: "Pages" },
  { label: "User Profile", path: "/profile", group: "Pages" },
  { label: "Burnout Forecast", path: "/", group: "Widgets" },
  { label: "Fatigue Heatmap", path: "/", group: "Widgets" },
  { label: "Context Advisor", path: "/", group: "Widgets" },
  { label: "ML-Ops Team", path: "/team-clusters", group: "Teams" },
  { label: "Design Team", path: "/team-clusters", group: "Teams" },
  { label: "Research Team", path: "/team-clusters", group: "Teams" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  showMetrics?: boolean;
}

export default function DashboardLayout({ children, showMetrics = true }: DashboardLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const navigate = useNavigate();
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })));

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="border-b border-border px-4 py-2 flex items-center gap-3">
          {showMetrics && (
            <div className="flex-1 flex items-center gap-3">
              <CognitiveEnergyMeter />
              <RadialGauge />
            </div>
          )}
          {!showMetrics && <div className="flex-1" />}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background" />
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 glass-card border border-border z-50 animate-scale-in overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                      <span className="text-xs font-semibold text-foreground">Notifications</span>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-[10px] text-primary hover:underline">
                            Mark all read
                          </button>
                        )}
                        <button onClick={() => setNotifOpen(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifs.map((n) => (
                        <div
                          key={n.id}
                          className={`flex items-start gap-2.5 px-3 py-2.5 border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer ${!n.read ? "bg-primary/5" : ""}`}
                          onClick={() => setNotifs(notifs.map((nn) => nn.id === n.id ? { ...nn, read: true } : nn))}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            n.type === "critical" ? "bg-destructive/15" : n.type === "warning" ? "bg-warning/15" : "bg-primary/10"
                          }`}>
                            <n.icon className={`w-3 h-3 ${
                              n.type === "critical" ? "text-destructive" : n.type === "warning" ? "text-warning" : "text-primary"
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-tight ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.title}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                          </div>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          {children}
        </main>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search pages, teams, widgets..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {["Pages", "Widgets", "Teams"].map((group) => (
            <CommandGroup key={group} heading={group}>
              {searchItems
                .filter((i) => i.group === group)
                .map((item) => (
                  <CommandItem
                    key={item.label}
                    onSelect={() => {
                      navigate(item.path);
                      setSearchOpen(false);
                    }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
