'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CoffeeForm from '@/components/CoffeeForm'
import { AnimatePresence, motion } from 'framer-motion'
import { getBeanCard, BeanCard } from '@/lib/countries'
import { CardReveal } from '@/components/BeanCard'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { CoffeeIcon } from '@/components/icons/HandDrawnIcons'
import LoginPromptModal from '@/components/LoginPromptModal'

export default function AddCoffeePage() {
  const [showCardReveal, setShowCardReveal] = useState(false)
  const [unlockedCard, setUnlockedCard] = useState<BeanCard | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
      } catch (error) {
        console.error('Error checking auth:', error)
        setIsAuthenticated(false)
      }
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
          <CoffeeForm
            onSuccess={handleSuccess}
            onLoginRequired={() => setShowLoginModal(true)}
          />
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

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign in to Add Coffee"
        message="Create an account or sign in to save your coffee entries and track your journey!"
      />

      <Navbar />
    </div>
  )
}
