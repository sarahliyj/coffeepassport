'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapIcon, CoffeeIcon, PassportIcon, ProfileIcon } from './icons/HandDrawnIcons'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Map', Icon: MapIcon },
    { href: '/add', label: 'Add', Icon: CoffeeIcon },
    { href: '/collection', label: 'Passport', Icon: PassportIcon },
    { href: '/profile', label: 'Profile', Icon: ProfileIcon },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--latte)] px-4 py-2 z-40">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = item.Icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-2 rounded-xl transition ${
                isActive
                  ? 'text-[var(--espresso)]'
                  : 'text-[var(--latte)] hover:text-[var(--coffee)]'
              }`}
            >
              <IconComponent size={22} />
              <span className={`text-[10px] font-medium mt-1 ${isActive ? 'text-[var(--espresso)]' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-[var(--coffee)] rounded-full mt-1" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
