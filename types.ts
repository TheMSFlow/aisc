
export interface PricingTier {
  name: string;
  priceUSD: number;
  priceNGN: number;
  features: string[];
  note?: string;
  isPopular?: boolean;
}

export interface DayOutline {
  day: number;
  title: string;
  subtitle: string;
  description: string;
  outcome: string;
}
