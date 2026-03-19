import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data based on real 9router structure
    // Since 9router doesn't expose public API, we use realistic mock data
    const providers = [
      {
        id: '1',
        name: 'Account 1',
        provider: 'kiro',
        status: 'active' as const,
        models: 3,
        requests: 12450,
        latency: 95,
        uptime: 99.9,
        testStatus: 'active'
      },
      {
        id: '2',
        name: 'dyan.it.bt',
        provider: 'kiro',
        status: 'active' as const,
        models: 3,
        requests: 8920,
        latency: 102,
        uptime: 99.8,
        testStatus: 'active'
      },
      {
        id: '3',
        name: 'Bồ',
        provider: 'kiro',
        status: 'active' as const,
        models: 3,
        requests: 5630,
        latency: 98,
        uptime: 99.7,
        testStatus: 'active'
      },
      {
        id: '4',
        name: 'duy.nk0112',
        provider: 'kiro',
        status: 'active' as const,
        models: 3,
        requests: 3210,
        latency: 110,
        uptime: 99.5,
        testStatus: 'active'
      },
      {
        id: '5',
        name: '21122',
        provider: 'kiro',
        status: 'active' as const,
        models: 3,
        requests: 1890,
        latency: 105,
        uptime: 99.6,
        testStatus: 'active'
      },
      {
        id: '6',
        name: 'dyan01',
        provider: 'kiro',
        status: 'active' as const,
        models: 3,
        requests: 980,
        latency: 115,
        uptime: 99.4,
        testStatus: 'active'
      }
    ]

    return NextResponse.json({ providers })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}
