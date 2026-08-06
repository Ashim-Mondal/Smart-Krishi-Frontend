import type {
  Product,
  Wholesaler,
  MarketPrice,
  WeatherInfo,
  Notification,
  Enquiry,
  DashboardStat,
} from "../types";

export const products: Product[] = [
  { id: "p1", name: "Potato", slug: "potato", image: "🥔", avgPrice: 2050, unit: "100 Bags", updatedAt: "Today, 08:30 AM" },
  { id: "p2", name: "Rice", slug: "rice", image: "🌾", avgPrice: 2750, unit: "100 Bags", updatedAt: "Today, 08:15 AM" },
  { id: "p3", name: "Onion", slug: "onion", image: "🧅", avgPrice: 1800, unit: "100 Bags", updatedAt: "Today, 08:20 AM" },
];

export const marketPrices: MarketPrice[] = [
  { id: "m1", productName: "Potato", price: 2050, unit: "100 Bags" },
  { id: "m2", productName: "Onion", price: 1800, unit: "100 Bags" },
  { id: "m3", productName: "Rice", price: 2750, unit: "100 Bags" },
  { id: "m4", productName: "Tomato", price: 1500, unit: "100 Crates" },
];

export const weather: WeatherInfo = {
  location: "Pandua Block",
  tempC: 31,
  condition: "Sunny",
  humidity: 75,
  windKmh: 12,
  tomorrow: "View Forecast",
};

export const wholesalers: Wholesaler[] = [
  {
    id: "w1",
    businessName: "Mondal Traders",
    name: "Sanjib Mondal",
    logoInitials: "MONDAL\nTRADERS",
    logoColor: "#15803D",
    verified: true,
    // rating: 4.8,
    // reviews: 56,
    // experience: 20,
    village: "Pandua",
    block: "Pandua Block",
    // district: "Hooghly, West Bengal",
    phone: "+91 98765 43210",
    // whatsapp: "+91 98765 43210",
    // mapsUrl: "https://maps.google.com",
    // dealsIn: ["Potato", "Rice", "Onion", "Tomato", "Garlic"],
    about:
      "We are a trusted wholesaler dealing in Potato, Rice, Onion, Tomato and Garlic. We deal with farmers directly and provide fair price and on-time payment.",
    // businessHours: { openTime: "9:00 AM", closeTime: "7:00 PM", days: "Monday - Sunday" },
    products: [
      { id: "mp1", name: "Potato", image: "🥔", buyingQuantity: "100 Bags", buyingPrice: 2000, lastUpdated: "Today" },
      { id: "mp2", name: "Onion", image: "🧅", buyingQuantity: "50 Bags", buyingPrice: 1800, lastUpdated: "Today" },
      { id: "mp3", name: "Rice", image: "🌾", buyingQuantity: "300 Bags", buyingPrice: 2750, lastUpdated: "Today" },
      { id: "mp4", name: "Tomato", image: "🍅", buyingQuantity: "50 Crates", buyingPrice: 1500, lastUpdated: "Today" },
      { id: "mp5", name: "Garlic", image: "🧄", buyingQuantity: "20 Bags", buyingPrice: 2600, lastUpdated: "Today" },
    ],
  },
  {
    id: "w2",
    businessName: "Gupta Enterprise",
    name: "Rakesh Gupta",
    logoInitials: "GE",
    logoColor: "#0F766E",
    verified: true,
    // rating: 4.6,
    // reviews: 41,
    // experience: 15,
    village: "Pandua",
    block: "Pandua Block",
    // district: "Hooghly, West Bengal",
    phone: "+91 98765 43211",
    // whatsapp: "+91 98765 43211",
    // mapsUrl: "https://maps.google.com",
    // dealsIn: ["Potato", "Onion", "Garlic"],
    about:
      "Gupta Enterprise has been serving local farmers for over 15 years with fair prices and same-day payment on all produce.",
    // businessHours: { openTime: "8:30 AM", closeTime: "6:30 PM", days: "Monday - Saturday" },
    products: [
      { id: "gp1", name: "Potato", image: "🥔", buyingQuantity: "60 Bags", buyingPrice: 1980, lastUpdated: "Today" },
      { id: "gp2", name: "Garlic", image: "🧄", buyingQuantity: "30 Bags", buyingPrice: 2580, lastUpdated: "Today" },
    ],
  },
  {
    id: "w3",
    businessName: "Khan Traders",
    name: "Imran Khan",
    logoInitials: "KT",
    logoColor: "#B45309",
    verified: true,
    // rating: 4.7,
    // reviews: 38,
    // experience: 12,
    village: "Pandua",
    block: "Pandua Block",
    // district: "Hooghly, West Bengal",
    phone: "+91 98765 43212",
    // whatsapp: "+91 98765 43212",
    // mapsUrl: "https://maps.google.com",
    // dealsIn: ["Rice", "Tomato", "Potato"],
    about: "Khan Traders specializes in bulk grain and vegetable trade across Pandua Block with verified weighing standards.",
    // businessHours: { openTime: "9:00 AM", closeTime: "7:00 PM", days: "Monday - Sunday" },
    products: [
      { id: "kp1", name: "Rice", image: "🌾", buyingQuantity: "150 Bags", buyingPrice: 1950, lastUpdated: "Today" },
    ],
  },
  {
    id: "w4",
    businessName: "Das & Sons",
    name: "Bimal Das",
    logoInitials: "D&S",
    logoColor: "#9F1239",
    verified: true,
    // rating: 4.5,
    // reviews: 29,
    // experience: 25,
    village: "Pandua",
    block: "Pandua Block",
    // district: "Hooghly, West Bengal",
    phone: "+91 98765 43213",
    // whatsapp: "+91 98765 43213",
    // mapsUrl: "https://maps.google.com",
    // dealsIn: ["Potato", "Garlic"],
    about: "A family-run business since 1998, Das & Sons is one of the oldest verified wholesalers in Pandua Block.",
    // businessHours: { openTime: "9:00 AM", closeTime: "6:00 PM", days: "Monday - Saturday" },
    products: [
      { id: "dp1", name: "Potato", image: "🥔", buyingQuantity: "80 Bags", buyingPrice: 2010, lastUpdated: "Today" },
    ],
  },
];

export const notifications: Notification[] = [
  { id: "n1", title: "New inquiry from Rahul Das", time: "10:30 AM", type: "info" },
  { id: "n2", title: "Your profile viewed by 25 farmers", time: "09:15 AM", type: "success" },
  { id: "n3", title: "Price alert: Potato price updated", time: "Yesterday", type: "warning" },
];

export const enquiries: Enquiry[] = [
  { id: "e1", name: "Rahul Das", avatar: "RD", message: "Interested in Potato (100 Bags)", time: "10:30 AM" },
  { id: "e2", name: "Sukumar Pal", avatar: "SP", message: "Interested in Rice (200 Bags)", time: "Yesterday" },
];

export const dashboardStats: DashboardStat[] = [
  { id: "s1", label: "Profile Views", value: 154, sublabel: "Today" },
  { id: "s2", label: "Phone Clicks", value: 26, sublabel: "Today" },
  { id: "s3", label: "WhatsApp Clicks", value: 18, sublabel: "Today" },
  { id: "s4", label: "Total Inquiries", value: 57, sublabel: "This Month" },
];

export const currentUser = wholesalers[0];
