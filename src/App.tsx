import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CognitiveLoad from "./pages/CognitiveLoad";
import TeamClusters from "./pages/TeamClusters";
import PrivacyGuard from "./pages/PrivacyGuard";
import SettingsPage from "./pages/SettingsPage";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cognitive-load" element={<CognitiveLoad />} />
          <Route path="/team-clusters" element={<TeamClusters />} />
          <Route path="/privacy-guard" element={<PrivacyGuard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
