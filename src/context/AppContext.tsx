import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Wholesaler, DailyMarketPrice, ProductList } from "../types";
import { currentUser as defaultUser } from "../data/mockData";
import {
  getDailyMarketPrices,
  getProductList,
} from "../services/dailyMarketPriceService";

interface AppContextValue {
  profile: Wholesaler;
  updateProfile: (updates: Partial<Wholesaler>) => void;

  dailyMarketPrices: DailyMarketPrice[];
  productList: ProductList[];
  marketPricesLoading: boolean;
  marketPricesError: string;
  refreshMarketPrices: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(defaultUser);

  const [dailyMarketPrices, setDailyMarketPrices] = useState<
    DailyMarketPrice[]
  >([]);

  const [productList, setProductList] = useState<ProductList[]>([]);

  const [marketPricesLoading, setMarketPricesLoading] = useState(true);

  const [marketPricesError, setMarketPricesError] = useState("");

  const updateProfile = (updates: Partial<Wholesaler>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const refreshMarketPrices = async () => {
    try {
      setMarketPricesLoading(true);
      setMarketPricesError("");

      const [priceData, productData] = await Promise.all([
        getDailyMarketPrices(),
        getProductList(),
      ]);

      setDailyMarketPrices(priceData);
      setProductList(productData);
    } catch (error) {
      console.error("Failed to load market price data:", error);
      setMarketPricesError("Unable to load market price data.");
    } finally {
      setMarketPricesLoading(false);
    }
  };

  useEffect(() => {
    refreshMarketPrices();
  }, []);

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      dailyMarketPrices,
      productList,
      marketPricesLoading,
      marketPricesError,
      refreshMarketPrices,
    }),
    [
      profile,
      dailyMarketPrices,
      productList,
      marketPricesLoading,
      marketPricesError,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return ctx;
}
