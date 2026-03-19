import { NextResponse } from 'next/server'

const API_KEY = process.env.ROUTER_API_KEY || 'sk-e53f140b15705189-ox1esx-c9aaee63'
const API_URL = process.env.ROUTER_API_URL || 'https://9router.tomtom79.tech/api'

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/usage/stats?period=24h`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch usage stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch usage stats' },
      { status: 500 }
    )
  }
}
