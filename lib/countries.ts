export type Rarity = 'common' | 'rare' | 'legendary'

export interface BeanCard {
  code: string
  name: string
  flavorProfile: string
  rarity: Rarity
  region: string
}

// Coffee-producing countries with flavor profiles and rarity
export const beanCards = [
  // Legendary - Micro-lot, seasonal, or exceptionally rare origins
  { code: 'YE', name: 'Yemen', flavorProfile: 'Wild, wine-like, dried fruit, complex spice', rarity: 'legendary' as Rarity, region: 'Middle East' },
  { code: 'JM', name: 'Jamaica Blue Mountain', flavorProfile: 'Mild, smooth, balanced sweetness, floral', rarity: 'legendary' as Rarity, region: 'Caribbean' },
  { code: 'PA', name: 'Panama Geisha', flavorProfile: 'Jasmine, bergamot, tropical fruit, tea-like', rarity: 'legendary' as Rarity, region: 'Central America' },
  { code: 'HT', name: 'Haiti', flavorProfile: 'Sweet, mild acidity, chocolate, citrus', rarity: 'legendary' as Rarity, region: 'Caribbean' },
  { code: 'AU', name: 'Australia', flavorProfile: 'Smooth, syrupy, stone fruit, caramel', rarity: 'legendary' as Rarity, region: 'Oceania' },

  // Rare - High-quality single origins with distinctive profiles
  { code: 'ET', name: 'Ethiopia', flavorProfile: 'Blueberry, jasmine, citrus, wine-like', rarity: 'rare' as Rarity, region: 'Africa' },
  { code: 'KE', name: 'Kenya', flavorProfile: 'Blackcurrant, tomato, bright acidity, juicy', rarity: 'rare' as Rarity, region: 'Africa' },
  { code: 'RW', name: 'Rwanda', flavorProfile: 'Orange, floral, tea-like, silky', rarity: 'rare' as Rarity, region: 'Africa' },
  { code: 'BI', name: 'Burundi', flavorProfile: 'Cherry, lime, honey, complex', rarity: 'rare' as Rarity, region: 'Africa' },
  { code: 'TZ', name: 'Tanzania', flavorProfile: 'Bright, berry, black tea, winey', rarity: 'rare' as Rarity, region: 'Africa' },
  { code: 'CR', name: 'Costa Rica', flavorProfile: 'Honey, citrus, clean, balanced', rarity: 'rare' as Rarity, region: 'Central America' },
  { code: 'GT', name: 'Guatemala', flavorProfile: 'Chocolate, apple, caramel, spicy', rarity: 'rare' as Rarity, region: 'Central America' },
  { code: 'SV', name: 'El Salvador', flavorProfile: 'Honey, orange, chocolate, smooth', rarity: 'rare' as Rarity, region: 'Central America' },
  { code: 'PG', name: 'Papua New Guinea', flavorProfile: 'Earthy, fruity, herbal, sweet', rarity: 'rare' as Rarity, region: 'Oceania' },
  { code: 'NP', name: 'Nepal', flavorProfile: 'Floral, mild, sweet, tea-like', rarity: 'rare' as Rarity, region: 'Asia' },
  { code: 'MW', name: 'Malawi', flavorProfile: 'Citrus, floral, clean, bright', rarity: 'rare' as Rarity, region: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', flavorProfile: 'Fruity, wine-like, peppery, complex', rarity: 'rare' as Rarity, region: 'Africa' },

  // Common - Widely available, quality origins
  { code: 'CO', name: 'Colombia', flavorProfile: 'Caramel, nutty, red fruit, balanced', rarity: 'common' as Rarity, region: 'South America' },
  { code: 'BR', name: 'Brazil', flavorProfile: 'Chocolate, nuts, low acidity, creamy', rarity: 'common' as Rarity, region: 'South America' },
  { code: 'VN', name: 'Vietnam', flavorProfile: 'Bold, earthy, chocolate, robust', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'ID', name: 'Indonesia', flavorProfile: 'Earthy, herbal, dark chocolate, full body', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'HN', name: 'Honduras', flavorProfile: 'Caramel, tropical fruit, mild, sweet', rarity: 'common' as Rarity, region: 'Central America' },
  { code: 'PE', name: 'Peru', flavorProfile: 'Mild, nutty, floral, chocolate', rarity: 'common' as Rarity, region: 'South America' },
  { code: 'MX', name: 'Mexico', flavorProfile: 'Chocolate, nuts, light body, sweet', rarity: 'common' as Rarity, region: 'Central America' },
  { code: 'NI', name: 'Nicaragua', flavorProfile: 'Citrus, vanilla, balanced, smooth', rarity: 'common' as Rarity, region: 'Central America' },
  { code: 'UG', name: 'Uganda', flavorProfile: 'Chocolatey, winey, full body, earthy', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'IN', name: 'India', flavorProfile: 'Spicy, earthy, low acidity, heavy body', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'EC', name: 'Ecuador', flavorProfile: 'Floral, cocoa, balanced, mild', rarity: 'common' as Rarity, region: 'South America' },
  { code: 'PH', name: 'Philippines', flavorProfile: 'Fruity, floral, chocolate, smooth', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'LA', name: 'Laos', flavorProfile: 'Earthy, nutty, mild, smooth', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'TH', name: 'Thailand', flavorProfile: 'Herbal, earthy, mild, clean', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'MM', name: 'Myanmar', flavorProfile: 'Fruity, floral, tea-like, light', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'DO', name: 'Dominican Republic', flavorProfile: 'Mild, chocolate, low acidity, smooth', rarity: 'common' as Rarity, region: 'Caribbean' },
  { code: 'CU', name: 'Cuba', flavorProfile: 'Tobacco, earthy, light, smooth', rarity: 'common' as Rarity, region: 'Caribbean' },
  { code: 'VE', name: 'Venezuela', flavorProfile: 'Winey, fruity, delicate, sweet', rarity: 'common' as Rarity, region: 'South America' },
  { code: 'BO', name: 'Bolivia', flavorProfile: 'Sweet, floral, citrus, clean', rarity: 'common' as Rarity, region: 'South America' },
  { code: 'ZM', name: 'Zambia', flavorProfile: 'Citrus, floral, bright, clean', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'CD', name: 'DR Congo', flavorProfile: 'Fruity, winey, complex, earthy', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'CM', name: 'Cameroon', flavorProfile: 'Cocoa, earthy, mild, balanced', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'CI', name: 'Ivory Coast', flavorProfile: 'Mild, earthy, nutty, smooth', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'MG', name: 'Madagascar', flavorProfile: 'Fruity, floral, citrus, unique', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'AO', name: 'Angola', flavorProfile: 'Mild, earthy, chocolate, smooth', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'GH', name: 'Ghana', flavorProfile: 'Cocoa, mild, earthy, balanced', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'SL', name: 'Sierra Leone', flavorProfile: 'Fruity, mild, sweet, smooth', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'LR', name: 'Liberia', flavorProfile: 'Bold, earthy, strong, unique', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'TG', name: 'Togo', flavorProfile: 'Mild, cocoa, earthy, smooth', rarity: 'common' as Rarity, region: 'Africa' },
  { code: 'CN', name: 'China', flavorProfile: 'Tea-like, herbal, mild, sweet', rarity: 'common' as Rarity, region: 'Asia' },
  { code: 'US', name: 'United States (Hawaii)', flavorProfile: 'Mild, sweet, floral, buttery', rarity: 'common' as Rarity, region: 'North America' },
].sort((a, b) => a.name.localeCompare(b.name))

// Simple country list for dropdown
export const countries = beanCards.map(b => ({ code: b.code, name: b.name }))

export const roastLevels = [
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'medium-dark', label: 'Medium-Dark' },
  { value: 'dark', label: 'Dark' },
]

export const brewMethods = [
  { value: 'pour-over', label: 'Pour Over' },
  { value: 'espresso', label: 'Espresso' },
  { value: 'french-press', label: 'French Press' },
  { value: 'aeropress', label: 'AeroPress' },
  { value: 'cold-brew', label: 'Cold Brew' },
  { value: 'drip', label: 'Drip Coffee' },
  { value: 'moka-pot', label: 'Moka Pot' },
  { value: 'chemex', label: 'Chemex' },
  { value: 'v60', label: 'V60' },
  { value: 'siphon', label: 'Siphon' },
  { value: 'instant', label: 'Instant' },
]

export const getRarityColor = (rarity: Rarity) => {
  switch (rarity) {
    case 'legendary': return { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-700', glow: 'shadow-amber-200' }
    case 'rare': return { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700', glow: 'shadow-purple-200' }
    case 'common': return { bg: 'bg-stone-100', border: 'border-stone-300', text: 'text-stone-600', glow: 'shadow-stone-200' }
  }
}

export const getBeanCard = (code: string): BeanCard | undefined => {
  return beanCards.find(b => b.code === code)
}

// Lat/Lng coordinates for all coffee-producing countries
export const countryCoordinates: Record<string, [number, number]> = {
  // Legendary
  YE: [15.552, 48.517],      // Yemen
  JM: [18.109, -77.298],     // Jamaica
  PA: [8.538, -80.783],      // Panama
  HT: [18.971, -72.286],     // Haiti
  AU: [-25.274, 133.775],    // Australia

  // Rare - Africa
  ET: [9.145, 40.489],       // Ethiopia
  KE: [-0.024, 37.906],      // Kenya
  RW: [-1.940, 29.874],      // Rwanda
  BI: [-3.373, 29.919],      // Burundi
  TZ: [-6.369, 34.889],      // Tanzania
  MW: [-13.254, 34.302],     // Malawi
  ZW: [-19.015, 29.154],     // Zimbabwe

  // Rare - Central America
  CR: [9.749, -83.754],      // Costa Rica
  GT: [15.783, -90.231],     // Guatemala
  SV: [13.794, -88.897],     // El Salvador

  // Rare - Other
  PG: [-6.315, 143.956],     // Papua New Guinea
  NP: [28.394, 84.124],      // Nepal

  // Common - South America
  CO: [4.571, -74.297],      // Colombia
  BR: [-14.235, -51.925],    // Brazil
  PE: [-9.190, -75.015],     // Peru
  EC: [-1.831, -78.183],     // Ecuador
  VE: [6.424, -66.590],      // Venezuela
  BO: [-16.290, -63.588],    // Bolivia

  // Common - Central America & Caribbean
  HN: [15.200, -86.242],     // Honduras
  MX: [23.634, -102.553],    // Mexico
  NI: [12.866, -85.207],     // Nicaragua
  DO: [18.736, -70.163],     // Dominican Republic
  CU: [21.521, -77.781],     // Cuba

  // Common - Africa
  UG: [1.373, 32.290],       // Uganda
  CD: [-4.039, 21.759],      // DR Congo
  CM: [7.370, 12.354],       // Cameroon
  CI: [7.540, -5.547],       // Ivory Coast
  MG: [-18.767, 46.869],     // Madagascar
  AO: [-11.203, 17.873],     // Angola
  GH: [7.946, -1.023],       // Ghana
  SL: [8.461, -11.779],      // Sierra Leone
  LR: [6.428, -9.429],       // Liberia
  TG: [8.620, 0.825],        // Togo
  ZM: [-13.134, 27.849],     // Zambia

  // Common - Asia
  VN: [14.058, 108.277],     // Vietnam
  ID: [-0.790, 113.921],     // Indonesia
  IN: [20.594, 78.963],      // India
  PH: [12.879, 121.774],     // Philippines
  LA: [19.856, 102.495],     // Laos
  TH: [15.870, 100.993],     // Thailand
  MM: [21.914, 95.956],      // Myanmar
  CN: [25.046, 101.506],     // China (Yunnan)

  // Common - North America
  US: [19.896, -155.582],    // United States (Hawaii)
}

// Total number of coffee-producing countries
export const TOTAL_COFFEE_COUNTRIES = Object.keys(countryCoordinates).length
