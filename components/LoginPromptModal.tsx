'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CoffeeIcon } from '@/components/icons/HandDrawnIcons'

interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function LoginPromptModal({
  isOpen,
  onClose,
  title = "Sign in to Continue",
  message = "Create an account or sign in to start your coffee journey!"
}: LoginPromptModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-[var(--latte)] overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 text-[var(--coffee)] hover:bg-[var(--cream)] rounded-full transition z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Content */}
              <div className="p-6 pt-8 text-center">
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="p-4 bg-[#F5F2EF] rounded-full">
                    <CoffeeIcon size={40} color="var(--coffee)" />
                  </div>
                </motion.div>

                <h2 className="text-xl font-semibold text-[var(--espresso)] mb-2">
                  {title}
                </h2>
                <p className="text-[var(--coffee)] mb-6 text-sm">
                  {message}
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="w-full py-3 px-6 bg-[var(--espresso)] text-white rounded-xl font-semibold hover:bg-[#2A1A0D] transition shadow-md text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full py-3 px-6 bg-white text-[var(--espresso)] rounded-xl font-semibold border border-[var(--latte)] hover:bg-[var(--cream)] transition text-center"
                  >
                    Create Account
                  </Link>
                </div>

                <button
                  onClick={onClose}
                  className="mt-4 text-sm text-[var(--coffee)] hover:text-[var(--espresso)] transition"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
