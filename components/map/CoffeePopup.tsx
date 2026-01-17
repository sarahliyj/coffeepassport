'use client'

import { getRarityColor, type Rarity } from '@/lib/countries'
import { formatEntryDate, getRoastLabel, getBrewLabel, type CoffeeEntry } from '@/lib/mapUtils'
import { CoffeeIcon } from '@/components/icons/HandDrawnIcons'

interface CoffeePopupProps {
  countryName: string
  region: string
  flavorProfile: string
  rarity: Rarity
  entries: CoffeeEntry[]
  onEntryClick?: (entry: CoffeeEntry) => void
}

export default function CoffeePopup({
  countryName,
  region,
  flavorProfile,
  rarity,
  entries,
  onEntryClick,
}: CoffeePopupProps) {
  const rarityColors = getRarityColor(rarity)

  return (
    <div className="min-w-[240px] max-w-[300px] font-sans">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold text-[#5C4F44] leading-tight">
            {countryName}
          </h3>
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${rarityColors.bg} ${rarityColors.text} ${rarityColors.border} border`}
          >
            {rarity}
          </span>
        </div>
        <p className="text-sm text-[#8B7A69]">{region}</p>
      </div>

      {/* Flavor Profile */}
      <div className="mb-3 p-2 bg-[#F5F2EF] rounded-lg border border-[#E8E3DE]">
        <p className="text-[10px] font-medium text-[#8B7A69] uppercase tracking-wide mb-1">Flavor Profile</p>
        <p className="text-sm text-[#5C4F44]">{flavorProfile}</p>
      </div>

      {/* Coffee Entries */}
      {entries.length > 0 && (
        <div>
          <p className="text-[10px] font-medium text-[#8B7A69] uppercase tracking-wide mb-2">
            Coffees Tried ({entries.length})
          </p>
          <div className="space-y-2 max-h-[180px] overflow-y-auto">
            {entries.slice(0, 5).map((entry) => (
              <button
                key={entry.id}
                onClick={() => onEntryClick?.(entry)}
                className="w-full text-left p-2.5 bg-white rounded-lg border border-[#E8E3DE] text-xs hover:border-[#9C8B7A] hover:shadow-sm transition cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CoffeeIcon size={14} color="#8B7A69" />
                  <span className="text-[#5C4F44] font-semibold flex-1">
                    {entry.roast_level && getRoastLabel(entry.roast_level)}
                    {entry.roast_level && entry.brew_method && ' · '}
                    {entry.brew_method && getBrewLabel(entry.brew_method)}
                    {!entry.roast_level && !entry.brew_method && 'Coffee Entry'}
                  </span>
                  <span className="text-[#A8A39E] text-[10px]">
                    {formatEntryDate(entry.created_at)}
                  </span>
                </div>
                {entry.note && (
                  <p className="text-[#8B7A69] line-clamp-1 pl-5">
                    {entry.note}
                  </p>
                )}
                <div className="flex items-center justify-end mt-1.5">
                  <span className="text-[9px] text-[#9C8B7A] uppercase tracking-wide">
                    View details →
                  </span>
                </div>
              </button>
            ))}
            {entries.length > 5 && (
              <p className="text-xs text-center text-[#8B7A69] py-1">
                +{entries.length - 5} more entries
              </p>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {entries.length === 0 && (
        <p className="text-sm text-[#8B7A69] italic">
          You haven&apos;t tried coffee from here yet!
        </p>
      )}
    </div>
  )
}
