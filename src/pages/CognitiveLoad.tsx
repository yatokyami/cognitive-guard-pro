import DashboardSidebar from "@/components/DashboardSidebar";
import CognitiveEnergyMeter from "@/components/CognitiveEnergyMeter";
import RadialGauge from "@/components/RadialGauge";
import { Bell, Search, Brain, Activity, TrendingDown, Zap, Clock, BarChart3 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const hourlyLoad = [
  { hour: "8AM", load: 35 }, { hour: "9AM", load: 52 }, { hour: "10AM", load: 78 },
  { hour: "11AM", load: 85 }, { hour: "12PM", load: 60 }, { hour: "1PM", load: 45 },
  { hour: "2PM", load: 72 }, { hour: "3PM", load: 80 }, { hour: "4PM", load: 68 },
  { hour: "5PM", load: 42 }, { hour: "6PM", load: 28 },
];

const taskBreakdown = [
  { task: "Code Review", intrinsic: 45, extraneous: 20, germane: 35 },
  { task: "Design Sync", intrinsic: 30, extraneous: 40, germane: 30 },
  { task: "Sprint Plan", intrinsic: 55, extraneous: 25, germane: 20 },
  { task: "ML Pipeline", intrinsic: 70, extraneous: 15, germane: 15 },
  { task: "Docs", intrinsic: 20, extraneous: 35, germane: 45 },
];

const radarData = [
  { metric: "Working Memory", value: 72 },
  { metric: "Attention", value: 65 },
  { metric: "Processing Speed", value: 80 },
  { metric: "Task Switching", value: 45 },
  { metric: "Decision Fatigue", value: 58 },
  { metric: "Creative Output", value: 70 },
];

const metrics = [
  { label: "Avg. Cognitive Load", value: "62.4%", icon: Brain, accent: "primary" },
  { label: "Peak Load Today", value: "85%", icon: Activity, accent: "destructive" },
  { label: "Decay Rate (λ)", value: "0.034/hr", icon: TrendingDown, accent: "warning" },
  { label: "Recovery ETA", value: "2.5h", icon: Clock, accent: "success" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs border border-border">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="font-mono" style={{ color: p.color }}>
          {p.dataKey}: {p.value}%
        </p>
      ))}
    </div>
  );
};

export default function CognitiveLoad() {
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
            <button className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="relative w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Cognitive Load Analysis</h2>
            <p className="text-sm text-muted-foreground">Real-time cognitive load monitoring and decomposition</p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="glass-card p-4 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg bg-${m.accent}/15 flex items-center justify-center`}>
                    <m.icon className={`w-4 h-4 text-${m.accent}`} />
                  </div>
                </div>
                <p className={`text-xl font-bold font-mono text-${m.accent}`}>{m.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Hourly Load Timeline */}
            <div className="col-span-7 glass-card p-5 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Hourly Cognitive Load</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Today's load pattern</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-medium text-primary">Live</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={hourlyLoad} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(170 100% 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(170 100% 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225 25% 18%)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={{ stroke: "hsl(225 25% 18%)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="load" stroke="hsl(170 100% 45%)" fill="url(#loadGradient)" strokeWidth={2} dot={{ fill: "hsl(170 100% 45%)", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Cognitive Radar */}
            <div className="col-span-5 glass-card p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h3 className="text-sm font-semibold text-foreground mb-1">Cognitive Profile</h3>
              <p className="text-xs text-muted-foreground mb-3">Multi-dimensional assessment</p>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(225 25% 18%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar dataKey="value" stroke="hsl(170 100% 45%)" fill="hsl(170 100% 45%)" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Task Breakdown */}
          <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Cognitive Load Decomposition</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Intrinsic · Extraneous · Germane load per task</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">Intrinsic</span></span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-warning" /><span className="text-[10px] text-muted-foreground">Extraneous</span></span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-success" /><span className="text-[10px] text-muted-foreground">Germane</span></span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskBreakdown} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225 25% 18%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <YAxis type="category" dataKey="task" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="intrinsic" stackId="a" fill="hsl(170 100% 45%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="extraneous" stackId="a" fill="hsl(38 90% 55%)" />
                <Bar dataKey="germane" stackId="a" fill="hsl(155 70% 45%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
