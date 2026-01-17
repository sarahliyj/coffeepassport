'use client'

import { motion } from 'framer-motion'
import { BeanCard as BeanCardType, getRarityColor } from '@/lib/countries'
import {
  AfricaIcon,
  SouthAmericaIcon,
  CentralAmericaIcon,
  AsiaIcon,
  CaribbeanIcon,
  OceaniaIcon,
  MiddleEastIcon,
  CoffeeIcon,
  LockIcon,
  StarIcon,
  DiamondIcon,
} from './icons/HandDrawnIcons'
import { ReactNode } from 'react'

interface BeanCardProps {
  card: BeanCardType
  unlocked: boolean
  firstCollectedDate?: string
  onClick?: () => void
  animate?: boolean
}

// Coffee bean SVG component for decorations
function CoffeeBeanDecoration({ size = 24, color = '#8B7355', opacity = 0.15, rotation = 0 }: {
  size?: number
  color?: string
  opacity?: number
  rotation?: number
}) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      style={{ opacity, transform: `rotate(${rotation}deg)` }}
    >
      <ellipse cx="12" cy="17" rx="9" ry="14" fill={color} />
      <path
        d="M12 4 Q9 10 12 17 Q15 24 12 30"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  )
}

// Morandi color palette - muted, dusty, sophisticated
const getRegionStyle = (region: string): {
  borderColor: string
  textColor: string
  bgColor: string
  accentColor: string
  stampColor: string
  beanColor: string
  icon: (size: number) => ReactNode
} => {
  switch (region) {
    case 'Africa':
      return {
        borderColor: '#9C8B7A',    // Muted warm brown
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F5F0EB]',   // Warm off-white
        accentColor: '#E8E0D8',    // Soft cream
        stampColor: '#8B7A69',
        beanColor: '#A69485',
        icon: (size: number) => <AfricaIcon size={size} color="#8B7A69" />,
      }
    case 'South America':
      return {
        borderColor: '#7A8B7A',    // Muted sage green
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F2F5F0]',   // Soft greenish white
        accentColor: '#E0E8DC',    // Pale sage
        stampColor: '#6B7B6B',
        beanColor: '#8A9A8A',
        icon: (size: number) => <SouthAmericaIcon size={size} color="#6B7B6B" />,
      }
    case 'Central America':
      return {
        borderColor: '#A08872',    // Dusty terracotta
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F8F3EE]',   // Warm cream
        accentColor: '#EBE2D8',    // Soft tan
        stampColor: '#917963',
        beanColor: '#B09880',
        icon: (size: number) => <CentralAmericaIcon size={size} color="#917963" />,
      }
    case 'Asia':
      return {
        borderColor: '#8B7878',    // Muted dusty rose
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F5F0F0]',   // Soft pink-white
        accentColor: '#E8DEDE',    // Pale rose
        stampColor: '#7A6868',
        beanColor: '#9A8888',
        icon: (size: number) => <AsiaIcon size={size} color="#7A6868" />,
      }
    case 'Caribbean':
      return {
        borderColor: '#7A8B8B',    // Muted teal
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F0F4F4]',   // Soft blue-white
        accentColor: '#DCE5E5',    // Pale teal
        stampColor: '#6A7A7A',
        beanColor: '#8A9A9A',
        icon: (size: number) => <CaribbeanIcon size={size} color="#6A7A7A" />,
      }
    case 'Oceania':
      return {
        borderColor: '#7A7F8B',    // Muted slate blue
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F0F2F5]',   // Soft grey-blue
        accentColor: '#DCDFE8',    // Pale lavender
        stampColor: '#6A6F7A',
        beanColor: '#8A8F9A',
        icon: (size: number) => <OceaniaIcon size={size} color="#6A6F7A" />,
      }
    case 'Middle East':
      return {
        borderColor: '#9A917A',    // Muted ochre
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F5F3EE]',   // Warm ivory
        accentColor: '#E8E4D8',    // Soft gold
        stampColor: '#8A816A',
        beanColor: '#AAA18A',
        icon: (size: number) => <MiddleEastIcon size={size} color="#8A816A" />,
      }
    default:
      return {
        borderColor: '#8B8178',    // Warm grey
        textColor: 'text-stone-700',
        bgColor: 'bg-[#F5F2EF]',   // Neutral cream
        accentColor: '#E5E0DB',    // Soft grey
        stampColor: '#7A7168',
        beanColor: '#9A9088',
        icon: (size: number) => <CoffeeIcon size={size} color="#7A7168" />,
      }
  }
}

export default function BeanCard({ card, unlocked, firstCollectedDate, onClick }: BeanCardProps) {
  const regionStyle = getRegionStyle(card.region)

  if (!unlocked) {
    // Locked visa - faded passport page style
    return (
      <div
        className="relative bg-[#F5F2EF] rounded-sm p-4 border-2 border-dashed border-[#D5D0CB]"
        style={{
          minHeight: '180px',
          backgroundImage: `
            linear-gradient(90deg, transparent 0px, transparent 100%),
            repeating-linear-gradient(0deg, transparent, transparent 19px, #E8E3DE 19px, #E8E3DE 20px)
          `,
        }}
      >
        {/* Faded coffee bean watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CoffeeBeanDecoration size={48} color="#C5C0BB" opacity={0.2} rotation={-20} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="opacity-40 mb-2">
            <LockIcon size={28} color="#A8A39E" />
          </div>
          <div className="text-[#9A958F] text-xs font-semibold uppercase tracking-widest">Undiscovered</div>
          <div className="text-[#B5B0AB] text-[10px] mt-1 tracking-wide">Travel here to unlock</div>
        </div>
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[#D5D0CB] opacity-50" />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[#D5D0CB] opacity-50" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[#D5D0CB] opacity-50" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[#D5D0CB] opacity-50" />
      </div>
    )
  }

  // Unlocked visa stamp
  return (
    <div
      onClick={onClick}
      className={`relative ${regionStyle.bgColor} rounded-sm cursor-pointer hover:scale-[1.02] transition-transform duration-200 overflow-hidden`}
      style={{
        minHeight: '180px',
        border: `2.5px solid ${regionStyle.borderColor}`,
        boxShadow: `inset 0 0 30px rgba(0,0,0,0.03), 2px 2px 8px rgba(0,0,0,0.08)`,
      }}
    >
      {/* Coffee bean watermarks */}
      <div className="absolute -top-2 -right-3">
        <CoffeeBeanDecoration size={32} color={regionStyle.beanColor} opacity={0.12} rotation={25} />
      </div>
      <div className="absolute -bottom-3 -left-2">
        <CoffeeBeanDecoration size={28} color={regionStyle.beanColor} opacity={0.1} rotation={-35} />
      </div>

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Visa header band */}
      <div
        className="relative px-3 py-1.5 text-center"
        style={{ backgroundColor: regionStyle.borderColor }}
      >
        <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">
          Coffee Visa
        </span>
      </div>

      {/* Main content */}
      <div className="relative p-3">
        {/* Rarity badge */}
        {card.rarity !== 'common' && (
          <div
            className="absolute -top-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 rounded-bl-md"
            style={{ backgroundColor: regionStyle.accentColor }}
          >
            {card.rarity === 'legendary' ? (
              <StarIcon size={12} color="#A69060" />
            ) : (
              <DiamondIcon size={12} color="#8878A0" />
            )}
            <span className={`text-[8px] font-bold uppercase ${card.rarity === 'legendary' ? 'text-[#8A7A50]' : 'text-[#706890]'}`}>
              {card.rarity}
            </span>
          </div>
        )}

        {/* Region icon and country */}
        <div className="flex items-start gap-2 mb-2">
          <div
            className="p-1.5 rounded-full"
            style={{ backgroundColor: regionStyle.accentColor }}
          >
            {regionStyle.icon(20)}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold ${regionStyle.textColor} text-sm leading-tight uppercase tracking-wide truncate`}
            >
              {card.name}
            </h3>
            <p className={`text-[10px] ${regionStyle.textColor} opacity-50 uppercase tracking-wider`}>
              {card.region}
            </p>
          </div>
        </div>

        {/* Divider line */}
        <div
          className="h-px mb-2 opacity-25"
          style={{ backgroundColor: regionStyle.borderColor }}
        />

        {/* Flavor profile */}
        <p className={`text-[10px] ${regionStyle.textColor} opacity-70 line-clamp-2 mb-2 leading-relaxed`}>
          {card.flavorProfile}
        </p>

        {/* Date stamp - circular visa stamp style */}
        {firstCollectedDate && (
          <div
            className="absolute bottom-2 right-2 w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center opacity-60"
            style={{
              borderColor: regionStyle.stampColor,
              transform: 'rotate(-12deg)',
            }}
          >
            <span
              className="text-[7px] font-bold uppercase tracking-wider"
              style={{ color: regionStyle.stampColor }}
            >
              Entry
            </span>
            <span
              className="text-[9px] font-bold"
              style={{ color: regionStyle.stampColor }}
            >
              {new Date(firstCollectedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              }).toUpperCase()}
            </span>
            <span
              className="text-[7px]"
              style={{ color: regionStyle.stampColor }}
            >
              {new Date(firstCollectedDate).getFullYear()}
            </span>
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-8 left-1 w-2 h-2 border-l-2 border-t-2 opacity-20"
        style={{ borderColor: regionStyle.borderColor }}
      />
      <div
        className="absolute top-8 right-1 w-2 h-2 border-r-2 border-t-2 opacity-20"
        style={{ borderColor: regionStyle.borderColor }}
      />
      <div
        className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 opacity-20"
        style={{ borderColor: regionStyle.borderColor }}
      />
    </div>
  )
}

// Passport Stamp Reveal Animation - Visa style
export function CardReveal({ card, onComplete }: { card: BeanCardType; onComplete?: () => void }) {
  const regionStyle = getRegionStyle(card.region)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onComplete}
    >
      {/* Passport page background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#F5F2EF] rounded-lg p-6 shadow-2xl max-w-sm w-full relative overflow-hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 23px, #E8E3DE 23px, #E8E3DE 24px)
          `,
        }}
      >
        {/* Coffee bean watermarks on passport page */}
        <div className="absolute top-4 right-8 opacity-10">
          <CoffeeBeanDecoration size={40} color="#8B7355" rotation={30} opacity={1} />
        </div>
        <div className="absolute bottom-12 left-6 opacity-10">
          <CoffeeBeanDecoration size={36} color="#8B7355" rotation={-25} opacity={1} />
        </div>

        {/* Page header */}
        <div className="absolute top-2 right-4 text-[10px] text-[#8B8178] opacity-40 uppercase tracking-widest">
          Coffee Passport
        </div>

        {/* Visa stamp animation */}
        <motion.div
          initial={{ y: -200, rotate: -15, scale: 1.5 }}
          animate={{ y: 0, rotate: 0, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 12,
            stiffness: 100,
            delay: 0.2
          }}
          className={`${regionStyle.bgColor} rounded-sm relative mx-auto mt-8`}
          style={{
            border: `3px solid ${regionStyle.borderColor}`,
            boxShadow: `
              inset 0 0 40px rgba(0,0,0,0.05),
              6px 6px 20px rgba(0,0,0,0.12)
            `,
            maxWidth: '300px',
          }}
        >
          {/* Coffee bean watermarks */}
          <div className="absolute -top-1 -right-2">
            <CoffeeBeanDecoration size={28} color={regionStyle.beanColor} opacity={0.15} rotation={20} />
          </div>
          <div className="absolute -bottom-2 -left-1">
            <CoffeeBeanDecoration size={24} color={regionStyle.beanColor} opacity={0.12} rotation={-30} />
          </div>

          {/* Ink splatter effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 70%, ${regionStyle.stampColor} 0%, transparent 50%)`,
            }}
          />

          {/* Visa header */}
          <div
            className="px-4 py-2 text-center"
            style={{ backgroundColor: regionStyle.borderColor }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.4 }}
              className="text-white text-sm font-bold tracking-[0.3em] uppercase"
            >
              Coffee Visa
            </motion.span>
          </div>

          <div className="p-5">
            {/* Rarity badge */}
            {card.rarity !== 'common' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute top-10 right-2 flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ backgroundColor: regionStyle.accentColor }}
              >
                {card.rarity === 'legendary' ? (
                  <StarIcon size={14} color="#A69060" />
                ) : (
                  <DiamondIcon size={14} color="#8878A0" />
                )}
                <span className={`text-xs font-bold uppercase ${card.rarity === 'legendary' ? 'text-[#8A7A50]' : 'text-[#706890]'}`}>
                  {card.rarity}
                </span>
              </motion.div>
            )}

            {/* Region icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex justify-center mb-3"
            >
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: regionStyle.accentColor }}
              >
                {regionStyle.icon(40)}
              </div>
            </motion.div>

            {/* Country name */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`font-bold ${regionStyle.textColor} text-xl text-center uppercase tracking-wider mb-1`}
            >
              {card.name}
            </motion.h2>

            {/* Region */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`text-center ${regionStyle.textColor} text-sm uppercase tracking-widest mb-4 opacity-50`}
            >
              {card.region}
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7 }}
              className="h-px opacity-25 mb-4"
              style={{ backgroundColor: regionStyle.borderColor }}
            />

            {/* Flavor profile */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`text-center ${regionStyle.textColor} text-sm leading-relaxed opacity-80`}
            >
              {card.flavorProfile}
            </motion.p>

            {/* Date stamp */}
            <motion.div
              initial={{ opacity: 0, rotate: -20, scale: 0 }}
              animate={{ opacity: 0.7, rotate: -8, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="absolute bottom-3 right-3 w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center"
              style={{ borderColor: regionStyle.stampColor }}
            >
              <span
                className="text-[8px] font-bold uppercase tracking-wider"
                style={{ color: regionStyle.stampColor }}
              >
                Entry
              </span>
              <span
                className="text-[10px] font-bold"
                style={{ color: regionStyle.stampColor }}
              >
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                }).toUpperCase()}
              </span>
              <span
                className="text-[8px]"
                style={{ color: regionStyle.stampColor }}
              >
                {new Date().getFullYear()}
              </span>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div
            className="absolute top-10 left-2 w-3 h-3 border-l-2 border-t-2 opacity-15"
            style={{ borderColor: regionStyle.borderColor }}
          />
          <div
            className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 opacity-15"
            style={{ borderColor: regionStyle.borderColor }}
          />
        </motion.div>

        {/* Tap instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2 }}
          className="text-center text-xs text-[#8B8178] mt-6 uppercase tracking-widest"
        >
          Tap to continue
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
