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
  getDailyMarketPricesOriginal,
} from "../services/dailyMarketPriceService";

import { getProductNames } from "../services/productListService";

import { getAllUsers } from "../services/userService";

/*
 * Product belonging to a wholesaler
 * with its corresponding daily market price.
 */
type WholesalerProduct = ProductList & {
  dailyPrice?: DailyMarketPrice;
};

type WholesalerWithProducts = Wholesaler & {
  products: WholesalerProduct[];
};

interface AppContextValue {
  profile: Wholesaler;
  updateProfile: (updates: Partial<Wholesaler>) => void;

  dailyMarketPrices: DailyMarketPrice[];

  // Original daily market prices
  dailyMarketPricesOriginal: DailyMarketPrice[];

  productList: ProductList[];

  // Product names from backend
  productNames: string[];

  // Only Wholesaler users with their own products
  wholesalers: WholesalerWithProducts[];

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

  const [dailyMarketPricesOriginal, setDailyMarketPricesOriginal] = useState<
    DailyMarketPrice[]
  >([]);

  const [productList, setProductList] = useState<ProductList[]>([]);

  const [productNames, setProductNames] = useState<string[]>([]);

  // Wholesalers from backend
  const [wholesalers, setWholesalers] = useState<WholesalerWithProducts[]>([]);

  const [marketPricesLoading, setMarketPricesLoading] = useState(true);

  const [marketPricesError, setMarketPricesError] = useState("");

  const updateProfile = (updates: Partial<Wholesaler>) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const refreshMarketPrices = async () => {
    try {
      setMarketPricesLoading(true);
      setMarketPricesError("");

      const [
        priceData,
        originalPriceData,
        productData,
        productNameData,
        userData,
      ] = await Promise.all([
        getDailyMarketPrices(),
        getDailyMarketPricesOriginal(),
        getProductList(),
        getProductNames(),
        getAllUsers(),
      ]);

      // -----------------------------------------
      // Store original application data
      // -----------------------------------------

      setDailyMarketPrices(priceData);

      setDailyMarketPricesOriginal(originalPriceData);

      setProductList(productData);

      setProductNames(productNameData);

      // console.log("Product Data:", productData);

      // console.log("Daily Market Prices:", originalPriceData);

      // -----------------------------------------
      // Only Wholesaler users
      // -----------------------------------------

      const wholesellerUsers = userData.filter(
        (user) => user.role?.toLowerCase() === "wholesaler",
      );

      // console.log("Wholesaler Users:", wholesellerUsers);

      // -----------------------------------------
      // Attach products to each wholesaler
      // sellerId.id === user.id
      // -----------------------------------------

      const wholesalersWithProducts = wholesellerUsers.map((user) => {
        const sellerProducts = productData.filter(
          (product) => String(product.sellerId?.id) === String(user.id),
        );

        console.log(`Products for seller ${user.id}:`, sellerProducts);
        console.log(`Original Price Data:`, originalPriceData);

        // -----------------------------------------
        // Attach daily market price to product
        //
        // product.id === dailyPrice.productId
        // -----------------------------------------

        const productsWithDailyPrice = sellerProducts.map((product) => {
          const dailyPrice = originalPriceData.find(
            (price) => String(price.productId) === String(product.id),
          );

          // console.log("Product:", product.productName);

          // console.log("Product ID:", product.id);

          // console.log("Daily Price:", dailyPrice);

          return {
            ...product,
            dailyPrice,
          };
        });

        return {
          ...user,
          products: productsWithDailyPrice,
        };
      });

      // console.log("Wholesalers with Products:", wholesalersWithProducts);

      setWholesalers(wholesalersWithProducts);
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
      dailyMarketPricesOriginal,

      productList,
      productNames,

      wholesalers,

      marketPricesLoading,
      marketPricesError,

      refreshMarketPrices,
    }),
    [
      profile,
      dailyMarketPrices,
      dailyMarketPricesOriginal,
      productList,
      productNames,
      wholesalers,
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
