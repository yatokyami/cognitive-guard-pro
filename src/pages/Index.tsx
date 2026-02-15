import DashboardSidebar from "@/components/DashboardSidebar";
import CognitiveEnergyMeter from "@/components/CognitiveEnergyMeter";
import RadialGauge from "@/components/RadialGauge";
import FatigueHeatmap from "@/components/FatigueHeatmap";
import ContextAdvisor from "@/components/ContextAdvisor";
import DecayTaskList from "@/components/DecayTaskList";
import BurnoutForecast from "@/components/BurnoutForecast";
import SummaryCards from "@/components/SummaryCards";
import { Bell, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
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

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-4">
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

          {/* Bottom Section */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <BurnoutForecast />
            </div>
            <div className="col-span-5 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <SummaryCards />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
