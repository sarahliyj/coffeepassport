import { countryCoordinates, getBeanCard, BeanCard } from './countries'

export interface CoffeeEntry {
  id: string
  origin_country: string
  roast_level?: string
  brew_method?: string
  note?: string
  created_at: string
}

export interface CountryData {
  code: string
  beanCard: BeanCard
  coordinates: [number, number]
  entries: CoffeeEntry[]
}

// Group coffee entries by country and enrich with bean card data
export function groupEntriesByCountry(entries: CoffeeEntry[]): CountryData[] {
  const grouped = entries.reduce((acc, entry) => {
    const code = entry.origin_country
    if (!acc[code]) {
      acc[code] = []
    }
    acc[code].push(entry)
    return acc
  }, {} as Record<string, CoffeeEntry[]>)

  return Object.entries(grouped)
    .map(([code, entries]) => {
      const beanCard = getBeanCard(code)
      const coordinates = countryCoordinates[code]

      if (!beanCard || !coordinates) return null

      return {
        code,
        beanCard,
        coordinates,
        entries: entries.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
      }
    })
    .filter((data): data is CountryData => data !== null)
}

// Get coordinates for a country code
export function getCountryCoordinates(code: string): [number, number] | null {
  return countryCoordinates[code] || null
}

// Get all coffee countries with coordinates (for showing unvisited pins)
export function getAllCoffeeCountries(): { code: string; coordinates: [number, number]; beanCard: BeanCard }[] {
  return Object.entries(countryCoordinates)
    .map(([code, coordinates]) => {
      const beanCard = getBeanCard(code)
      if (!beanCard) return null
      return { code, coordinates, beanCard }
    })
    .filter((data): data is { code: string; coordinates: [number, number]; beanCard: BeanCard } => data !== null)
}

// Format date for display
export function formatEntryDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Get roast level label
export function getRoastLabel(value: string): string {
  const labels: Record<string, string> = {
    'light': 'Light',
    'medium': 'Medium',
    'medium-dark': 'Medium-Dark',
    'dark': 'Dark',
  }
  return labels[value] || value
}

// Get brew method label
export function getBrewLabel(value: string): string {
  const labels: Record<string, string> = {
    'pour-over': 'Pour Over',
    'espresso': 'Espresso',
    'french-press': 'French Press',
    'aeropress': 'AeroPress',
    'cold-brew': 'Cold Brew',
    'drip': 'Drip Coffee',
    'moka-pot': 'Moka Pot',
    'chemex': 'Chemex',
    'v60': 'V60',
    'siphon': 'Siphon',
    'instant': 'Instant',
  }
  return labels[value] || value
}
