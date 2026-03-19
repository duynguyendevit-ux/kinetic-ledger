import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Read real 9router data
    const dbPath = path.join(process.env.HOME || '/root', '.9router', 'db.json')
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
    
    // Transform providerConnections to providers format
    const providers = dbData.providerConnections.map((conn: any) => {
      const now = new Date()
      const lastUsed = conn.lastUsedAt ? new Date(conn.lastUsedAt) : null
      const isExpired = conn.expiresAt ? new Date(conn.expiresAt) < now : false
      
      // Determine status
      let status: 'active' | 'inactive' | 'error' = 'inactive'
      if (conn.isActive && !isExpired) {
        status = conn.errorCode ? 'error' : 'active'
      }
      
      // Mock some stats (will be replaced with real usage data later)
      const requests = Math.floor(Math.random() * 10000) + 5000
      const latency = Math.floor(Math.random() * 50) + 80
      const uptime = status === 'active' ? 99.5 + Math.random() * 0.5 : 0
      
      return {
        id: conn.id,
        name: conn.name,
        status,
        models: 3, // Kiro has 3 scopes: completions, analysis, conversations
        requests,
        latency,
        uptime: parseFloat(uptime.toFixed(2)),
        provider: conn.provider,
        priority: conn.priority,
        lastUsedAt: conn.lastUsedAt,
        errorCode: conn.errorCode,
        backoffLevel: conn.backoffLevel
      }
    })

    return NextResponse.json({ providers })
  } catch (error) {
    console.error('Error fetching providers:', error)
    
    // Fallback to mock data if 9router data unavailable
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
  }
}
