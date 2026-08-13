import type { ProductList } from "../types";
import api from "./api";

// -----------------------------------------
// Types
// -----------------------------------------

export interface AddProductRequest {
  productName: string;
  category: string;
  quantity: number;
  sellerId: {
    id: number;
  };
}

export interface ProductCategoryMap {
  [productName: string]: string[];
}

// -----------------------------------------
// Get Product Names
// -----------------------------------------

export const getProductNames = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/products/getproductname");

  return response.data;
};

// -----------------------------------------
// Get Product Categories
// -----------------------------------------

export const getProductCategories = async (): Promise<ProductCategoryMap> => {
  const response = await api.get<ProductCategoryMap>(
    "/products/get-product-category",
  );

  return response.data;
};

// -----------------------------------------
// Add Product
// -----------------------------------------

export const addProduct = async (data: AddProductRequest) => {
  const response = await api.post("/products/create-product", data);

  return response.data;
};
// =====================================================
// Get All Product List
// =====================================================

export const getProductList = async (): Promise<ProductList[]> => {
  const response = await api.get<ProductList[]>(
    "/dailyMarketPrice/getProductList",
  );

  return response.data;
};
