import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://9router.tomtom79.tech/api'
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || ''

    // Fetch provider connections from 9router
    const response = await fetch(`${apiUrl}/provider-connections`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch providers')
    }

    const data = await response.json()
    
    // Transform data to match our Provider interface
    const providers = data.map((conn: any) => ({
      id: conn.id,
      name: conn.name || conn.provider,
      provider: conn.provider,
      status: conn.isActive ? 'active' : 'inactive',
      models: 0, // 9router doesn't expose model count directly
      requests: 0, // Will need to aggregate from usage
      latency: 0, // Not available in provider-connections
      uptime: conn.isActive ? 99.9 : 0,
      lastUsedAt: conn.lastUsedAt,
      testStatus: conn.testStatus
    }))

    return NextResponse.json({ providers })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}
