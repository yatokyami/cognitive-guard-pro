import DashboardLayout from "@/components/DashboardLayout";
import { useView } from "@/contexts/ViewContext";
import FatigueHeatmap from "@/components/FatigueHeatmap";
import ContextAdvisor from "@/components/ContextAdvisor";
import DecayTaskList from "@/components/DecayTaskList";
import BurnoutForecast from "@/components/BurnoutForecast";
import SummaryCards from "@/components/SummaryCards";

const viewTitles: Record<string, { title: string; subtitle: string }> = {
  academic: { title: "Academic Research Lab", subtitle: "Faculty & graduate researcher cognitive monitoring" },
  industrial: { title: "Industrial Operations", subtitle: "Employee productivity & wellbeing tracking" },
  government: { title: "Government Services", subtitle: "Public sector workforce management" },
};

const Index = () => {
  const { viewMode } = useView();
  const info = viewTitles[viewMode];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">{info.title}</h2>
          <p className="text-xs text-muted-foreground">{info.subtitle}</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground bg-accent px-2 py-1 rounded-lg capitalize">{viewMode} mode</span>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-4 animate-fade-in">
          <FatigueHeatmap />
        </div>
        <div className="col-span-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <ContextAdvisor />
        </div>
        <div className="col-span-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <DecayTaskList />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <BurnoutForecast />
        </div>
        <div className="col-span-5 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <SummaryCards />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
