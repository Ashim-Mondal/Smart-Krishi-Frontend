import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Wholesaler } from "../types";
import { currentUser as defaultUser } from "../data/mockData";

interface AppContextValue {
  profile: Wholesaler;
  updateProfile: (updates: Partial<Wholesaler>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Wholesaler>(defaultUser);

  const updateProfile = (updates: Partial<Wholesaler>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const value = useMemo(() => ({ profile, updateProfile }), [profile]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
