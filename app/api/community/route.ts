import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's coffee entries from today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: userEntriesToday } = await supabase
      .from('coffee_entries')
      .select('origin_country')
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString())

    const userCountriesToday = userEntriesToday?.map((e: { origin_country: string }) => e.origin_country) || []

    // Get all user's countries for comparison
    const { data: userAllEntries } = await supabase
      .from('coffee_entries')
      .select('origin_country')
      .eq('user_id', user.id)

    const userCountries = [...new Set(userAllEntries?.map((e: { origin_country: string }) => e.origin_country) || [])]

    // Find Coffee Twins - others who drank same origin today (anonymous)
    let coffeeTwins: { country: string; count: number; cities: string[] }[] = []

    if (userCountriesToday.length > 0) {
      const { data: twinsData } = await supabase
        .from('coffee_entries')
        .select('origin_country')
        .in('origin_country', userCountriesToday)
        .gte('created_at', today.toISOString())
        .neq('user_id', user.id)

      // Count twins per country
      const twinCounts = new Map<string, number>()
      twinsData?.forEach((entry: { origin_country: string }) => {
        const count = twinCounts.get(entry.origin_country) || 0
        twinCounts.set(entry.origin_country, count + 1)
      })

      // Fake city data for fun (in production, you'd have real location data)
      const cities = ['Tokyo', 'London', 'New York', 'Paris', 'Berlin', 'Sydney', 'Seoul', 'Singapore', 'Toronto', 'Amsterdam']

      coffeeTwins = Array.from(twinCounts.entries()).map(([country, count]) => ({
        country,
        count,
        cities: Array.from({ length: Math.min(count, 3) }, () =>
          cities[Math.floor(Math.random() * cities.length)]
        ),
      }))
    }

    // Get global community stats
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const { count: totalCoffees } = await supabase
      .from('coffee_entries')
      .select('*', { count: 'exact', head: true })

    const { data: popularCountries } = await supabase
      .from('coffee_entries')
      .select('origin_country')

    // Count most popular countries
    const countryPopularity = new Map<string, number>()
    popularCountries?.forEach((entry: { origin_country: string }) => {
      const count = countryPopularity.get(entry.origin_country) || 0
      countryPopularity.set(entry.origin_country, count + 1)
    })

    const topCountries = Array.from(countryPopularity.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }))

    // Get today's activity
    const { count: coffeesToday } = await supabase
      .from('coffee_entries')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())

    return NextResponse.json({
      coffeeTwins,
      userCountries,
      stats: {
        totalUsers: totalUsers || 0,
        totalCoffees: totalCoffees || 0,
        coffeesToday: coffeesToday || 0,
        topCountries,
      },
    })
  } catch (error) {
    console.error('Community API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
