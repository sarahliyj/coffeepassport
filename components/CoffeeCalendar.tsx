'use client'

import { useState } from 'react'
import { countries } from '@/lib/countries'
import { CoffeeIcon } from './icons/HandDrawnIcons'

interface CoffeeEntry {
  id: string
  origin_country: string
  created_at: string
}

interface CoffeeCalendarProps {
  entries: CoffeeEntry[]
}

export default function CoffeeCalendar({ entries }: CoffeeCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code
  }

  // Get first and last day of current month
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Group entries by date
  const entriesByDate = new Map<string, CoffeeEntry[]>()
  entries.forEach(entry => {
    const date = new Date(entry.created_at)
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    if (!entriesByDate.has(dateKey)) {
      entriesByDate.set(dateKey, [])
    }
    entriesByDate.get(dateKey)!.push(entry)
  })

  const getEntriesForDate = (day: number): CoffeeEntry[] => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return entriesByDate.get(dateKey) || []
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(null)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const today = new Date()
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    )
  }

  const selectedEntries = selectedDate
    ? getEntriesForDate(selectedDate.getDate())
    : []

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-[var(--cream)] rounded-lg transition"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-[var(--espresso)]">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-[var(--cream)] rounded-lg transition"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-[var(--latte)] p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div
              key={day}
              className="text-center text-xs font-medium text-[var(--coffee)] py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayEntries = getEntriesForDate(day)
            const hasEntries = dayEntries.length > 0

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(new Date(year, month, day))}
                className={`
                  aspect-square rounded-lg border-2 transition-all relative
                  ${isToday(day) 
                    ? 'border-[var(--coffee)] bg-[var(--cream)]' 
                    : 'border-transparent hover:border-[var(--latte)]'
                  }
                  ${isSelected(day)
                    ? 'bg-[var(--sage)] border-[var(--coffee)]'
                    : ''
                  }
                  ${hasEntries ? 'bg-[var(--cream)]' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full p-1">
                  <span
                    className={`
                      text-sm font-medium
                      ${isToday(day) 
                        ? 'text-[var(--coffee)]' 
                        : isSelected(day)
                        ? 'text-[var(--espresso)]'
                        : 'text-[var(--espresso)]'
                      }
                    `}
                  >
                    {day}
                  </span>
                  {hasEntries && (
                    <div className="flex gap-0.5 mt-0.5 items-center">
                      {dayEntries.slice(0, 3).map((entry) => (
                        <span
                          key={entry.id}
                          title={getCountryName(entry.origin_country)}
                        >
                          <CoffeeIcon size={10} color="var(--coffee)" />
                        </span>
                      ))}
                      {dayEntries.length > 3 && (
                        <span className="text-[8px] text-[var(--coffee)]">
                          +{dayEntries.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && selectedEntries.length > 0 && (
        <div className="bg-white rounded-xl border border-[var(--latte)] p-4">
          <h4 className="text-lg font-semibold text-[var(--espresso)] mb-3">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          <div className="space-y-2">
            {selectedEntries.map(entry => (
              <div
                key={entry.id}
                className="flex items-center gap-3 py-2 border-b border-[var(--cream)] last:border-0"
              >
                <CoffeeIcon size={20} color="var(--coffee)" />
                <span className="font-medium text-[var(--espresso)] flex-1">
                  {getCountryName(entry.origin_country)}
                </span>
                <span className="text-xs text-[var(--coffee)]">
                  {new Date(entry.created_at).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedEntries.length === 0 && (
        <div className="bg-white rounded-xl border border-[var(--latte)] p-4 text-center text-[var(--coffee)]">
          No coffees logged on this date
        </div>
      )}
    </div>
  )
}
