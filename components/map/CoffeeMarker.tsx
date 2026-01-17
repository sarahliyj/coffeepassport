'use client'

import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import CoffeePopup from './CoffeePopup'
import { type Rarity } from '@/lib/countries'
import { type CoffeeEntry } from '@/lib/mapUtils'

// Create custom coffee bean icon
function createCoffeeBeanIcon(unlocked: boolean, highlighted: boolean): L.DivIcon {
  // Morandi-inspired muted colors
  const fillColor = unlocked ? '#8B7355' : '#C4BDB3'
  const strokeColor = unlocked ? '#6B5344' : '#9A958C'
  const crackColor = unlocked ? '#5C4433' : '#A8A298'
  const glow = highlighted
    ? 'filter: drop-shadow(0 0 10px rgba(139, 115, 85, 0.8));'
    : unlocked
    ? 'filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));'
    : ''

  const svg = `
    <svg width="18" height="22" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg" style="${glow}">
      <!-- Bean shadow -->
      <ellipse cx="12" cy="28" rx="6" ry="1.5" fill="rgba(0,0,0,0.15)"/>
      <!-- Coffee bean body - organic oval shape -->
      <ellipse cx="12" cy="14" rx="8" ry="11"
               fill="${fillColor}"
               stroke="${strokeColor}"
               stroke-width="1.5"
               transform="rotate(-15 12 14)"/>
      <!-- Bean center crack/crease - hand-drawn wavy line -->
      <path d="M12 4 Q10 8 12 14 Q14 20 12 24"
            fill="none"
            stroke="${crackColor}"
            stroke-width="1.5"
            stroke-linecap="round"
            transform="rotate(-15 12 14)"/>
      ${highlighted ? `
        <!-- Highlight pulse ring -->
        <ellipse cx="12" cy="14" rx="12" ry="15" fill="none" stroke="#A8B89C" stroke-width="2" opacity="0.6" transform="rotate(-15 12 14)">
          <animate attributeName="rx" values="10;16" dur="1.2s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="13;19" dur="1.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0" dur="1.2s" repeatCount="indefinite"/>
        </ellipse>
      ` : ''}
    </svg>
  `

  return L.divIcon({
    html: svg,
    className: 'coffee-marker',
    iconSize: [18, 22],
    iconAnchor: [9, 22],
    popupAnchor: [0, -20],
  })
}

interface CoffeeMarkerProps {
  position: [number, number]
  countryCode: string
  countryName: string
  region: string
  flavorProfile: string
  rarity: Rarity
  entries: CoffeeEntry[]
  isHighlighted: boolean
  onEntryClick?: (entry: CoffeeEntry) => void
}

export default function CoffeeMarker({
  position,
  countryName,
  region,
  flavorProfile,
  rarity,
  entries,
  isHighlighted,
  onEntryClick,
}: CoffeeMarkerProps) {
  const isUnlocked = entries.length > 0
  const icon = createCoffeeBeanIcon(isUnlocked, isHighlighted)

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <CoffeePopup
          countryName={countryName}
          region={region}
          flavorProfile={flavorProfile}
          rarity={rarity}
          entries={entries}
          onEntryClick={onEntryClick}
        />
      </Popup>
    </Marker>
  )
}
