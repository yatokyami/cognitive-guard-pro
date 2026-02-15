import DashboardSidebar from "@/components/DashboardSidebar";
import CognitiveEnergyMeter from "@/components/CognitiveEnergyMeter";
import RadialGauge from "@/components/RadialGauge";
import { Bell, Search, User, Mail, Building2, Calendar, Activity, Brain, TrendingUp, Clock, Target, Award } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", load: 65 }, { day: "Tue", load: 72 }, { day: "Wed", load: 58 },
  { day: "Thu", load: 80 }, { day: "Fri", load: 45 },
];

const achievements = [
  { label: "Deep Work Streak", value: "5 days", icon: Target },
  { label: "Recovery Compliance", value: "92%", icon: Award },
  { label: "Avg. Focus Time", value: "3.2h/day", icon: Clock },
  { label: "Load Efficiency", value: "+12%", icon: TrendingUp },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs border border-border">
      <p className="font-medium text-foreground">{label}</p>
      <p className="font-mono text-primary">Load: {payload[0].value}%</p>
    </div>
  );
};

export default function UserProfile() {
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
          {/* Profile Header */}
          <div className="glass-card p-6 flex items-center gap-6 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-teal">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">Dr. Sarah Chen</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Senior Cognitive Systems Researcher</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Mail className="w-3.5 h-3.5" />s.chen@neuronet.ai</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Building2 className="w-3.5 h-3.5" />ML-Ops Team</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" />Joined Mar 2024</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
                <span className="text-sm font-medium text-success">Online · In Focus</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <div key={a.label} className="glass-card p-4 animate-fade-in" style={{ animationDelay: `${(i + 1) * 50}ms` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <a.icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="text-lg font-bold font-mono text-primary">{a.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.label}</p>
              </div>
            ))}
          </div>

          {/* Weekly Load */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7 glass-card p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
              <h3 className="text-sm font-semibold text-foreground mb-1">Weekly Cognitive Load</h3>
              <p className="text-xs text-muted-foreground mb-4">Your personal load trend this week</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="weeklyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(170 100% 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(170 100% 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225 25% 18%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={{ stroke: "hsl(225 25% 18%)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="load" stroke="hsl(170 100% 45%)" fill="url(#weeklyGrad)" strokeWidth={2} dot={{ fill: "hsl(170 100% 45%)", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="col-span-5 glass-card p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h3 className="text-sm font-semibold text-foreground mb-1">Cognitive Summary</h3>
              <p className="text-xs text-muted-foreground mb-4">Today's assessment</p>
              <div className="space-y-3">
                {[
                  { label: "Working Memory", value: 72, color: "primary" },
                  { label: "Attention Span", value: 65, color: "warning" },
                  { label: "Decision Quality", value: 80, color: "success" },
                  { label: "Task Switching", value: 45, color: "destructive" },
                  { label: "Creative Output", value: 70, color: "primary" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                      <span className={`text-xs font-mono text-${m.color}`}>{m.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full bg-${m.color}`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
