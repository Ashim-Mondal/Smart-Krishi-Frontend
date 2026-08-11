import api from "./api";
// import type { DailyMarketPrice, ProductList } from "../types";

// export const getProductList = async (): Promise<ProductList[]> => {
//   const response = await api.get("/dailyMarketPrice/getProductList");
//   return response.data;
// };

export const getProductNames = async (): Promise<string[]> => {
  const response = await api.get("/products/getproductname");
  return response.data;
};
