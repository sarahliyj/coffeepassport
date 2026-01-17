'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CoffeeForm from '@/components/CoffeeForm'
import { AnimatePresence } from 'framer-motion'
import { getBeanCard, BeanCard } from '@/lib/countries'
import { CardReveal } from '@/components/BeanCard'
import Navbar from '@/components/Navbar'

export default function AddCoffeePage() {
  const [showCardReveal, setShowCardReveal] = useState(false)
  const [unlockedCard, setUnlockedCard] = useState<BeanCard | null>(null)
  const router = useRouter()

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
