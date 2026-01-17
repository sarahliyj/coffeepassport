'use client'

import dynamic from 'next/dynamic'
import { type CoffeeEntry } from '@/lib/mapUtils'

interface InteractiveMapProps {
  entries: CoffeeEntry[]
  highlightCountry?: string | null
  onViewNotes?: (entryId: string) => void
}

// Dynamic import to prevent SSR issues with Leaflet
const InteractiveMap = dynamic(
  () => import('./InteractiveMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full aspect-[2/1] bg-[var(--cream)] rounded-2xl overflow-hidden border-2 border-[var(--latte)] shadow-lg flex items-center justify-center">
        <div className="text-[var(--coffee)]">Loading map...</div>
      </div>
    ),
  }
)

export default InteractiveMap
export type { InteractiveMapProps }
