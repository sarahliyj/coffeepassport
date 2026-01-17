'use client'

import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import CoffeeMarker from './CoffeeMarker'
import EntryDetailModal from '@/components/EntryDetailModal'
import {
  groupEntriesByCountry,
  getAllCoffeeCountries,
  getCountryCoordinates,
  type CoffeeEntry,
} from '@/lib/mapUtils'
import './mapStyles.css'

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
})

// Component to handle fly-to animation
function FlyToCountry({ countryCode }: { countryCode: string | null }) {
  const map = useMap()

  useEffect(() => {
    if (countryCode) {
      const coords = getCountryCoordinates(countryCode)
      if (coords) {
        map.flyTo(coords, 5, {
          duration: 1.5,
          easeLinearity: 0.25,
        })
      }
    }
  }, [countryCode, map])

  return null
}

// Component to close all popups when modal opens
function ClosePopupsOnModal({ isModalOpen }: { isModalOpen: boolean }) {
  const map = useMap()

  useEffect(() => {
    if (isModalOpen) {
      map.closePopup()
    }
  }, [isModalOpen, map])

  return null
}

interface InteractiveMapClientProps {
  entries: CoffeeEntry[]
  highlightCountry?: string | null
}

export default function InteractiveMapClient({
  entries,
  highlightCountry,
}: InteractiveMapClientProps) {
  const [selectedEntry, setSelectedEntry] = useState<CoffeeEntry | null>(null)

  // Group entries by country
  const countryData = useMemo(() => groupEntriesByCountry(entries), [entries])

  // Get all coffee countries for showing unvisited pins
  const allCountries = useMemo(() => getAllCoffeeCountries(), [])

  // Create a set of visited country codes for quick lookup
  const visitedCountries = useMemo(
    () => new Set(countryData.map((d) => d.code)),
    [countryData]
  )

  const handleEntryClick = (entry: CoffeeEntry) => {
    setSelectedEntry(entry)
  }

  return (
    <div className="relative w-full aspect-[2/1] coffee-map-container">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToCountry countryCode={highlightCountry ?? null} />
        <ClosePopupsOnModal isModalOpen={!!selectedEntry} />

        {/* Render visited countries with their entries */}
        {countryData.map((country) => (
          <CoffeeMarker
            key={country.code}
            position={country.coordinates}
            countryCode={country.code}
            countryName={country.beanCard.name}
            region={country.beanCard.region}
            flavorProfile={country.beanCard.flavorProfile}
            rarity={country.beanCard.rarity}
            entries={country.entries}
            isHighlighted={highlightCountry === country.code}
            onEntryClick={handleEntryClick}
          />
        ))}

        {/* Render unvisited countries */}
        {allCountries
          .filter((country) => !visitedCountries.has(country.code))
          .map((country) => (
            <CoffeeMarker
              key={country.code}
              position={country.coordinates}
              countryCode={country.code}
              countryName={country.beanCard.name}
              region={country.beanCard.region}
              flavorProfile={country.beanCard.flavorProfile}
              rarity={country.beanCard.rarity}
              entries={[]}
              isHighlighted={false}
            />
          ))}
      </MapContainer>

      {/* Legend - Updated to show coffee beans */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-[#E8E3DE] z-[1000]">
        <div className="flex items-center gap-1.5">
          <svg width="10" height="14" viewBox="0 0 24 30">
            <ellipse cx="12" cy="14" rx="7" ry="10" fill="#8B7355" stroke="#6B5344" strokeWidth="1" transform="rotate(-15 12 14)"/>
            <path d="M12 5 Q10 9 12 14 Q14 19 12 23" fill="none" stroke="#5C4433" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-15 12 14)"/>
          </svg>
          <span className="text-[#5C4F44] font-medium">Visited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="10" height="14" viewBox="0 0 24 30">
            <ellipse cx="12" cy="14" rx="7" ry="10" fill="#C4BDB3" stroke="#9A958C" strokeWidth="1" transform="rotate(-15 12 14)"/>
            <path d="M12 5 Q10 9 12 14 Q14 19 12 23" fill="none" stroke="#A8A298" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-15 12 14)"/>
          </svg>
          <span className="text-[#5C4F44] font-medium">Not visited</span>
        </div>
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  )
}
