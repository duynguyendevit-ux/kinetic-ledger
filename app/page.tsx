'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface UsageStats {
  byModel?: Record<string, { requests: number; promptTokens: number; completionTokens: number }>
  total?: { requests: number; tokens: number }
}

interface Combo {
  id: string
  name: string
  models: Array<{ name: string; provider: string }>
}

export default function Home() {
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [combos, setCombos] = useState<Combo[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/usage').then(r => r.json()),
      fetch('/api/combos').then(r => r.json())
    ]).then(([usageData, combosData]) => {
      setUsage(usageData)
      setCombos(combosData.combos || [])
      setLoading(false)
    }).catch(err => {
      console.error('Failed to fetch data:', err)
      setLoading(false)
    })
  }, [])

  const totalTokens = usage?.total?.tokens || Object.values(usage?.byModel || {})
    .reduce((sum, model) => sum + (model.promptTokens || 0) + (model.completionTokens || 0), 0) || 0

  const totalRequests = usage?.total?.requests || Object.values(usage?.byModel || {})
    .reduce((sum, model) => sum + (model.requests || 0), 0) || 0

  const activeProviders = combos.length

  const navItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Providers', icon: '🔌', active: false },
    { name: 'Tokens', icon: '🎫', active: false },
    { name: 'Analytics', icon: '📈', active: false },
    { name: 'Settings', icon: '⚙️', active: false },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 glass rounded-xl text-on-surface glow-primary"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-72 bg-surface-container-low p-8 z-40
        transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-12">
          <h1 className="text-3xl font-display font-bold gradient-primary mb-2">
            Kinetic Ledger
          </h1>
          <p className="text-label-sm text-on-surface-variant">
            High-Velocity Token Dashboard
          </p>
        </div>
        
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href="#"
              onClick={() => setMenuOpen(false)}
              className={`
                flex items-center gap-3 px-5 py-4 rounded-xl
                transition-all duration-200 font-medium
                ${item.active 
                  ? 'bg-surface-container-highest text-primary glow-primary' 
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="glass p-4 rounded-xl">
            <p className="text-label-sm text-on-surface-variant mb-1">API Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
              <span className="text-sm text-tertiary font-medium">Connected</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 p-6 sm:p-8 lg:p-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-on-surface-variant">Loading dashboard...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Header */}
            <header className="mb-12">
              <h2 className="text-display-lg font-display font-bold text-on-surface mb-3 font-mono">
                {totalTokens.toLocaleString()}
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                Total tokens processed in the last 24 hours
              </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Active Providers', value: activeProviders, color: 'primary' },
                { label: 'API Calls', value: `${(totalRequests / 1000).toFixed(1)}K`, color: 'tertiary' },
                { label: 'Models', value: Object.keys(usage?.byModel || {}).length, color: 'primary' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-surface-container-high p-8 rounded-2xl ambient-shadow hover-lift"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="text-label-sm text-on-surface-variant mb-4">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-display-md font-display font-bold text-${stat.color} font-mono`}>
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Usage by Model */}
            <div className="bg-surface-container p-8 rounded-2xl ambient-shadow mb-12">
              <h3 className="text-headline-lg font-display font-semibold text-on-surface mb-8">
                Usage by Model
              </h3>
              <div className="space-y-4">
                {Object.entries(usage?.byModel || {}).slice(0, 5).map(([model, stats]) => (
                  <div
                    key={model}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-surface-container-high rounded-xl hover-lift gap-3"
                  >
                    <div className="flex-1">
                      <p className="text-body-md text-on-surface font-medium mb-2 break-all">
                        {model}
                      </p>
                      <p className="text-label-sm text-on-surface-variant">
                        {stats.requests.toLocaleString()} requests
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl text-primary font-mono font-bold block">
                        {((stats.promptTokens + stats.completionTokens) / 1000).toFixed(1)}K
                      </span>
                      <span className="text-label-sm text-on-surface-variant">tokens</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Combos */}
            <div className="bg-surface-container-high p-8 rounded-2xl ambient-shadow">
              <h3 className="text-headline-lg font-display font-semibold text-on-surface mb-8">
                Active Combos
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {combos.map((combo) => (
                  <div
                    key={combo.id}
                    className="p-6 bg-surface-container-highest rounded-xl hover-lift"
                  >
                    <p className="text-body-md text-on-surface font-semibold mb-4">
                      {combo.name}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {combo.models.map((model, i) => (
                        <span
                          key={i}
                          className="text-label-sm text-tertiary bg-tertiary-container/20 px-4 py-2 rounded-lg font-medium"
                        >
                          {model.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
