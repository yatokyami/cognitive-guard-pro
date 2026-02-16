import { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "academic" | "industrial" | "government";
type Profile = "manager" | "individual";

interface ViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const ViewContext = createContext<ViewContextType | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("academic");
  const [profile, setProfile] = useState<Profile>("manager");

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode, profile, setProfile }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within ViewProvider");
  return ctx;
}
