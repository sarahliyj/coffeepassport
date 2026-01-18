'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import InteractiveMap from '@/components/map/InteractiveMap'
import Navbar from '@/components/Navbar'
import CoffeeCalendar from '@/components/CoffeeCalendar'
import { motion, AnimatePresence } from 'framer-motion'
import { countries } from '@/lib/countries'
import {
  SparkleIcon,
  CoffeeIcon,
  GlobeIcon,
  PassportIcon,
  TargetIcon
} from '@/components/icons/HandDrawnIcons'

interface CoffeeEntry {
  id: string
  origin_country: string
  roast_level?: string
  brew_method?: string
  note?: string
  created_at: string
}

// Consistent section header component
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 px-1 mb-4">
      <div className="p-2 bg-[#F5F2EF] rounded-lg border border-[#E8E3DE]">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-[var(--espresso)]">{title}</h2>
    </div>
  )
}

// Decorative floating coffee beans
function FloatingBeans() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: `${20 + i * 15}%`,
            y: -20,
            rotate: 0,
            opacity: 0.12
          }}
          animate={{
            y: ['0%', '100%'],
            rotate: [0, 360],
            opacity: [0.12, 0.06, 0.12]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2
          }}
        >
          <svg width="24" height="30" viewBox="0 0 24 30">
            <ellipse cx="12" cy="14" rx="8" ry="11" fill="#C4A484" transform="rotate(-15 12 14)"/>
            <path d="M12 4 Q10 8 12 14 Q14 20 12 24" fill="none" stroke="#A08060" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-15 12 14)"/>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen pb-20 bg-[var(--cream)]">
      <div className="max-w-2xl mx-auto p-4">
        <motion.div
          className="flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CoffeeIcon size={64} color="var(--coffee)" />
          </motion.div>
          <motion.p
            className="mt-4 text-[var(--coffee)] text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Brewing your journey...
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

// Calendar icon component
function CalendarIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 2v4M16 2v4" />
    </svg>
  )
}

function HomeContent() {
  const [coffeeEntries, setCoffeeEntries] = useState<CoffeeEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightCountry, setHighlightCountry] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const searchParams = useSearchParams()
  const supabase = createClient()

  const fetchEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      if (!user) {
        setCoffeeEntries([])
        return
      }

      setLoading(true)
      const { data } = await supabase
        .from('coffee_entries')
        .select('id, origin_country, roast_level, brew_method, note, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setCoffeeEntries(data || [])
    } catch (error) {
      console.error('Error fetching entries:', error)
      setCoffeeEntries([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount and when window gains focus
  useEffect(() => {
    fetchEntries()

    const handleFocus = () => fetchEntries()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  useEffect(() => {
    const newCountry = searchParams.get('new')
    if (newCountry) {
      setHighlightCountry(newCountry)
      setTimeout(() => setHighlightCountry(null), 3000)
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams])

  const unlockedCountries = [...new Set(coffeeEntries.map(e => e.origin_country))]
  const totalCoffees = coffeeEntries.length
  const totalPossibleCountries = countries.length
  const progressPercentage = Math.round((unlockedCountries.length / totalPossibleCountries) * 100)

  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen pb-20 bg-[var(--cream)] relative">
      <FloatingBeans />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--latte)] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
          <PassportIcon size={28} color="var(--espresso)" />
          <h1 className="text-2xl font-bold text-[var(--espresso)]">
            Coffee Passport
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6 relative z-[1]">

        {/* Journey Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          <div className="p-5">
            <SectionHeader
              icon={<TargetIcon size={20} color="var(--coffee)" />}
              title="Your Coffee Journey"
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Coffees Stat */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#FDFBF9] rounded-xl p-4 border border-[#E8E3DE] flex items-center gap-3"
              >
                <div className="p-2.5 bg-[#F5F2EF] rounded-full">
                  <CoffeeIcon size={24} color="var(--coffee)" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--espresso)]">{totalCoffees}</div>
                  <div className="text-xs text-[var(--coffee)] uppercase tracking-wide">Coffees Logged</div>
                </div>
              </motion.div>

              {/* Countries Stat */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#FDFBF9] rounded-xl p-4 border border-[#E8E3DE] flex items-center gap-3"
              >
                <div className="p-2.5 bg-[#F5F2EF] rounded-full">
                  <GlobeIcon size={24} color="var(--sage)" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--espresso)]">{unlockedCountries.length}</div>
                  <div className="text-xs text-[var(--coffee)] uppercase tracking-wide">Origins Found</div>
                </div>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="bg-[#F5F2EF] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--coffee)] uppercase tracking-wide">
                  World Progress
                </span>
                <span className="text-xs font-semibold text-[var(--espresso)]">
                  {unlockedCountries.length} / {totalPossibleCountries} origins
                </span>
              </div>
              <div className="h-2 bg-[#E8E3DE] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--sage)] to-[#7A9B6D] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
              </div>
              <p className="text-[10px] text-[#A8A39E] mt-1.5 text-center">
                {progressPercentage}% of coffee origins explored
              </p>
            </div>
          </div>
        </motion.div>

        {/* New Country Toast */}
        <AnimatePresence>
          {highlightCountry && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 bg-[var(--sage)] text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
            >
              <SparkleIcon size={18} color="white" />
              <span className="font-medium">{getCountryName(highlightCountry)} added!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          <div className="p-5">
            <SectionHeader
              icon={<GlobeIcon size={20} color="var(--sage)" />}
              title="Origin Map"
            />
            <InteractiveMap
              entries={coffeeEntries}
              highlightCountry={highlightCountry}
            />
          </div>
        </motion.div>

        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          <div className="p-5">
            <SectionHeader
              icon={<CalendarIcon size={20} color="var(--coffee)" />}
              title="Coffee Calendar"
            />
            <CoffeeCalendar entries={coffeeEntries} />
          </div>
        </motion.div>

        {/* Empty State */}
        {coffeeEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
          >
            <div className="p-8 text-center">
              <motion.div
                className="flex justify-center mb-4"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="p-4 bg-[#F5F2EF] rounded-full">
                  <CoffeeIcon size={48} color="var(--coffee)" />
                </div>
              </motion.div>
              <h2 className="text-xl font-semibold text-[var(--espresso)] mb-2">
                Start Your Journey
              </h2>
              <p className="text-[var(--coffee)] mb-5 max-w-xs mx-auto">
                {isAuthenticated
                  ? "Log your first coffee to see your passport come alive with origins from around the world!"
                  : "Sign in to start logging your coffee journey from around the world!"}
              </p>
              {isAuthenticated ? (
                <a
                  href="/add"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--espresso)] text-white rounded-xl font-semibold hover:bg-[#2A1A0D] transition shadow-md"
                >
                  <CoffeeIcon size={20} color="white" />
                  Add Your First Coffee
                </a>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--espresso)] text-white rounded-xl font-semibold hover:bg-[#2A1A0D] transition shadow-md"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[var(--espresso)] rounded-xl font-semibold border border-[var(--latte)] hover:bg-[var(--cream)] transition"
                  >
                    Create Account
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Footer spacer for navbar */}
        <div className="h-4" />
      </main>

      <Navbar />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  )
}
