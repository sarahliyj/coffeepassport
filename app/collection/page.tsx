'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { beanCards, getBeanCard, Rarity } from '@/lib/countries'
import BeanCard from '@/components/BeanCard'
import Navbar from '@/components/Navbar'

interface CollectedBean {
  origin_country: string
  first_collected: string
}

export default function CollectionPage() {
  const [collectedBeans, setCollectedBeans] = useState<CollectedBean[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Rarity | 'all'>('all')
  const supabase = createClient()

  useEffect(() => {
    const fetchCollection = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get first collected date for each country
      const { data } = await supabase
        .from('coffee_entries')
        .select('origin_country, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (data) {
        // Group by country and get first date
        const countryMap = new Map<string, string>()
        data.forEach((entry: { origin_country: string; created_at: string }) => {
          if (!countryMap.has(entry.origin_country)) {
            countryMap.set(entry.origin_country, entry.created_at)
          }
        })

        const collected = Array.from(countryMap.entries()).map(([country, date]) => ({
          origin_country: country,
          first_collected: date,
        }))

        setCollectedBeans(collected)
      }
      setLoading(false)
    }

    fetchCollection()
  }, [supabase])

  const isUnlocked = (code: string) => collectedBeans.some(b => b.origin_country === code)
  const getFirstCollected = (code: string) => collectedBeans.find(b => b.origin_country === code)?.first_collected

  const filteredCards = filter === 'all'
    ? beanCards
    : beanCards.filter(card => card.rarity === filter)

  const unlockedCount = collectedBeans.length
  const totalCount = beanCards.length
  const legendaryCount = collectedBeans.filter(b => getBeanCard(b.origin_country)?.rarity === 'legendary').length
  const rareCount = collectedBeans.filter(b => getBeanCard(b.origin_country)?.rarity === 'rare').length
  const commonCount = collectedBeans.filter(b => getBeanCard(b.origin_country)?.rarity === 'common').length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--coffee)]">Loading passport...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-[#F5F2EF]">
      {/* Header - Passport style with Morandi colors */}
      <header className="sticky top-0 z-10 bg-[#6B5D52] border-b-4 border-[#8B7A69] px-4 py-4">
        <h1 className="text-2xl font-bold text-[#F5F2EF] text-center tracking-wider uppercase">
          Coffee Passport
        </h1>
        <p className="text-center text-[#C4B8AC] text-xs mt-1 tracking-widest">VISA COLLECTION</p>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Stats - Passport page style with Morandi colors */}
        <div className="bg-[#FDFBF9] rounded-lg p-5 border-2 border-[#9C8B7A] shadow-sm relative overflow-hidden">
          {/* Passport texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#5C4F44] font-semibold uppercase tracking-wide text-sm">Visa Progress</span>
              <span className="text-[#8B7A69] text-sm font-bold">{unlockedCount} / {totalCount}</span>
            </div>
            <div className="h-3 bg-[#EBE6E1] rounded-full overflow-hidden mb-4 border border-[#D5CCC3]">
              <div
                className="h-full bg-gradient-to-r from-[#9C8B7A] to-[#6B5D52] rounded-full transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
            <div className="flex justify-around text-center">
              <div className="px-3 py-2 bg-[#F5F0EB] rounded-lg border border-[#D5C8BB]">
                <div className="text-[#8A7A50] font-bold text-lg">{legendaryCount}/5</div>
                <div className="text-[#9A8A60] text-xs uppercase tracking-wide">Legendary</div>
              </div>
              <div className="px-3 py-2 bg-[#F2F0F5] rounded-lg border border-[#D0CCD8]">
                <div className="text-[#706890] font-bold text-lg">{rareCount}/12</div>
                <div className="text-[#8078A0] text-xs uppercase tracking-wide">Rare</div>
              </div>
              <div className="px-3 py-2 bg-[#F5F3F0] rounded-lg border border-[#D5D0CB]">
                <div className="text-[#6B6058] font-bold text-lg">{commonCount}/{beanCards.filter(b => b.rarity === 'common').length}</div>
                <div className="text-[#8B8078] text-xs uppercase tracking-wide">Common</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs - Passport tabs style with Morandi colors */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'legendary', 'rare', 'common'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition uppercase tracking-wide border-2 ${
                filter === f
                  ? 'bg-[#6B5D52] text-[#F5F2EF] border-[#6B5D52]'
                  : 'bg-[#FDFBF9] text-[#5C4F44] border-[#D5CCC3] hover:border-[#9C8B7A]'
              }`}
            >
              {f === 'all' ? 'All Visas' : f}
            </button>
          ))}
        </div>

        {/* Visa Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredCards.map((card) => (
            <BeanCard
              key={card.code}
              card={card}
              unlocked={isUnlocked(card.code)}
              firstCollectedDate={getFirstCollected(card.code)}
            />
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-8 text-[#8B7A69] bg-[#FDFBF9] rounded-lg border-2 border-dashed border-[#D5CCC3]">
            No visas in this category yet
          </div>
        )}
      </main>

      <Navbar />
    </div>
  )
}
