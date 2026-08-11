import api from "./api";
// import type { Wholesaler } from "../types";

// TODO:
// this is change any to WHolesaler type after creating the wholesaler type in types/index.ts and fix db; 
export const getAllUsers = async (): Promise<any[]> => {
  const response = await api.get("/users/all");
  return response.data;
};
