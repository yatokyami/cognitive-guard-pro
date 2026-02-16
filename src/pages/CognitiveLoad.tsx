import DashboardLayout from "@/components/DashboardLayout";
import { useView } from "@/contexts/ViewContext";
import { Brain, Activity, TrendingDown, Clock, Zap } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const viewData: Record<string, { hourly: { hour: string; load: number }[]; tasks: any[]; radar: any[]; metrics: any[] }> = {
  academic: {
    hourly: [
      { hour: "8AM", load: 35 }, { hour: "9AM", load: 52 }, { hour: "10AM", load: 78 },
      { hour: "11AM", load: 85 }, { hour: "12PM", load: 60 }, { hour: "1PM", load: 45 },
      { hour: "2PM", load: 72 }, { hour: "3PM", load: 80 }, { hour: "4PM", load: 68 },
      { hour: "5PM", load: 42 }, { hour: "6PM", load: 28 },
    ],
    tasks: [
      { task: "Thesis Review", intrinsic: 55, extraneous: 15, germane: 30 },
      { task: "Lab Meeting", intrinsic: 30, extraneous: 40, germane: 30 },
      { task: "Grant Writing", intrinsic: 70, extraneous: 10, germane: 20 },
      { task: "Data Analysis", intrinsic: 65, extraneous: 20, germane: 15 },
      { task: "Lecture Prep", intrinsic: 40, extraneous: 25, germane: 35 },
    ],
    radar: [
      { metric: "Working Memory", value: 72 }, { metric: "Attention", value: 65 },
      { metric: "Processing Speed", value: 80 }, { metric: "Task Switching", value: 45 },
      { metric: "Decision Fatigue", value: 58 }, { metric: "Creative Output", value: 70 },
    ],
    metrics: [
      { label: "Avg. Cognitive Load", value: "62.4%", icon: Brain, accent: "primary" },
      { label: "Peak Load Today", value: "85%", icon: Activity, accent: "destructive" },
      { label: "Decay Rate (λ)", value: "0.034/hr", icon: TrendingDown, accent: "warning" },
      { label: "Recovery ETA", value: "2.5h", icon: Clock, accent: "success" },
    ],
  },
  industrial: {
    hourly: [
      { hour: "6AM", load: 25 }, { hour: "7AM", load: 40 }, { hour: "8AM", load: 55 },
      { hour: "9AM", load: 72 }, { hour: "10AM", load: 88 }, { hour: "11AM", load: 90 },
      { hour: "12PM", load: 65 }, { hour: "1PM", load: 58 }, { hour: "2PM", load: 76 },
      { hour: "3PM", load: 82 }, { hour: "4PM", load: 70 }, { hour: "5PM", load: 45 },
    ],
    tasks: [
      { task: "Quality Inspection", intrinsic: 60, extraneous: 20, germane: 20 },
      { task: "Shift Handover", intrinsic: 25, extraneous: 45, germane: 30 },
      { task: "Equipment Calibration", intrinsic: 75, extraneous: 10, germane: 15 },
      { task: "Safety Audit", intrinsic: 50, extraneous: 30, germane: 20 },
      { task: "Production Report", intrinsic: 35, extraneous: 35, germane: 30 },
    ],
    radar: [
      { metric: "Reaction Time", value: 78 }, { metric: "Vigilance", value: 60 },
      { metric: "Motor Control", value: 85 }, { metric: "Task Switching", value: 55 },
      { metric: "Stress Response", value: 42 }, { metric: "Endurance", value: 68 },
    ],
    metrics: [
      { label: "Avg. Cognitive Load", value: "71.2%", icon: Brain, accent: "primary" },
      { label: "Peak Load Today", value: "90%", icon: Activity, accent: "destructive" },
      { label: "Decay Rate (λ)", value: "0.042/hr", icon: TrendingDown, accent: "warning" },
      { label: "Recovery ETA", value: "1.8h", icon: Clock, accent: "success" },
    ],
  },
  government: {
    hourly: [
      { hour: "9AM", load: 30 }, { hour: "10AM", load: 48 }, { hour: "11AM", load: 62 },
      { hour: "12PM", load: 55 }, { hour: "1PM", load: 38 }, { hour: "2PM", load: 50 },
      { hour: "3PM", load: 65 }, { hour: "4PM", load: 58 }, { hour: "5PM", load: 35 },
    ],
    tasks: [
      { task: "Policy Review", intrinsic: 45, extraneous: 30, germane: 25 },
      { task: "Citizen Inquiries", intrinsic: 30, extraneous: 45, germane: 25 },
      { task: "Report Filing", intrinsic: 55, extraneous: 25, germane: 20 },
      { task: "Inter-Agency Sync", intrinsic: 40, extraneous: 35, germane: 25 },
      { task: "Training Module", intrinsic: 25, extraneous: 20, germane: 55 },
    ],
    radar: [
      { metric: "Working Memory", value: 65 }, { metric: "Attention", value: 70 },
      { metric: "Processing Speed", value: 62 }, { metric: "Task Switching", value: 58 },
      { metric: "Decision Fatigue", value: 50 }, { metric: "Compliance Focus", value: 82 },
    ],
    metrics: [
      { label: "Avg. Cognitive Load", value: "49.8%", icon: Brain, accent: "primary" },
      { label: "Peak Load Today", value: "65%", icon: Activity, accent: "warning" },
      { label: "Decay Rate (λ)", value: "0.021/hr", icon: TrendingDown, accent: "success" },
      { label: "Recovery ETA", value: "3.1h", icon: Clock, accent: "success" },
    ],
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs border border-border">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="font-mono" style={{ color: p.color }}>{p.dataKey}: {p.value}%</p>
      ))}
    </div>
  );
};

export default function CognitiveLoad() {
  const { viewMode } = useView();
  const data = viewData[viewMode];

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-base font-semibold text-foreground">Cognitive Load Analysis</h2>
        <p className="text-xs text-muted-foreground">Real-time cognitive load monitoring · <span className="capitalize">{viewMode}</span> view</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {data.metrics.map((m) => (
          <div key={m.label} className="glass-card p-3 animate-fade-in">
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-8 h-8 rounded-lg bg-${m.accent}/15 flex items-center justify-center`}>
                <m.icon className={`w-4 h-4 text-${m.accent}`} />
              </div>
            </div>
            <p className={`text-lg font-bold font-mono text-${m.accent}`}>{m.value}</p>
            <p className="text-[11px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 glass-card p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Hourly Cognitive Load</h3>
              <p className="text-[11px] text-muted-foreground">Today's load pattern</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-primary">Live</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data.hourly} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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

        <div className="col-span-5 glass-card p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-sm font-semibold text-foreground mb-0.5">Cognitive Profile</h3>
          <p className="text-[11px] text-muted-foreground mb-2">Multi-dimensional assessment</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={data.radar}>
              <PolarGrid stroke="hsl(225 25% 18%)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "hsl(215 20% 55%)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="hsl(170 100% 45%)" fill="hsl(170 100% 45%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Cognitive Load Decomposition</h3>
            <p className="text-[11px] text-muted-foreground">Intrinsic · Extraneous · Germane load per task</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">Intrinsic</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-warning" /><span className="text-[10px] text-muted-foreground">Extraneous</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-success" /><span className="text-[10px] text-muted-foreground">Germane</span></span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data.tasks} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(225 25% 18%)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis type="category" dataKey="task" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} tickLine={false} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="intrinsic" stackId="a" fill="hsl(170 100% 45%)" />
            <Bar dataKey="extraneous" stackId="a" fill="hsl(38 90% 55%)" />
            <Bar dataKey="germane" stackId="a" fill="hsl(155 70% 45%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
