'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { countries, roastLevels, brewMethods } from '@/lib/countries'

interface CoffeeFormProps {
  onSuccess?: (country: string) => void
}

export default function CoffeeForm({ onSuccess }: CoffeeFormProps) {
  const [originCountry, setOriginCountry] = useState('')
  const [roastLevel, setRoastLevel] = useState('')
  const [brewMethod, setBrewMethod] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPEG, PNG, WebP, or HEIC image.')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('Photo must be less than 5MB.')
      return
    }

    setPhotoFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearPhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null

    setUploadingPhoto(true)
    try {
      const formData = new FormData()
      formData.append('file', photoFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to upload photo')
      }

      const data = await response.json()
      return data.url
    } catch (err) {
      throw err
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!originCountry) {
      setError('Please select a country')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Upload photo first if selected
      let photoUrl: string | null = null
      if (photoFile) {
        photoUrl = await uploadPhoto()
      }

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
          photo_url: photoUrl,
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

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-[var(--espresso)] mb-2">
          Photo
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          onChange={handlePhotoSelect}
          className="hidden"
        />
        {photoPreview ? (
          <div className="relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[var(--latte)]">
              <Image
                src={photoPreview}
                alt="Coffee photo preview"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={clearPhoto}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-8 px-4 border-2 border-dashed border-[var(--latte)] rounded-lg text-[var(--coffee)] hover:border-[var(--coffee)] hover:bg-[var(--cream)]/50 transition flex flex-col items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span className="text-sm">Add a photo of your coffee</span>
          </button>
        )}
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
        {loading ? (uploadingPhoto ? 'Uploading photo...' : 'Adding...') : 'Add Coffee'}
      </button>
    </form>
  )
}
