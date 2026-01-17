'use client'

import { motion } from 'framer-motion'
import { countries } from '@/lib/countries'

interface WorldMapProps {
  unlockedCountries: string[]
  highlightCountry?: string | null
}

// Country coordinates on the world map (percentage-based for the map image)
// These positions are calibrated for a standard world map projection
const countryPositions: Record<string, { x: number; y: number }> = {
  // North America
  US: { x: 15, y: 35 }, // United States (Hawaii region for coffee)

  // Central America & Caribbean
  MX: { x: 14, y: 42 }, // Mexico
  GT: { x: 16, y: 47 }, // Guatemala
  HN: { x: 17, y: 48 }, // Honduras
  SV: { x: 16.5, y: 49 }, // El Salvador
  NI: { x: 17.5, y: 50 }, // Nicaragua
  CR: { x: 17, y: 52 }, // Costa Rica
  PA: { x: 18, y: 53 }, // Panama
  JM: { x: 20, y: 44 }, // Jamaica
  CU: { x: 20, y: 42 }, // Cuba
  HT: { x: 22, y: 44 }, // Haiti
  DO: { x: 23, y: 44 }, // Dominican Republic

  // South America
  BR: { x: 30, y: 62 }, // Brazil
  CO: { x: 22, y: 54 }, // Colombia
  VE: { x: 24, y: 50 }, // Venezuela
  EC: { x: 20, y: 56 }, // Ecuador
  PE: { x: 21, y: 60 }, // Peru
  BO: { x: 25, y: 64 }, // Bolivia

  // Africa
  ET: { x: 56, y: 50 }, // Ethiopia
  KE: { x: 56, y: 56 }, // Kenya
  TZ: { x: 55, y: 60 }, // Tanzania
  UG: { x: 53, y: 54 }, // Uganda
  RW: { x: 52, y: 57 }, // Rwanda
  BI: { x: 52, y: 58 }, // Burundi
  CD: { x: 49, y: 56 }, // DR Congo
  CM: { x: 47, y: 52 }, // Cameroon
  CI: { x: 43, y: 52 }, // Ivory Coast
  GH: { x: 44, y: 51 }, // Ghana
  MG: { x: 60, y: 66 }, // Madagascar
  ZW: { x: 52, y: 66 }, // Zimbabwe
  MW: { x: 54, y: 64 }, // Malawi
  ZM: { x: 51, y: 64 }, // Zambia
  AO: { x: 48, y: 62 }, // Angola

  // Asia
  IN: { x: 68, y: 44 }, // India
  CN: { x: 76, y: 36 }, // China (Yunnan)
  VN: { x: 77, y: 48 }, // Vietnam
  ID: { x: 80, y: 58 }, // Indonesia
  PH: { x: 82, y: 48 }, // Philippines
  TH: { x: 75, y: 48 }, // Thailand
  MM: { x: 73, y: 44 }, // Myanmar
  LA: { x: 76, y: 46 }, // Laos
  NP: { x: 70, y: 40 }, // Nepal
  YE: { x: 58, y: 46 }, // Yemen

  // Oceania
  PG: { x: 87, y: 58 }, // Papua New Guinea
  AU: { x: 85, y: 72 }, // Australia
}

export default function WorldMap({ unlockedCountries, highlightCountry }: WorldMapProps) {
  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code
  }

  const isUnlocked = (code: string) => unlockedCountries.includes(code)
  const isHighlighted = (code: string) => highlightCountry === code

  // Pin component for map markers
  const Pin = ({ x, y, unlocked, highlighted, code }: {
    x: number;
    y: number;
    unlocked: boolean;
    highlighted: boolean;
    code: string;
  }) => {
    const pinColor = unlocked ? '#6F4E37' : '#C4BDB3'
    const pinScale = highlighted ? 1.3 : 1

    return (
      <motion.g
        style={{ cursor: 'pointer' }}
        initial={false}
        animate={{ scale: pinScale }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        <title>{getCountryName(code)}</title>
        {/* Pin shadow */}
        <ellipse
          cx={x}
          cy={y + 0.8}
          rx={1.2}
          ry={0.4}
          fill="rgba(0,0,0,0.2)"
        />
        {/* Pin body - teardrop shape pointing down */}
        <path
          d={`M ${x} ${y + 2.5}
              C ${x - 1.8} ${y - 0.5} ${x - 1.8} ${y - 2} ${x} ${y - 2.8}
              C ${x + 1.8} ${y - 2} ${x + 1.8} ${y - 0.5} ${x} ${y + 2.5} Z`}
          fill={pinColor}
          stroke={unlocked ? '#4A3728' : '#9A958C'}
          strokeWidth="0.3"
          style={{
            filter: highlighted ? 'drop-shadow(0 0 3px rgba(111, 78, 55, 0.8))' :
                    unlocked ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'none'
          }}
        />
        {/* Pin inner circle */}
        <circle
          cx={x}
          cy={y - 0.8}
          r={0.8}
          fill={unlocked ? '#8B6F47' : '#D4CFC5'}
        />
        {/* Highlight ring for newly added */}
        {highlighted && (
          <motion.circle
            cx={x}
            cy={y - 0.8}
            r={3}
            fill="none"
            stroke="#9CAF88"
            strokeWidth="0.4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </motion.g>
    )
  }

  return (
    <div className="relative w-full aspect-[2/1] bg-[var(--cream)] rounded-2xl overflow-hidden border-2 border-[var(--latte)] shadow-lg">
      {/* World map background image */}
      <img
        src="/world-map.png"
        alt="World Map"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ imageRendering: 'crisp-edges' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />

      {/* Fallback background if image doesn't load */}
      <div className="absolute inset-0 bg-[#F5F0E6] -z-10" />

      {/* Country pins overlay */}
      <svg
        viewBox="0 0 100 80"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {Object.entries(countryPositions).map(([code, position]) => {
          const unlocked = isUnlocked(code)
          const highlighted = isHighlighted(code)

          return (
            <Pin
              key={code}
              x={position.x}
              y={position.y}
              unlocked={unlocked}
              highlighted={highlighted}
              code={code}
            />
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-[var(--latte)]/30 z-10">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="16" viewBox="0 0 12 16">
            <path
              d="M 6 14 C 2 8 2 4 6 2 C 10 4 10 8 6 14 Z"
              fill="#6F4E37"
              stroke="#4A3728"
              strokeWidth="0.5"
            />
            <circle cx="6" cy="6" r="1.5" fill="#8B6F47" />
          </svg>
          <span className="text-[var(--espresso)] font-medium">Visited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="16" viewBox="0 0 12 16">
            <path
              d="M 6 14 C 2 8 2 4 6 2 C 10 4 10 8 6 14 Z"
              fill="#C4BDB3"
              stroke="#9A958C"
              strokeWidth="0.5"
            />
            <circle cx="6" cy="6" r="1.5" fill="#D4CFC5" />
          </svg>
          <span className="text-[var(--espresso)] font-medium">Not visited</span>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-[var(--latte)]/30 z-10">
        <div className="text-base font-bold text-[var(--espresso)]">
          {unlockedCountries.length} / {Object.keys(countryPositions).length}
        </div>
        <div className="text-xs text-[var(--coffee)] font-medium">countries</div>
      </div>
    </div>
  )
}
