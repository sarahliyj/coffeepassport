'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { TOTAL_COFFEE_COUNTRIES } from '@/lib/countries'
import { motion } from 'framer-motion'
import LoginPromptModal from '@/components/LoginPromptModal'
import {
  CheckIcon,
  CircleIcon,
  ProfileIcon,
  CoffeeIcon,
  GlobeIcon,
  TrophyIcon,
  TargetIcon,
  // Milestone icons
  BeanIcon,
  SeedlingIcon,
  HeartSteamIcon,
  AromaIcon,
  RibbonIcon,
  CrownIcon,
  VisaStampIcon,
  FootprintsIcon,
  ExploreIcon,
  BackpackIcon,
  AirplaneIcon,
  HandshakeIcon,
  BadgeIcon,
} from '@/components/icons/HandDrawnIcons'

interface UserStats {
  email: string
  totalCoffees: number
  totalCountries: number
  createdAt: string
  profilePictureUrl?: string | null
}

// Consistent section header component (matching home page)
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

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen pb-20 bg-[var(--cream)]">
      <div className="max-w-lg mx-auto p-4">
        <motion.div
          className="flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ProfileIcon size={64} color="var(--coffee)" />
          </motion.div>
          <motion.p
            className="mt-4 text-[var(--coffee)] text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading profile...
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

// Milestone icon component type
type MilestoneIconComponent = React.ComponentType<{ size?: number; color?: string }>

// Milestone definitions
const MILESTONES: {
  coffee: { id: string; label: string; description: string; threshold: number; Icon: MilestoneIconComponent; color: string }[]
  countries: { id: string; label: string; description: string; threshold: number; Icon: MilestoneIconComponent; color: string }[]
} = {
  coffee: [
    { id: 'first_coffee', label: 'First Sip', description: 'Log your first coffee', threshold: 1, Icon: BeanIcon, color: '#8B7355' },
    { id: 'coffee_5', label: 'Coffee Explorer', description: 'Log 5 coffees', threshold: 5, Icon: SeedlingIcon, color: '#7A9B6D' },
    { id: 'coffee_10', label: 'Coffee Enthusiast', description: 'Log 10 coffees', threshold: 10, Icon: HeartSteamIcon, color: '#C17878' },
    { id: 'coffee_25', label: 'Coffee Connoisseur', description: 'Log 25 coffees', threshold: 25, Icon: AromaIcon, color: '#9B8AA6' },
    { id: 'coffee_50', label: 'Coffee Aficionado', description: 'Log 50 coffees', threshold: 50, Icon: RibbonIcon, color: '#B8860B' },
    { id: 'coffee_100', label: 'Coffee Master', description: 'Log 100 coffees', threshold: 100, Icon: CrownIcon, color: '#DAA520' },
  ],
  countries: [
    { id: 'country_1', label: 'First Stamp', description: 'Try coffee from 1 origin', threshold: 1, Icon: VisaStampIcon, color: '#6B8E8E' },
    { id: 'country_5', label: 'Globe Trotter', description: 'Try coffee from 5 origins', threshold: 5, Icon: FootprintsIcon, color: '#8B7355' },
    { id: 'country_10', label: 'Continental', description: 'Try coffee from 10 origins', threshold: 10, Icon: ExploreIcon, color: '#5D7A99' },
    { id: 'country_15', label: 'World Explorer', description: 'Try coffee from 15 origins', threshold: 15, Icon: BackpackIcon, color: '#7A9B6D' },
    { id: 'country_25', label: 'World Traveler', description: 'Try coffee from 25 origins', threshold: 25, Icon: AirplaneIcon, color: '#6A8CAD' },
    { id: 'country_35', label: 'Coffee Diplomat', description: 'Try coffee from 35 origins', threshold: 35, Icon: HandshakeIcon, color: '#9B8AA6' },
    { id: 'country_all', label: 'Coffee Ambassador', description: 'Try coffee from all origins', threshold: TOTAL_COFFEE_COUNTRIES, Icon: BadgeIcon, color: '#DAA520' },
  ],
}

export default function ProfilePage() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()
  const router = useRouter()

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return
      }

      setLoading(true)
      const { data: entries } = await supabase
        .from('coffee_entries')
        .select('origin_country')
        .eq('user_id', user.id)

      // Fetch profile data including profile picture
      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_picture_url')
        .eq('id', user.id)
        .single()

      const uniqueCountries = new Set(entries?.map((e: { origin_country: string }) => e.origin_country) || [])

      setStats({
        email: user.email || '',
        totalCoffees: entries?.length || 0,
        totalCountries: uniqueCountries.size,
        createdAt: user.created_at,
        profilePictureUrl: profile?.profile_picture_url || null,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount and when window gains focus
  useEffect(() => {
    fetchStats()

    const handleFocus = () => fetchStats()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload the file
    uploadProfilePicture(file)
  }

  const uploadProfilePicture = async (file: File) => {
    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('You must be logged in to upload a profile picture')
        return
      }

      // Create a unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `profile-pictures/${fileName}`

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        // Check if it's a bucket not found error
        if (uploadError.message?.includes('Bucket not found') || uploadError.message?.includes('The resource was not found')) {
          alert('Storage bucket not configured. Please create an "avatars" bucket in Supabase Storage with public access.')
        } else {
          alert(`Failed to upload image: ${uploadError.message || 'Please try again.'}`)
        }
        setUploading(false)
        setPreviewUrl(null)
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const publicUrl = urlData.publicUrl

      // Update profile with the new picture URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_picture_url: publicUrl })
        .eq('id', user.id)

      if (updateError) {
        console.error('Update error:', updateError)
        alert('Failed to update profile picture. Please try again.')
      } else {
        // Update local state
        setStats((prev) => prev ? { ...prev, profilePictureUrl: publicUrl } : null)
        setPreviewUrl(null) // Clear preview after successful upload
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const getInitials = (email: string) => {
    if (!email) return '?'
    const parts = email.split('@')[0]
    return parts.charAt(0).toUpperCase()
  }

  const getProfileImageUrl = () => {
    if (previewUrl) return previewUrl
    if (stats?.profilePictureUrl) return stats.profilePictureUrl
    return null
  }

  // Calculate achieved milestones
  const coffeeMilestonesAchieved = MILESTONES.coffee.filter(m => (stats?.totalCoffees || 0) >= m.threshold).length
  const countryMilestonesAchieved = MILESTONES.countries.filter(m => (stats?.totalCountries || 0) >= m.threshold).length
  const totalMilestones = MILESTONES.coffee.length + MILESTONES.countries.length
  const totalAchieved = coffeeMilestonesAchieved + countryMilestonesAchieved

  if (loading) {
    return <LoadingSkeleton />
  }

  // Not authenticated - show guest profile view with login modal
  if (!stats) {
    return (
      <div className="min-h-screen pb-20 bg-[var(--cream)]">
        <header className="sticky top-0 z-10 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--latte)] px-4 py-4">
          <div className="max-w-lg mx-auto flex items-center justify-center gap-3">
            <ProfileIcon size={28} color="var(--espresso)" />
            <h1 className="text-2xl font-bold text-[var(--espresso)]">
              Profile
            </h1>
          </div>
        </header>
        <main className="max-w-lg mx-auto p-4 space-y-6">
          {/* Guest Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#6B5D52] to-[#8B7A69] px-5 py-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 shadow-lg mb-3">
                  <ProfileIcon size={48} color="white" />
                </div>
                <p className="text-white font-medium">Guest User</p>
                <p className="text-sm text-white/70">Sign in to save your progress</p>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#FDFBF9] rounded-xl p-3 border border-[#E8E3DE] text-center">
                  <div className="flex justify-center mb-1">
                    <CoffeeIcon size={20} color="var(--coffee)" />
                  </div>
                  <div className="text-xl font-bold text-[var(--espresso)]">0</div>
                  <div className="text-[10px] text-[var(--coffee)] uppercase tracking-wide">Coffees</div>
                </div>
                <div className="bg-[#FDFBF9] rounded-xl p-3 border border-[#E8E3DE] text-center">
                  <div className="flex justify-center mb-1">
                    <GlobeIcon size={20} color="var(--sage)" />
                  </div>
                  <div className="text-xl font-bold text-[var(--espresso)]">0</div>
                  <div className="text-[10px] text-[var(--coffee)] uppercase tracking-wide">Origins</div>
                </div>
                <div className="bg-[#FDFBF9] rounded-xl p-3 border border-[#E8E3DE] text-center">
                  <div className="flex justify-center mb-1">
                    <TrophyIcon size={20} color="#B8860B" />
                  </div>
                  <div className="text-xl font-bold text-[var(--espresso)]">0</div>
                  <div className="text-[10px] text-[var(--coffee)] uppercase tracking-wide">Badges</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* World Progress Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
          >
            <div className="p-5">
              <SectionHeader
                icon={<TargetIcon size={20} color="var(--coffee)" />}
                title="World Progress"
              />
              <div className="bg-[#F5F2EF] rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--coffee)] font-medium">Coffee Origins Explored</span>
                  <span className="text-[var(--espresso)] font-semibold">0 / {TOTAL_COFFEE_COUNTRIES}</span>
                </div>
                <div className="h-3 bg-[#E8E3DE] rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-[var(--sage)] to-[#7A9B6D] rounded-full" />
                </div>
                <p className="text-xs text-[#A8A39E] mt-2 text-center">
                  0% of coffee origins explored
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setShowLoginModal(true)}
            className="w-full py-3.5 px-4 bg-[var(--espresso)] text-white rounded-xl font-semibold hover:bg-[#2A1A0D] transition shadow-md"
          >
            Sign In to Track Your Journey
          </motion.button>
        </main>

        {/* Login Modal */}
        <LoginPromptModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="Sign in to Your Profile"
          message="Track your coffee journey, earn badges, and explore origins from around the world!"
        />

        <Navbar />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 bg-[var(--cream)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--cream)]/95 backdrop-blur-sm border-b border-[var(--latte)] px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-center gap-3">
          <ProfileIcon size={28} color="var(--espresso)" />
          <h1 className="text-2xl font-bold text-[var(--espresso)]">
            Profile
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-[#6B5D52] to-[#8B7A69] px-5 py-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                {getProfileImageUrl() ? (
                  <img
                    src={getProfileImageUrl()!}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 shadow-lg">
                    <span className="text-white text-3xl font-bold">
                      {getInitials(stats?.email || '')}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-white text-[var(--coffee)] rounded-full p-2 hover:bg-[var(--cream)] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  title="Upload profile picture"
                >
                  {uploading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <p className="text-white font-medium">{stats?.email}</p>
              <p className="text-sm text-white/70">
                Member since {stats?.createdAt ? new Date(stats.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-5">
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#FDFBF9] rounded-xl p-3 border border-[#E8E3DE] text-center"
              >
                <div className="flex justify-center mb-1">
                  <CoffeeIcon size={20} color="var(--coffee)" />
                </div>
                <div className="text-xl font-bold text-[var(--espresso)]">
                  {stats?.totalCoffees || 0}
                </div>
                <div className="text-[10px] text-[var(--coffee)] uppercase tracking-wide">
                  Coffees
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#FDFBF9] rounded-xl p-3 border border-[#E8E3DE] text-center"
              >
                <div className="flex justify-center mb-1">
                  <GlobeIcon size={20} color="var(--sage)" />
                </div>
                <div className="text-xl font-bold text-[var(--espresso)]">
                  {stats?.totalCountries || 0}
                </div>
                <div className="text-[10px] text-[var(--coffee)] uppercase tracking-wide">
                  Origins
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#FDFBF9] rounded-xl p-3 border border-[#E8E3DE] text-center"
              >
                <div className="flex justify-center mb-1">
                  <TrophyIcon size={20} color="#B8860B" />
                </div>
                <div className="text-xl font-bold text-[var(--espresso)]">
                  {totalAchieved}
                </div>
                <div className="text-[10px] text-[var(--coffee)] uppercase tracking-wide">
                  Badges
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* World Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          <div className="p-5">
            <SectionHeader
              icon={<TargetIcon size={20} color="var(--coffee)" />}
              title="World Progress"
            />

            <div className="bg-[#F5F2EF] rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--coffee)] font-medium">Coffee Origins Explored</span>
                <span className="text-[var(--espresso)] font-semibold">
                  {stats?.totalCountries || 0} / {TOTAL_COFFEE_COUNTRIES}
                </span>
              </div>
              <div className="h-3 bg-[#E8E3DE] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--sage)] to-[#7A9B6D] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(((stats?.totalCountries || 0) / TOTAL_COFFEE_COUNTRIES) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-[#A8A39E] mt-2 text-center">
                {Math.round(((stats?.totalCountries || 0) / TOTAL_COFFEE_COUNTRIES) * 100)}% of the coffee world discovered
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coffee Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          <div className="p-5">
            <SectionHeader
              icon={<CoffeeIcon size={20} color="var(--coffee)" />}
              title="Coffee Milestones"
            />

            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="h-1.5 flex-1 bg-[#E8E3DE] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--coffee)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(coffeeMilestonesAchieved / MILESTONES.coffee.length) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <span className="text-xs text-[var(--coffee)] font-medium">
                {coffeeMilestonesAchieved}/{MILESTONES.coffee.length}
              </span>
            </div>

            <div className="space-y-2">
              {MILESTONES.coffee.map((milestone, index) => (
                <MilestoneItem
                  key={milestone.id}
                  Icon={milestone.Icon}
                  iconColor={milestone.color}
                  label={milestone.label}
                  description={milestone.description}
                  achieved={(stats?.totalCoffees || 0) >= milestone.threshold}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Country Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-[var(--latte)] overflow-hidden"
        >
          <div className="p-5">
            <SectionHeader
              icon={<GlobeIcon size={20} color="var(--sage)" />}
              title="Explorer Milestones"
            />

            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="h-1.5 flex-1 bg-[#E8E3DE] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--sage)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(countryMilestonesAchieved / MILESTONES.countries.length) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
              <span className="text-xs text-[var(--sage)] font-medium">
                {countryMilestonesAchieved}/{MILESTONES.countries.length}
              </span>
            </div>

            <div className="space-y-2">
              {MILESTONES.countries.map((milestone, index) => (
                <MilestoneItem
                  key={milestone.id}
                  Icon={milestone.Icon}
                  iconColor={milestone.color}
                  label={milestone.label}
                  description={milestone.description}
                  achieved={(stats?.totalCountries || 0) >= milestone.threshold}
                  index={index}
                  variant="sage"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sign Out */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full py-3.5 px-4 bg-white text-[var(--coffee)] rounded-xl font-semibold border border-[var(--latte)] hover:bg-[var(--cream)] transition disabled:opacity-50 shadow-sm"
        >
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </motion.button>

        {/* Footer spacer */}
        <div className="h-4" />
      </main>

      <Navbar />
    </div>
  )
}

function MilestoneItem({
  Icon,
  iconColor,
  label,
  description,
  achieved,
  index,
  variant = 'coffee'
}: {
  Icon: MilestoneIconComponent
  iconColor: string
  label: string
  description: string
  achieved: boolean
  index: number
  variant?: 'coffee' | 'sage'
}) {
  const bgColor = achieved
    ? variant === 'sage' ? 'bg-[#E8F0E5]' : 'bg-[#F5F0EB]'
    : 'bg-[#FAFAFA]'
  const borderColor = achieved
    ? variant === 'sage' ? 'border-[#C5D9BE]' : 'border-[#E0D5CA]'
    : 'border-[#EBEBEB]'
  const checkBg = variant === 'sage' ? 'bg-[var(--sage)]' : 'bg-[var(--coffee)]'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-center gap-3 p-3 rounded-xl border ${bgColor} ${borderColor} ${achieved ? '' : 'opacity-60'}`}
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/80 border border-[#E8E3DE]">
        <Icon size={20} color={achieved ? iconColor : '#BEBEBE'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${achieved ? 'text-[var(--espresso)]' : 'text-[#999]'}`}>
          {label}
        </p>
        <p className={`text-xs ${achieved ? 'text-[var(--coffee)]' : 'text-[#BBB]'}`}>
          {description}
        </p>
      </div>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          achieved ? checkBg : 'bg-[#E8E3DE]'
        }`}
      >
        {achieved ? (
          <CheckIcon size={14} color="white" />
        ) : (
          <CircleIcon size={14} color="#CCC" />
        )}
      </div>
    </motion.div>
  )
}
