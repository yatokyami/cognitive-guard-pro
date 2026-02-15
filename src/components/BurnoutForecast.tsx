import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

const data = [
  { month: "Jan 1", risk: 32, prediction: null },
  { month: "Jan 15", risk: 38, prediction: null },
  { month: "Feb 1", risk: 45, prediction: null },
  { month: "Feb 10", risk: 52, prediction: null },
  { month: "Feb 18", risk: 61, prediction: 61 },
  { month: "Feb 25", risk: null, prediction: 68 },
  { month: "Mar 1", risk: null, prediction: 78 },
  { month: "Mar 8", risk: null, prediction: 85 },
  { month: "Mar 12", risk: null, prediction: 82 },
  { month: "Mar 18", risk: null, prediction: 73 },
  { month: "Mar 25", risk: null, prediction: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs border border-border">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="font-mono" style={{ color: p.color }}>
          {p.dataKey === "risk" ? "Actual" : "Predicted"}: {p.value}%
        </p>
      ))}
    </div>
  );
};

export default function BurnoutForecast() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Burnout Risk Forecast</h3>
          <p className="text-xs text-muted-foreground mt-0.5">LSTM Prediction Model · Jan–Mar</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">Actual</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-destructive" style={{ borderStyle: "dashed" }} />
            <span className="text-[10px] text-muted-foreground">Predicted</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(170 100% 45%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(170 100% 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(348 75% 60%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(348 75% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(225 25% 18%)" />
          <XAxis
            dataKey="month" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }}
            axisLine={{ stroke: "hsl(225 25% 18%)" }} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }}
            axisLine={false} tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={70} stroke="hsl(348 75% 60% / 0.4)" strokeDasharray="4 4" label={{
            value: "High Risk Threshold",
            position: "insideTopRight",
            style: { fontSize: 9, fill: "hsl(348 75% 60%)" }
          }} />
          <ReferenceArea x1="Mar 1" x2="Mar 12" fill="hsl(348 75% 60% / 0.06)" />
          <Area
            type="monotone" dataKey="risk" stroke="hsl(170 100% 45%)"
            fill="url(#riskGradient)" strokeWidth={2}
            dot={{ fill: "hsl(170 100% 45%)", r: 3, strokeWidth: 0 }}
            connectNulls={false}
          />
          <Area
            type="monotone" dataKey="prediction" stroke="hsl(348 75% 60%)"
            fill="url(#predictionGradient)" strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ fill: "hsl(348 75% 60%)", r: 3, strokeWidth: 0 }}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
