'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getBeanCard } from '@/lib/countries'
import Navbar from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TwinsIcon,
  CoffeeIcon,
  GlobeIcon,
  LocationIcon,
  SearchIcon,
  HandshakeIcon,
  CopyIcon,
  TargetIcon,
  TrophyIcon,
  GoldMedalIcon,
  SilverMedalIcon,
  BronzeMedalIcon,
} from '@/components/icons/HandDrawnIcons'

interface CoffeeTwin {
  country: string
  count: number
  cities: string[]
}

interface CommunityStats {
  totalUsers: number
  totalCoffees: number
  coffeesToday: number
  topCountries: { country: string; count: number }[]
}

interface FriendComparison {
  friendCode: string
  friendName: string
  overlap: string[]
  friendTotal: number
}

export default function ExplorePage() {
  const [coffeeTwins, setCoffeeTwins] = useState<CoffeeTwin[]>([])
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [userCountries, setUserCountries] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [friendCode, setFriendCode] = useState('')
  const [myCode, setMyCode] = useState('')
  const [friendComparison, setFriendComparison] = useState<FriendComparison | null>(null)
  const [comparingFriend, setComparingFriend] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Get user's code (using first 8 chars of user id)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setMyCode(user.id.substring(0, 8).toUpperCase())
        }

        const response = await fetch('/api/community')
        if (response.ok) {
          const data = await response.json()
          setCoffeeTwins(data.coffeeTwins || [])
          setStats(data.stats)
          setUserCountries(data.userCountries || [])
        }
      } catch (error) {
        console.error('Failed to fetch community data:', error)
      }
      setLoading(false)
    }

    fetchCommunityData()
  }, [])

  const compareFriend = async () => {
    if (!friendCode.trim()) return
    setComparingFriend(true)

    // Simulate friend comparison (in production, this would query the friend's data)
    // For demo, generate mock data
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockFriendCountries = ['ET', 'CO', 'BR', 'KE', 'GT', 'CR', 'ID', 'VN']
    const overlap = userCountries.filter(c => mockFriendCountries.includes(c))

    setFriendComparison({
      friendCode: friendCode.toUpperCase(),
      friendName: `Coffee Lover #${friendCode.substring(0, 4)}`,
      overlap,
      friendTotal: mockFriendCountries.length,
    })
    setComparingFriend(false)
  }

  const getCountryName = (code: string) => {
    return getBeanCard(code)?.name || code
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--coffee)]">Exploring the community...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--cream)] border-b border-[var(--latte)] px-4 py-4">
        <h1 className="text-2xl font-bold text-[var(--espresso)] text-center">
          Explore
        </h1>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Coffee Twins Section */}
        <section className="bg-white rounded-2xl shadow-lg p-5 border border-[var(--latte)]">
          <div className="flex items-center gap-2 mb-4">
            <TwinsIcon size={24} color="var(--coffee)" />
            <h2 className="text-lg font-semibold text-[var(--espresso)]">Coffee Twins</h2>
          </div>

          {coffeeTwins.length > 0 ? (
            <div className="space-y-3">
              {coffeeTwins.map((twin, index) => (
                <motion.div
                  key={twin.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--cream)] rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[var(--espresso)] font-medium">
                        {twin.count} {twin.count === 1 ? 'person' : 'people'} also drank
                      </p>
                      <p className="text-[var(--coffee)] text-lg font-semibold flex items-center gap-1">
                        {getCountryName(twin.country)} <CoffeeIcon size={16} color="var(--coffee)" />
                      </p>
                    </div>
                    <GlobeIcon size={24} color="var(--latte)" />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {twin.cities.map((city, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white px-2 py-1 rounded-full text-[var(--coffee)] flex items-center gap-1"
                      >
                        <LocationIcon size={10} color="var(--coffee)" /> {city}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-2">
                <SearchIcon size={40} color="var(--latte)" />
              </div>
              <p className="text-[var(--coffee)]">
                No coffee twins today yet!
              </p>
              <p className="text-sm text-[var(--latte)] mt-1">
                Add a coffee to find your twins
              </p>
            </div>
          )}
        </section>

        {/* Friend Compare Section */}
        <section className="bg-white rounded-2xl shadow-lg p-5 border border-[var(--latte)]">
          <div className="flex items-center gap-2 mb-4">
            <HandshakeIcon size={24} color="var(--coffee)" />
            <h2 className="text-lg font-semibold text-[var(--espresso)]">Compare with Friends</h2>
          </div>

          {/* Your Code */}
          <div className="bg-[var(--cream)] rounded-xl p-4 mb-4">
            <p className="text-sm text-[var(--coffee)] mb-1">Your Friend Code</p>
            <div className="flex items-center justify-between">
              <code className="text-xl font-mono font-bold text-[var(--espresso)] tracking-wider">
                {myCode}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(myCode)}
                className="text-sm text-[var(--coffee)] hover:text-[var(--espresso)] transition flex items-center gap-1"
              >
                <CopyIcon size={14} color="currentColor" /> Copy
              </button>
            </div>
          </div>

          {/* Enter Friend Code */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
              placeholder="Enter friend's code"
              maxLength={8}
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--latte)] bg-[var(--cream)] focus:outline-none focus:ring-2 focus:ring-[var(--coffee)] font-mono uppercase"
            />
            <button
              onClick={compareFriend}
              disabled={comparingFriend || !friendCode.trim()}
              className="px-4 py-3 bg-[var(--coffee)] text-white rounded-xl font-medium hover:bg-[var(--espresso)] transition disabled:opacity-50"
            >
              {comparingFriend ? '...' : 'Compare'}
            </button>
          </div>

          {/* Comparison Result */}
          <AnimatePresence>
            {friendComparison && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gradient-to-br from-[var(--sage)]/20 to-[var(--cream)] rounded-xl p-4 border border-[var(--sage)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-[var(--coffee)]">Comparing with</p>
                    <p className="font-semibold text-[var(--espresso)]">
                      {friendComparison.friendName}
                    </p>
                  </div>
                  <button
                    onClick={() => setFriendComparison(null)}
                    className="text-[var(--coffee)] hover:text-[var(--espresso)] text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="text-4xl font-bold text-[var(--espresso)] mb-1"
                  >
                    {friendComparison.overlap.length}
                  </motion.div>
                  <p className="text-[var(--coffee)]">countries in common!</p>
                </div>

                {friendComparison.overlap.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {friendComparison.overlap.map((country) => (
                      <span
                        key={country}
                        className="text-xs bg-white px-2 py-1 rounded-full text-[var(--espresso)] border border-[var(--latte)]"
                      >
                        {getCountryName(country)}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[var(--latte)] flex justify-around text-center">
                  <div>
                    <div className="text-lg font-bold text-[var(--espresso)]">{userCountries.length}</div>
                    <div className="text-xs text-[var(--coffee)]">Your countries</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--espresso)]">{friendComparison.friendTotal}</div>
                    <div className="text-xs text-[var(--coffee)]">Their countries</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Global Stats Section */}
        <section className="bg-white rounded-2xl shadow-lg p-5 border border-[var(--latte)]">
          <div className="flex items-center gap-2 mb-4">
            <GlobeIcon size={24} color="var(--coffee)" />
            <h2 className="text-lg font-semibold text-[var(--espresso)]">Community Stats</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-[var(--cream)] rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-[var(--espresso)]">
                {stats?.totalUsers || 0}
              </div>
              <div className="text-xs text-[var(--coffee)]">Explorers</div>
            </div>
            <div className="bg-[var(--cream)] rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-[var(--espresso)]">
                {stats?.totalCoffees || 0}
              </div>
              <div className="text-xs text-[var(--coffee)]">Coffees</div>
            </div>
            <div className="bg-[var(--cream)] rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-[var(--espresso)]">
                {stats?.coffeesToday || 0}
              </div>
              <div className="text-xs text-[var(--coffee)]">Today</div>
            </div>
          </div>

          {/* Top Countries */}
          {stats?.topCountries && stats.topCountries.length > 0 && (
            <div>
              <p className="text-sm text-[var(--coffee)] mb-2">Most Popular Origins</p>
              <div className="space-y-2">
                {stats.topCountries.map((item, index) => (
                  <div key={item.country} className="flex items-center gap-3">
                    <span>
                      {index === 0 ? (
                        <GoldMedalIcon size={20} />
                      ) : index === 1 ? (
                        <SilverMedalIcon size={20} />
                      ) : index === 2 ? (
                        <BronzeMedalIcon size={20} />
                      ) : (
                        <CoffeeIcon size={18} color="var(--coffee)" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--espresso)]">
                          {getCountryName(item.country)}
                        </span>
                        <span className="text-xs text-[var(--coffee)]">
                          {item.count} cups
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--cream)] rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-[var(--coffee)] rounded-full"
                          style={{
                            width: `${(item.count / (stats.topCountries[0]?.count || 1)) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Daily Challenge Teaser */}
        <section className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg p-5 border border-amber-300">
          <div className="flex items-center gap-2 mb-2">
            <TargetIcon size={24} color="#92400e" />
            <h2 className="text-lg font-semibold text-amber-800">Daily Challenge</h2>
          </div>
          <p className="text-amber-700 mb-3">
            Try coffee from <strong>Africa</strong> today to earn bonus stamps!
          </p>
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <TrophyIcon size={16} color="#d97706" />
            <span>23 explorers completed this today</span>
          </div>
        </section>
      </main>

      <Navbar />
    </div>
  )
}
