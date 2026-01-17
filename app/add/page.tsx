'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CoffeeForm from '@/components/CoffeeForm'
import { AnimatePresence, motion } from 'framer-motion'
import { getBeanCard, BeanCard } from '@/lib/countries'
import { CardReveal } from '@/components/BeanCard'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { CoffeeIcon } from '@/components/icons/HandDrawnIcons'

export default function AddCoffeePage() {
  const [showCardReveal, setShowCardReveal] = useState(false)
  const [unlockedCard, setUnlockedCard] = useState<BeanCard | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const handleSuccess = (countryCode: string) => {
    const card = getBeanCard(countryCode)
    if (card) {
      setUnlockedCard(card)
      setShowCardReveal(true)
    } else {
      // Fallback if card not found
      router.push(`/?new=${countryCode}`)
    }
  }

  const handleCardRevealComplete = () => {
    setShowCardReveal(false)
    if (unlockedCard) {
      router.push(`/?new=${unlockedCard.code}`)
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen pb-20 bg-[var(--cream)]">
        <header className="sticky top-0 z-10 bg-[var(--cream)] border-b border-[var(--latte)] px-4 py-4">
          <h1 className="text-2xl font-bold text-[var(--espresso)] text-center">
            Add Coffee
          </h1>
        </header>
        <div className="flex items-center justify-center py-20">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CoffeeIcon size={48} color="var(--coffee)" />
          </motion.div>
        </div>
        <Navbar />
      </div>
    )
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pb-20 bg-[var(--cream)]">
        <header className="sticky top-0 z-10 bg-[var(--cream)] border-b border-[var(--latte)] px-4 py-4">
          <h1 className="text-2xl font-bold text-[var(--espresso)] text-center">
            Add Coffee
          </h1>
        </header>
        <main className="max-w-lg mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-[var(--latte)] text-center"
          >
            <motion.div
              className="flex justify-center mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-4 bg-[#F5F2EF] rounded-full">
                <CoffeeIcon size={48} color="var(--coffee)" />
              </div>
            </motion.div>
            <h2 className="text-xl font-semibold text-[var(--espresso)] mb-2">
              Sign in to Add Coffee
            </h2>
            <p className="text-[var(--coffee)] mb-6">
              Create an account or sign in to start logging your coffee journey!
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full py-3 px-6 bg-[var(--espresso)] text-white rounded-xl font-semibold hover:bg-[#2A1A0D] transition shadow-md"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="w-full py-3 px-6 bg-white text-[var(--espresso)] rounded-xl font-semibold border border-[var(--latte)] hover:bg-[var(--cream)] transition"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </main>
        <Navbar />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--cream)] border-b border-[var(--latte)] px-4 py-4">
        <h1 className="text-2xl font-bold text-[var(--espresso)] text-center">
          Add Coffee
        </h1>
      </header>

      {/* Form */}
      <main className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--latte)]">
          <CoffeeForm onSuccess={handleSuccess} />
        </div>
      </main>

      {/* Card Reveal Animation */}
      <AnimatePresence>
        {showCardReveal && unlockedCard && (
          <CardReveal
            card={unlockedCard}
            onComplete={handleCardRevealComplete}
          />
        )}
      </AnimatePresence>

      <Navbar />
    </div>
  )
}
