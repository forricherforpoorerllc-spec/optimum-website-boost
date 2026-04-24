/**
 * Central Optimum product + pricing catalog.
 * Prices reflect current Optimum public pricing (w/ Auto Pay & Paperless Bill + applicable bundle discounts).
 */

export type InternetPlan = {
  id: "300" | "500" | "1gig";
  name: string;
  shortName: string;
  speed: string;
  price: number;
  tagline: string;
  bullets: string[];
  recommended?: boolean;
};

export const INTERNET_PLANS: InternetPlan[] = [
  {
    id: "300",
    name: "300 Mbps Fiber Internet",
    shortName: "300 Mbps",
    speed: "300 Mbps",
    price: 25,
    tagline: "Great for everyday use",
    bullets: [
      "5x faster upload speeds than 5G home Internet",
      "HD & 4K streaming, remote work, online gaming",
      "Unlimited data, no annual contract",
      "5-year price guarantee",
    ],
  },
  {
    id: "500",
    name: "500 Mbps Fiber Internet",
    shortName: "500 Mbps",
    speed: "500 Mbps",
    price: 35,
    tagline: "More speed for more screens",
    bullets: [
      "9x faster upload speeds than 5G home Internet",
      "Multi-device 4K streaming + competitive gaming",
      "Unlimited data, no annual contract",
      "5-year price guarantee",
    ],
  },
  {
    id: "1gig",
    name: "1 Gig Fiber Internet",
    shortName: "1 Gig",
    speed: "1,000 Mbps",
    price: 45,
    tagline: "Power your connected home",
    bullets: [
      "17x faster upload speeds than 5G home Internet",
      "Built for smart homes with 10+ devices",
      "Unlimited data, no annual contract",
      "5-year price guarantee",
    ],
    recommended: true,
  },
];

export type TVPackage = {
  id: "entertainment" | "extra" | "everything";
  name: string;
  channels: string;
  price: number;
  blurb: string;
};

export const TV_PACKAGES: TVPackage[] = [
  {
    id: "entertainment",
    name: "Entertainment TV",
    channels: "75+",
    price: 30,
    blurb: "Entertainment-only package with 75+ channels — exclusively on Stream.",
  },
  {
    id: "extra",
    name: "Extra TV",
    channels: "120+",
    price: 95,
    blurb: "Balanced package with 120+ channels of local broadcast, cable news, and national sports.",
  },
  {
    id: "everything",
    name: "Everything TV",
    channels: "200+",
    price: 150,
    blurb: "Sports-focused package with 200+ channels, regional and college sports for dedicated fans.",
  },
];

/** $5/mo off 300 Mbps+ Internet when TV is added. */
export const TV_INTERNET_DISCOUNT = 5;

/** $10/mo off Internet when Optimum Mobile Unlimited is added. */
export const MOBILE_INTERNET_DISCOUNT = 10;

export type MobilePlanRow = {
  lines: string;
  unlimited: number | null;
  unlimitedMax: number | null;
  note?: string;
};

export const MOBILE_PLANS: MobilePlanRow[] = [
  { lines: "1 line", unlimited: 45, unlimitedMax: 55 },
  { lines: "2 lines", unlimited: 60, unlimitedMax: 80 },
  { lines: "3 lines*", unlimited: 60, unlimitedMax: 80, note: "*Add 2 lines and get a 3rd line FREE when you port 1+ number" },
];

export type AddOn = {
  id: string;
  category: "Internet" | "TV" | "Protection" | "Entertainment" | "Phone";
  name: string;
  price: number;
  priceLabel: string;
  description: string;
  note?: string;
};

export const ADD_ONS: AddOn[] = [
  {
    id: "whole-home-wifi",
    category: "Internet",
    name: "Whole Home WiFi",
    price: 5,
    priceLabel: "$5.00/mo (first), $10.00/mo additional",
    description: "Up to 3 extenders included for strong WiFi in every room. Easy setup in minutes, free in-home troubleshooting, no service fees.",
  },
  {
    id: "optimum-stream",
    category: "TV",
    name: "Additional Optimum Stream Device",
    price: 14,
    priceLabel: "1 included FREE · $14.00/mo each additional",
    description: "Live TV, Cloud DVR & On Demand via the Optimum TV app. Access thousands of apps like Netflix, YouTube & more. Google Assistant voice remote.",
  },
  {
    id: "hbo-max",
    category: "Entertainment",
    name: "HBO Max",
    price: 18.49,
    priceLabel: "$18.49/mo",
    description: "Stream blockbuster movies, HBO Originals, and top series. Added to your Optimum bill.",
  },
  {
    id: "total-care",
    category: "Protection",
    name: "Total Care",
    price: 10,
    priceLabel: "$10.00/mo ($15/mo w/o eligible plan)",
    description: "No service-visit fees, U.S.-based premium tech support, priority call status.",
  },
  {
    id: "total-care-plus",
    category: "Protection",
    name: "Total Care Plus",
    price: 15,
    priceLabel: "$15.00/mo ($20/mo w/o eligible plan)",
    description: "Everything in Total Care plus device protection, accidental damage coverage, and 1 low-cost smart-home install every 12 mo.",
  },
  {
    id: "total-care-max",
    category: "Protection",
    name: "Total Care Max",
    price: 20,
    priceLabel: "$20.00/mo ($30/mo w/o eligible plan)",
    description: "Everything in Total Care plus connected-home device protection and 2 low-cost smart-home installs every 12 mo.",
  },
  {
    id: "phone-line",
    category: "Phone",
    name: "Add a Phone Landline",
    price: 25,
    priceLabel: "$25.00/mo",
    description: "Connect your current number or get a new one. Unlimited nationwide calling.",
  },
];

export type OrderSelection = {
  internetPlanId: InternetPlan["id"];
  tvPackageId: TVPackage["id"] | null;
  addOnIds: string[];
};

export function calculateOrder(sel: OrderSelection) {
  const internet = INTERNET_PLANS.find((p) => p.id === sel.internetPlanId)!;
  const tv = sel.tvPackageId ? TV_PACKAGES.find((t) => t.id === sel.tvPackageId) ?? null : null;
  const addOns = ADD_ONS.filter((a) => sel.addOnIds.includes(a.id));

  const internetDiscount = tv ? TV_INTERNET_DISCOUNT : 0;
  const internetNet = Math.max(internet.price - internetDiscount, 0);
  const addOnTotal = addOns.reduce((s, a) => s + a.price, 0);
  const tvTotal = tv ? tv.price : 0;

  const monthlyTotal = internetNet + tvTotal + addOnTotal;

  return {
    internet,
    tv,
    addOns,
    internetDiscount,
    internetNet,
    tvTotal,
    addOnTotal,
    monthlyTotal: Math.round(monthlyTotal * 100) / 100,
  };
}
