'use client'

interface IconProps {
  className?: string
  size?: number
  color?: string
}

// Hand-drawn lock icon
export function LockIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M8 10V7C8 4.5 9.5 3 12 3C14.5 3 16 4.5 16 7V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="15" r="1.5" fill={color} />
      <path d="M12 16.5V18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Hand-drawn Africa continent icon
export function AfricaIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C10 2 9 3 8 4C7 5 6 6 6 8C5 10 5 12 6 14C6 16 7 18 9 20C10 21 11 22 12 22C13 22 14 21 15 20C16 18 17 16 17 14C17 12 17 10 16 8C15 6 14 4 13 3C12.5 2.5 12.5 2 12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="10" cy="10" r="1" fill={color} opacity="0.5" />
    </svg>
  )
}

// Hand-drawn South America icon
export function SouthAmericaIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2C12 2 10 3 9 5C8 7 7 9 7 11C6 13 6 15 7 17C8 19 9 21 11 22C12 22 13 21 14 20C15 18 16 16 17 14C18 12 18 10 17 8C16 6 15 4 14 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M10 8C11 9 12 10 11 11" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// Hand-drawn Central America/palm tree icon
export function CentralAmericaIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 10C10 8 7 7 5 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 10C14 8 17 7 19 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 8C11 5 9 3 7 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 8C13 5 15 3 17 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 6C12 4 12 2 12 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// Hand-drawn Asia tea/leaf icon
export function AsiaIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C12 22 6 18 6 12C6 6 12 2 12 2C12 2 18 6 18 12C18 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 6V18" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M9 9C10 10 11 11 12 11C13 11 14 10 15 9" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// Hand-drawn Caribbean island icon
export function CaribbeanIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="18" rx="8" ry="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M12 15V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8C10 6 8 5 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 8C14 6 16 5 18 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 6C11 4 10 3 9 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="6" cy="17" r="0.5" fill={color} opacity="0.5" />
      <circle cx="18" cy="17" r="0.5" fill={color} opacity="0.5" />
    </svg>
  )
}

// Hand-drawn Oceania wave icon
export function OceaniaIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 12C4 10 6 10 8 12C10 14 12 14 14 12C16 10 18 10 20 12C22 14 22 14 22 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M2 16C4 14 6 14 8 16C10 18 12 18 14 16C16 14 18 14 20 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="6" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M10 6.5L12 8L14 6.5" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// Hand-drawn Middle East coffee pot icon
export function MiddleEastIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 20H16C16 20 17 18 17 15C17 12 16 10 14 9L15 5C15 4 14 3 13 3H11C10 3 9 4 9 5L10 9C8 10 7 12 7 15C7 18 8 20 8 20Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M14 9C16 9 18 8 19 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M11 6H13" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// Hand-drawn coffee cup icon
export function CoffeeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cup body - sketchy lines */}
      <path
        d="M4 8C4.2 7.8 4 8.2 4 8L5 18C5.1 19.2 5.8 20 7 20H14C15.2 20 15.9 19.2 16 18L17 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Cup rim */}
      <path
        d="M3 8C3.1 7.5 3.5 7 4 7H17C17.5 7 17.9 7.5 18 8C18 8.5 17.5 9 17 9H4C3.5 9 3 8.5 3 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Handle - hand drawn curve */}
      <path
        d="M17 9C18 9.2 19.5 9.5 20 11C20.5 12.5 20 14 18.5 14.5C17.5 15 17 14.5 16.5 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Steam lines - wavy */}
      <path
        d="M7 5C7.2 4 7.8 3.5 8 3C8.2 3.5 8.8 4 9 5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M11 4C11.2 3 11.8 2.5 12 2C12.2 2.5 12.8 3 13 4"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  )
}

// Hand-drawn sparkle/star icon
export function SparkleIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main star burst */}
      <path
        d="M12 2C12.2 2 12 6 12 8C12 6 12 2 12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 22C12 20 12 16 12 14C12 16 12 20 12 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 12C4 12 8 12 10 12C8 12 4 12 2 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 12C20 12 16 12 14 12C16 12 20 12 22 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Diagonal sparkles */}
      <path
        d="M5 5C6 6 8 8 9 9"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M19 5C18 6 16 8 15 9"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M5 19C6 18 8 16 9 15"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M19 19C18 18 16 16 15 15"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  )
}

// Hand-drawn checkmark icon
export function CheckIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.5C5 13.5 7 16 9 18C11 14 15 8 20 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// Hand-drawn empty circle icon
export function CircleIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
        fill="none"
      />
    </svg>
  )
}

// Hand-drawn medal icons
export function GoldMedalIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ribbon */}
      <path
        d="M8 2L10 8M16 2L14 8"
        stroke="#B8860B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Medal circle */}
      <circle
        cx="12"
        cy="14"
        r="6"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1.5"
      />
      {/* Number 1 */}
      <path
        d="M12 11V17M10.5 12L12 11"
        stroke="#8B6914"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SilverMedalIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ribbon */}
      <path
        d="M8 2L10 8M16 2L14 8"
        stroke="#808080"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Medal circle */}
      <circle
        cx="12"
        cy="14"
        r="6"
        fill="#C0C0C0"
        stroke="#808080"
        strokeWidth="1.5"
      />
      {/* Number 2 */}
      <path
        d="M10 12C10 11 11 10.5 12 10.5C13 10.5 14 11 14 12C14 13 12 14 10 17H14"
        stroke="#5A5A5A"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function BronzeMedalIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ribbon */}
      <path
        d="M8 2L10 8M16 2L14 8"
        stroke="#8B4513"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Medal circle */}
      <circle
        cx="12"
        cy="14"
        r="6"
        fill="#CD7F32"
        stroke="#8B4513"
        strokeWidth="1.5"
      />
      {/* Number 3 */}
      <path
        d="M10 11C10 10.5 11 10 12 10C13 10 14 10.5 14 11.5C14 12.5 12.5 12.5 12 12.5C12.5 12.5 14 12.5 14 14C14 15 13 15.5 12 15.5C11 15.5 10 15 10 14.5"
        stroke="#5D3A1A"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Hand-drawn home icon
export function HomeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Roof */}
      <path
        d="M3 11L12 4L21 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House body */}
      <path
        d="M5 10V19C5 19.5 5.5 20 6 20H18C18.5 20 19 19.5 19 19V10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Door */}
      <path
        d="M10 20V15C10 14.5 10.5 14 11 14H13C13.5 14 14 14.5 14 15V20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Hand-drawn compass/explore icon
export function ExploreIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Compass needle */}
      <path
        d="M16 8L14 14L8 16L10 10L16 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  )
}

// Hand-drawn collection/grid icon
export function CollectionIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid squares - slightly irregular for hand-drawn effect */}
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// Hand-drawn user/profile icon
export function ProfileIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Body */}
      <path
        d="M4 20C4 16 7 14 12 14C17 14 20 16 20 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// Hand-drawn plus/add icon
export function AddIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vertical line */}
      <path
        d="M12 5V19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Horizontal line */}
      <path
        d="M5 12H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Hand-drawn map icon
export function MapIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Map outline - folded paper style */}
      <path
        d="M3 6L9 4L15 6L21 4V18L15 20L9 18L3 20V6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Fold lines */}
      <path
        d="M9 4V18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 6V20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Hand-drawn globe/world icon
export function GlobeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M3 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 7H20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M4 17H20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

// Hand-drawn location pin icon
export function LocationIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C12 21 5 14 5 9C5 5 8 2 12 2C16 2 19 5 19 9C19 14 12 21 12 21Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// Hand-drawn search/magnifying glass icon
export function SearchIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M15 15L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Hand-drawn people/twins icon
export function TwinsIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="6" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="6" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M2 20C2 16 4 14 8 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M22 20C22 16 20 14 16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M8 14C10 14 12 15 12 17C12 15 14 14 16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// Hand-drawn handshake icon
export function HandshakeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 11L7 7L11 9L14 6L18 8L21 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M3 16L8 13L12 15L16 12L21 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10 9V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M14 8V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// Hand-drawn copy/clipboard icon
export function CopyIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="12" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 8V5C16 4 15 3 14 3H6C5 3 4 4 4 5V16C4 17 5 18 6 18H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// Hand-drawn target icon
export function TargetIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  )
}

// Hand-drawn trophy icon
export function TrophyIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 4H18V10C18 14 15 16 12 16C9 16 6 14 6 10V4Z" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M6 6H4C3 6 2 7 2 8C2 10 3 11 5 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18 6H20C21 6 22 7 22 8C22 10 21 11 19 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 16V19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 21H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 19H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Hand-drawn cards/deck icon
export function CardsIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back card */}
      <rect
        x="2"
        y="4"
        width="14"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-6 9 13)"
      />
      {/* Front card */}
      <rect
        x="6"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Card design - coffee bean */}
      <ellipse
        cx="13"
        cy="12"
        rx="3"
        ry="4"
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M13 8.5V15.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Hand-drawn passport book icon
export function PassportIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Passport cover */}
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Binding edge */}
      <path
        d="M7 2V22"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Emblem circle */}
      <circle
        cx="14"
        cy="10"
        r="4"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Coffee bean inside emblem */}
      <ellipse
        cx="14"
        cy="10"
        rx="1.5"
        ry="2.5"
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M14 7.5V12.5"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      {/* Text lines */}
      <path
        d="M10 16H18"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M10 18.5H16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

// Hand-drawn visa stamp icon
export function VisaStampIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stamp border - slightly irregular for hand-drawn feel */}
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="1"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="3 1"
      />
      {/* Inner rectangle */}
      <rect
        x="5"
        y="6"
        width="14"
        height="12"
        rx="0.5"
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
      {/* VISA text representation */}
      <path
        d="M7 10H11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 10H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Date line */}
      <path
        d="M8 14H16"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

// Hand-drawn star icon for rarity
export function StarIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.2"
      />
    </svg>
  )
}

// Hand-drawn diamond icon for rare
export function DiamondIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L22 12L12 22L2 12L12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.2"
      />
      <path
        d="M7 12H17"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M12 7V17"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  )
}

// ============ MILESTONE ICONS ============

// Hand-drawn seedling/sprout icon
export function SeedlingIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12C12 8 15 6 18 6C18 10 15 12 12 12Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M12 16C12 13 9 11 6 11C6 14 9 16 12 16Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M10 22H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Hand-drawn heart with steam (passion/enthusiast)
export function HeartSteamIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20C12 20 4 14 4 9C4 6 6 4 9 4C10.5 4 11.5 5 12 6C12.5 5 13.5 4 15 4C18 4 20 6 20 9C20 14 12 20 12 20Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8 3C8.2 2 8.8 1.5 9 1" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M12 2C12.2 1 12.8 0.5 13 0" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

// Hand-drawn nose/aroma icon (connoisseur)
export function AromaIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 14C10 14 9 16 9 18C9 20 10 22 12 22C14 22 15 20 15 18C15 16 14 14 12 14Z" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M12 14V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 6C4.5 4 6 3 8 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M8 4C8.5 2 10 1 12 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M20 6C19.5 4 18 3 16 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M16 4C15.5 2 14 1 12 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

// Hand-drawn ribbon/award icon
export function RibbonIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="9" r="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M8 14L6 22L12 18L18 22L16 14" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="9" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  )
}

// Hand-drawn crown icon
export function CrownIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 17L2 7L7 11L12 4L17 11L22 7L20 17H4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.15"
      />
      <path d="M4 17H20V20H4V17Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="7" cy="11" r="1" fill={color} opacity="0.6" />
      <circle cx="12" cy="7" r="1" fill={color} opacity="0.6" />
      <circle cx="17" cy="11" r="1" fill={color} opacity="0.6" />
    </svg>
  )
}

// Hand-drawn footprints icon
export function FootprintsIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left foot */}
      <ellipse cx="7" cy="15" rx="2.5" ry="4" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="5" cy="9" r="1.2" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="7.5" cy="8" r="1" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="9.5" cy="9.5" r="0.8" stroke={color} strokeWidth="1" fill="none" />
      {/* Right foot */}
      <ellipse cx="17" cy="18" rx="2.5" ry="4" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="15" cy="12" r="1.2" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="17.5" cy="11" r="1" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="19.5" cy="12.5" r="0.8" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  )
}

// Hand-drawn backpack icon
export function BackpackIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="8" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M8 8V6C8 4 9.5 2 12 2C14.5 2 16 4 16 6V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="8" y="12" width="8" height="5" rx="1" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M12 12V15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// Hand-drawn airplane icon
export function AirplaneIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3L13 11M21 3L15 21L11 13M21 3L3 9L11 13M11 13L13 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// Hand-drawn badge/ambassador icon
export function BadgeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14 6L18 6.5L15 10L16 14L12 12L8 14L9 10L6 6.5L10 6L12 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.15"
      />
      <path d="M8 14L6 22L12 19L18 22L16 14" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// Hand-drawn bean icon (single coffee bean)
export function BeanIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="12" rx="6" ry="9" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(-15 12 12)" />
      <path d="M12 4Q10 8 12 12Q14 16 12 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" transform="rotate(-15 12 12)" />
    </svg>
  )
}

// Hand-drawn flame icon (passion)
export function FlameIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C8 22 5 18 5 14C5 10 8 6 12 2C12 6 15 8 16 10C17 8 18 6 18 6C20 10 19 14 19 14C19 18 16 22 12 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 22C10 22 9 20 9 18C9 16 10 14 12 13C14 14 15 16 15 18C15 20 14 22 12 22Z"
        stroke={color}
        strokeWidth="1"
        fill={color}
        fillOpacity="0.2"
      />
    </svg>
  )
}

// Hand-drawn compass rose icon
export function CompassRoseIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M12 3V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 17V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8L14 12L12 16L10 12L12 8Z" fill={color} stroke={color} strokeWidth="1" />
    </svg>
  )
}
