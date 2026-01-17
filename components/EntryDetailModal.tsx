'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CoffeeIcon } from './icons/HandDrawnIcons'
import { getRoastLabel, getBrewLabel, formatEntryDate, type CoffeeEntry } from '@/lib/mapUtils'
import { getBeanCard } from '@/lib/countries'

interface EntryDetailModalProps {
  entry: CoffeeEntry | null
  onClose: () => void
}

export default function EntryDetailModal({ entry, onClose }: EntryDetailModalProps) {
  if (!entry) return null

  const beanCard = getBeanCard(entry.origin_country)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1100] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-[#F5F2EF] rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#6B5D52] px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8B7A69] rounded-full">
                  <CoffeeIcon size={20} color="#F5F2EF" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F5F2EF]">
                    {beanCard?.name || entry.origin_country}
                  </h3>
                  <p className="text-sm text-[#C4B8AC]">
                    {beanCard?.region || 'Coffee Origin'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#C4B8AC] hover:text-[#F5F2EF] transition text-2xl leading-none"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Date */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8B7A69] uppercase tracking-wide font-medium">Logged</span>
              <span className="text-[#5C4F44] font-semibold">
                {formatEntryDate(entry.created_at)}
              </span>
            </div>

            {/* Coffee Details */}
            <div className="grid grid-cols-2 gap-3">
              {entry.roast_level && (
                <div className="bg-[#FDFBF9] rounded-lg p-3 border border-[#E8E3DE]">
                  <p className="text-[10px] text-[#8B7A69] uppercase tracking-wide mb-1">Roast Level</p>
                  <p className="text-sm text-[#5C4F44] font-semibold">
                    {getRoastLabel(entry.roast_level)}
                  </p>
                </div>
              )}
              {entry.brew_method && (
                <div className="bg-[#FDFBF9] rounded-lg p-3 border border-[#E8E3DE]">
                  <p className="text-[10px] text-[#8B7A69] uppercase tracking-wide mb-1">Brew Method</p>
                  <p className="text-sm text-[#5C4F44] font-semibold">
                    {getBrewLabel(entry.brew_method)}
                  </p>
                </div>
              )}
            </div>

            {/* Flavor Profile */}
            {beanCard && (
              <div className="bg-[#FDFBF9] rounded-lg p-3 border border-[#E8E3DE]">
                <p className="text-[10px] text-[#8B7A69] uppercase tracking-wide mb-1">Flavor Profile</p>
                <p className="text-sm text-[#5C4F44]">{beanCard.flavorProfile}</p>
              </div>
            )}

            {/* Notes */}
            {entry.note && (
              <div className="bg-[#FDFBF9] rounded-lg p-4 border border-[#E8E3DE]">
                <p className="text-[10px] text-[#8B7A69] uppercase tracking-wide mb-2">My Notes</p>
                <p className="text-sm text-[#5C4F44] leading-relaxed whitespace-pre-wrap">
                  {entry.note}
                </p>
              </div>
            )}

            {/* No notes message */}
            {!entry.note && (
              <div className="bg-[#FDFBF9] rounded-lg p-4 border border-dashed border-[#D5CCC3] text-center">
                <p className="text-sm text-[#A8A39E] italic">No notes recorded for this entry</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-[#EBE6E1] border-t border-[#D5CCC3]">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#6B5D52] text-[#F5F2EF] rounded-lg font-semibold hover:bg-[#5C4F44] transition uppercase tracking-wide text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Country entries list modal (for visa cards)
interface CountryEntriesModalProps {
  countryCode: string | null
  entries: CoffeeEntry[]
  onClose: () => void
  onSelectEntry: (entry: CoffeeEntry) => void
}

export function CountryEntriesModal({ countryCode, entries, onClose, onSelectEntry }: CountryEntriesModalProps) {
  if (!countryCode) return null

  const beanCard = getBeanCard(countryCode)
  const countryEntries = entries.filter(e => e.origin_country === countryCode)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1100] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-[#F5F2EF] rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#6B5D52] px-5 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8B7A69] rounded-full">
                  <CoffeeIcon size={20} color="#F5F2EF" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F5F2EF]">
                    {beanCard?.name || countryCode}
                  </h3>
                  <p className="text-sm text-[#C4B8AC]">
                    {countryEntries.length} {countryEntries.length === 1 ? 'entry' : 'entries'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#C4B8AC] hover:text-[#F5F2EF] transition text-2xl leading-none"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Flavor Profile */}
          {beanCard && (
            <div className="px-5 py-3 bg-[#EBE6E1] border-b border-[#D5CCC3] flex-shrink-0">
              <p className="text-[10px] text-[#8B7A69] uppercase tracking-wide mb-1">Flavor Profile</p>
              <p className="text-sm text-[#5C4F44]">{beanCard.flavorProfile}</p>
            </div>
          )}

          {/* Entries List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-[10px] text-[#8B7A69] uppercase tracking-wide font-medium">
              Your Coffee Log
            </p>
            {countryEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="w-full text-left bg-[#FDFBF9] rounded-lg p-4 border border-[#E8E3DE] hover:border-[#9C8B7A] hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CoffeeIcon size={16} color="#8B7A69" />
                    <span className="text-sm font-semibold text-[#5C4F44]">
                      {entry.roast_level && getRoastLabel(entry.roast_level)}
                      {entry.roast_level && entry.brew_method && ' · '}
                      {entry.brew_method && getBrewLabel(entry.brew_method)}
                      {!entry.roast_level && !entry.brew_method && 'Coffee Entry'}
                    </span>
                  </div>
                  <span className="text-xs text-[#8B7A69]">
                    {formatEntryDate(entry.created_at)}
                  </span>
                </div>
                {entry.note && (
                  <p className="text-xs text-[#8B7A69] line-clamp-2 mt-1">
                    {entry.note}
                  </p>
                )}
                {!entry.note && (
                  <p className="text-xs text-[#B5B0AB] italic mt-1">
                    No notes
                  </p>
                )}
                <div className="flex items-center justify-end mt-2">
                  <span className="text-[10px] text-[#9C8B7A] uppercase tracking-wide">
                    Tap to view details →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-[#EBE6E1] border-t border-[#D5CCC3] flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#6B5D52] text-[#F5F2EF] rounded-lg font-semibold hover:bg-[#5C4F44] transition uppercase tracking-wide text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
