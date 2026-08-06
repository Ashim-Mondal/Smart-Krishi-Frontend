// export interface BusinessHours {
//   openTime: string;
//   closeTime: string;
//   days: string;
// }

export interface ProductEntry {
  id: string;
  name: string;
  image: string;
  buyingQuantity: string;
  buyingPrice: number;
  lastUpdated: string;
}

export interface Wholesaler {
  id: string;
  businessName: string;
  name: string;
  logoInitials: string;
  logoColor: string;
  verified: boolean;
  // rating: number;
  // reviews: number;
  // experience: number;
  village: string;
  block: string;
  // district: string;
  phone: string;
  // whatsapp: string;
  // mapsUrl: string;
  // dealsIn: string[];
  about: string;
  // businessHours: BusinessHours;
  products: ProductEntry[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  avgPrice: number;
  unit: string;
  updatedAt: string;
}

export interface MarketPrice {
  id: string;
  productName: string;
  price: number;
  unit: string;
}

export interface WeatherInfo {
  location: string;
  tempC: number;
  condition: string;
  humidity: number;
  windKmh: number;
  tomorrow: string;
}

export type UserRole = "farmer" | "wholesaler";

export interface User {
  id: string;
  fullName: string;
  businessName?: string;
  phone: string;
  village: string;
  block: string;
  district: string;
  role: UserRole;
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  time: string;
  type: "info" | "success" | "warning";
}

export interface Enquiry {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  sublabel: string;
}
