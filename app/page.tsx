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

  const navItems = ['Dashboard', 'Providers', 'Tokens', 'Analytics', 'Settings']

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-surface-container-high rounded-lg text-on-surface"
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
        fixed left-0 top-0 h-screen w-64 bg-surface-container-low p-6 z-40
        transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Kinetic Ledger
          </h1>
          <p className="text-label-sm text-on-surface-variant mt-2">
            Token Dashboard
          </p>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all duration-200 text-sm lg:text-base font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-10">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-on-surface-variant">Loading...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="mb-6 lg:mb-10">
              <h2 className="text-4xl sm:text-5xl lg:text-display-lg text-on-surface mb-2 font-mono font-bold">
                {totalTokens.toLocaleString()}
              </h2>
              <p className="text-base sm:text-lg lg:text-body-lg text-on-surface-variant">
                Total tokens processed (24h)
              </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-10">
              <div className="bg-surface-container-high p-6 lg:p-8 rounded-xl ambient-shadow">
                <p className="text-label-sm text-on-surface-variant mb-3">
                  Active Providers
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl lg:text-display-md text-on-surface font-mono font-semibold">
                    {activeProviders}
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-high p-6 lg:p-8 rounded-xl ambient-shadow">
                <p className="text-label-sm text-on-surface-variant mb-3">
                  API Calls
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl lg:text-display-md text-on-surface font-mono font-semibold">
                    {(totalRequests / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-high p-6 lg:p-8 rounded-xl ambient-shadow sm:col-span-2 lg:col-span-1">
                <p className="text-label-sm text-on-surface-variant mb-3">
                  Models
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl lg:text-display-md text-on-surface font-mono font-semibold">
                    {Object.keys(usage?.byModel || {}).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Usage by Model */}
            <div className="bg-surface-container p-6 lg:p-8 rounded-xl ambient-shadow mb-6 lg:mb-10">
              <h3 className="text-xl sm:text-2xl lg:text-headline-lg text-on-surface mb-4 lg:mb-6 font-semibold">
                Usage by Model
              </h3>
              <div className="space-y-3 lg:space-y-4">
                {Object.entries(usage?.byModel || {}).map(([model, stats]) => (
                  <div
                    key={model}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-surface-container-high rounded-lg gap-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm sm:text-base lg:text-body-md text-on-surface font-medium break-all">
                        {model}
                      </p>
                      <p className="text-label-sm text-on-surface-variant mt-1">
                        {stats.requests.toLocaleString()} requests
                      </p>
                    </div>
                    <span className="text-base sm:text-lg lg:text-body-lg text-primary font-mono font-semibold">
                      {((stats.promptTokens + stats.completionTokens) / 1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Combos */}
            <div className="bg-surface-container-high p-6 lg:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl lg:text-headline-lg text-on-surface mb-4 lg:mb-6 font-semibold">
                Active Combos
              </h3>
              <div className="space-y-3 lg:space-y-4">
                {combos.map((combo) => (
                  <div
                    key={combo.id}
                    className="p-4 bg-surface-container-highest rounded-lg"
                  >
                    <p className="text-sm sm:text-base lg:text-body-md text-on-surface font-medium mb-2">
                      {combo.name}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {combo.models.map((model, i) => (
                        <span
                          key={i}
                          className="text-xs sm:text-sm lg:text-label-sm text-tertiary bg-tertiary-container/20 px-3 py-1 rounded-md"
                        >
                          {model.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
