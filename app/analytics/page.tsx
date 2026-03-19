'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'

interface ChartData {
  date: string
  requests: number
  tokens: number
  cost: number
}

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')

  useEffect(() => {
    // Mock analytics data
    const mockData: ChartData[] = []
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      mockData.push({
        date: date.toISOString().split('T')[0],
        requests: Math.floor(Math.random() * 5000) + 2000,
        tokens: Math.floor(Math.random() * 500000) + 100000,
        cost: Math.random() * 50 + 10
      })
    }
    
    setChartData(mockData)
    setLoading(false)
  }, [timeRange])

  const totalRequests = chartData.reduce((sum, d) => sum + d.requests, 0)
  const totalTokens = chartData.reduce((sum, d) => sum + d.tokens, 0)
  const totalCost = chartData.reduce((sum, d) => sum + d.cost, 0)
  const avgRequestsPerDay = Math.round(totalRequests / chartData.length)

  const maxRequests = Math.max(...chartData.map(d => d.requests))

  return (
    <AuthGuard>
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-surface-container-high rounded-lg text-on-surface kinetic-glow"
      >
        <span className="material-symbols-outlined">
          {menuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 flex flex-col z-40 bg-[#0b1326] border-r border-[#222a3d]/50 shadow-[4px_0_24px_rgba(0,0,0,0.3)]
        transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        scrollbar-hide
      `}
      style={{
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      >
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tighter text-[#c3f5ff] uppercase mb-1 font-headline">
            Kinetic Ledger
          </div>
          <div className="text-[10px] text-on-surface-variant tracking-[0.2em] opacity-50">
            v1.0.0
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <a 
            href="/"
            className="flex items-center gap-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg whitespace-nowrap" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined flex-shrink-0">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a 
            href="/providers"
            className="flex items-center gap-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg whitespace-nowrap" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined flex-shrink-0">hub</span>
            <span>Providers</span>
          </a>
          <a 
            href="/tokens"
            className="flex items-center gap-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg whitespace-nowrap" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined flex-shrink-0">vpn_key</span>
            <span>Tokens</span>
          </a>
          <a 
            href="/analytics"
            className="flex items-center gap-3 py-3 px-4 pl-3 rounded-lg bg-[#222a3d] text-[#00e5ff] font-bold border-l-4 border-[#00e5ff] whitespace-nowrap" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined flex-shrink-0">leaderboard</span>
            <span>Analytics</span>
          </a>
          <a 
            href="/settings"
            className="flex items-center gap-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg whitespace-nowrap" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined flex-shrink-0">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-[#222a3d]/30 space-y-3">
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider font-bold">API Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
              <span className="text-sm text-tertiary font-medium">Connected</span>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('kinetic_auth')
              localStorage.removeItem('kinetic_user')
              localStorage.removeItem('kinetic_token')
              window.location.href = '/login'
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-error transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 h-16 sm:h-20 bg-[#0b1326]/80 backdrop-blur-xl border-b border-[#222a3d]/30">
          <div className="flex items-center space-x-4 sm:space-x-8 flex-1">
            <h2 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
              Analytics
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                timeRange === '7d'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                timeRange === '30d'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                timeRange === '90d'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              90D
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-on-surface-variant">Loading...</div>
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div>
                <div className="text-primary text-xs font-mono tracking-widest uppercase mb-1">
                  Usage Analytics
                </div>
                <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                  Performance Metrics
                </h1>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-primary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">api</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Total Requests
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-on-surface font-mono">
                    {(totalRequests / 1000).toFixed(1)}K
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-tertiary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">token</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Total Tokens
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-on-surface font-mono">
                    {(totalTokens / 1000000).toFixed(2)}M
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-primary-container relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">payments</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Total Cost
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-on-surface font-mono">
                    ${totalCost.toFixed(2)}
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-tertiary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">trending_up</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Avg / Day
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-on-surface font-mono">
                    {(avgRequestsPerDay / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                    Request Volume
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Daily API requests over time
                  </p>
                </div>
                
                {/* Simple Bar Chart */}
                <div className="space-y-3">
                  {chartData.map((data, index) => {
                    const percentage = (data.requests / maxRequests) * 100
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-16 sm:w-20 text-xs text-on-surface-variant font-mono flex-shrink-0">
                          {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex-1 bg-surface-container rounded-full h-8 relative overflow-hidden group">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="text-xs font-bold text-on-primary font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                              {data.requests.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="w-16 text-xs text-on-surface-variant font-mono text-right flex-shrink-0">
                          {(data.requests / 1000).toFixed(1)}K
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Models */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-4">
                    Top Models
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'claude-sonnet-4.5', requests: 15420, percentage: 45 },
                      { name: 'gpt-4o', requests: 12350, percentage: 36 },
                      { name: 'gemini-2.0-flash', requests: 6540, percentage: 19 },
                    ].map((model, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-on-surface">{model.name}</span>
                          <span className="text-xs font-mono text-on-surface-variant">{model.requests.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full"
                            style={{ width: `${model.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-4">
                    Response Times
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'P50', value: '120ms', color: 'tertiary' },
                      { label: 'P95', value: '450ms', color: 'primary' },
                      { label: 'P99', value: '890ms', color: 'primary-container' },
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                        <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">{metric.label}</span>
                        <span className={`text-lg font-mono font-bold text-${metric.color}`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
