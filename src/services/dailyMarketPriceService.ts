import api from "./api";
import type { DailyMarketPrice, ProductList } from "../types";

// this is not for production grade code just for testing purpose
export const getDailyMarketPrices = async (): Promise<DailyMarketPrice[]> => {
  const response = await api.get<DailyMarketPrice[]>(
    "/dailyMarketPrice/market-table",
  );

  return response.data;
};

export const getDailyMarketPricesOriginal = async (): Promise<
  DailyMarketPrice[]
> => {
  const response = await api.get<DailyMarketPrice[]>("/dailyMarketPrice/all");

  return response.data;
};

export const getProductList = async (): Promise<ProductList[]> => {
  const response = await api.get<ProductList[]>("/products/all-products");

  return response.data;
};
