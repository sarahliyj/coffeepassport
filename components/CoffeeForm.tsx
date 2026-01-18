'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { countries, roastLevels, brewMethods } from '@/lib/countries'
import { createClient } from '@/lib/supabase/client'

interface CoffeeFormProps {
  onSuccess?: (country: string) => void
  onLoginRequired?: () => void
}

export default function CoffeeForm({ onSuccess, onLoginRequired }: CoffeeFormProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [originCountry, setOriginCountry] = useState('')
  const [roastLevel, setRoastLevel] = useState('')
  const [brewMethod, setBrewMethod] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
      } catch {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if user is authenticated
    if (!isAuthenticated) {
      if (onLoginRequired) {
        onLoginRequired()
      } else {
        setError('Please sign in to add coffee')
      }
      return
    }

    if (!originCountry) {
      setError('Please select a country')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin_country: originCountry,
          roast_level: roastLevel || null,
          brew_method: brewMethod || null,
          note: note || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add coffee')
      }

      if (onSuccess) {
        onSuccess(originCountry)
      } else {
        router.push(`/?new=${originCountry}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  const selectCountry = (countryCode: string, countryName: string) => {
    setOriginCountry(countryCode)
    setSearchQuery(countryName)
    setShowDropdown(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Country Selection */}
      <div className="relative">
        <label className="block text-sm font-medium text-[var(--espresso)] mb-2">
          Bean Origin Country <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowDropdown(true)
            setOriginCountry('')
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a country..."
          className="w-full px-4 py-3 rounded-lg border border-[var(--latte)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--coffee)] transition"
        />
        {showDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--latte)] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => selectCountry(country.code, country.name)}
                  className="w-full px-4 py-2 text-left hover:bg-[var(--cream)] transition"
                >
                  {country.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-[var(--coffee)]">No countries found</div>
            )}
          </div>
        )}
      </div>

      {/* Roast Level */}
      <div>
        <label className="block text-sm font-medium text-[var(--espresso)] mb-2">
          Roast Level
        </label>
        <div className="flex flex-wrap gap-2">
          {roastLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setRoastLevel(roastLevel === level.value ? '' : level.value)}
              className={`px-4 py-2 rounded-full border transition ${
                roastLevel === level.value
                  ? 'bg-[var(--coffee)] text-white border-[var(--coffee)]'
                  : 'bg-white border-[var(--latte)] text-[var(--espresso)] hover:border-[var(--coffee)]'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brew Method */}
      <div>
        <label className="block text-sm font-medium text-[var(--espresso)] mb-2">
          Brew Method
        </label>
        <div className="flex flex-wrap gap-2">
          {brewMethods.slice(0, 6).map((method) => (
            <button
              key={method.value}
              type="button"
              onClick={() => setBrewMethod(brewMethod === method.value ? '' : method.value)}
              className={`px-4 py-2 rounded-full border transition ${
                brewMethod === method.value
                  ? 'bg-[var(--coffee)] text-white border-[var(--coffee)]'
                  : 'bg-white border-[var(--latte)] text-[var(--espresso)] hover:border-[var(--coffee)]'
              }`}
            >
              {method.label}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-[var(--espresso)] mb-2">
          Memory or Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What made this coffee special?"
          maxLength={280}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-[var(--latte)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--coffee)] transition resize-none"
        />
        <div className="text-right text-xs text-[var(--coffee)] mt-1">
          {note.length}/280
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !originCountry}
        className="w-full py-4 px-6 bg-[var(--coffee)] text-white rounded-xl font-medium text-lg hover:bg-[var(--espresso)] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {loading ? 'Adding...' : 'Add Coffee'}
      </button>
    </form>
  )
}
