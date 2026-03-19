'use client'

import { useEffect, useState } from 'react'

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

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low p-6">
        <div className="mb-10">
          <h1 className="text-headline-lg gradient-primary bg-clip-text text-transparent">
            Kinetic Ledger
          </h1>
          <p className="text-label-sm text-on-surface-variant mt-2">
            Token Dashboard
          </p>
        </div>
        
        <nav className="space-y-2">
          {['Dashboard', 'Providers', 'Tokens', 'Analytics', 'Settings'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 rounded-md bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-10">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-on-surface-variant">Loading...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="mb-10">
              <h2 className="text-display-lg text-on-surface mb-2 font-mono">
                {totalTokens.toLocaleString()}
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                Total tokens processed (24h)
              </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-surface-container-high p-8 rounded-xl ambient-shadow">
                <p className="text-label-sm text-on-surface-variant mb-3">
                  Active Providers
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-display-md text-on-surface font-mono">
                    {activeProviders}
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-high p-8 rounded-xl ambient-shadow">
                <p className="text-label-sm text-on-surface-variant mb-3">
                  API Calls
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-display-md text-on-surface font-mono">
                    {(totalRequests / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-high p-8 rounded-xl ambient-shadow">
                <p className="text-label-sm text-on-surface-variant mb-3">
                  Models
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-display-md text-on-surface font-mono">
                    {Object.keys(usage?.byModel || {}).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Usage by Model */}
            <div className="bg-surface-container p-8 rounded-xl ambient-shadow mb-10">
              <h3 className="text-headline-lg text-on-surface mb-6">
                Usage by Model
              </h3>
              <div className="space-y-4">
                {Object.entries(usage?.byModel || {}).map(([model, stats]) => (
                  <div
                    key={model}
                    className="flex items-center justify-between p-4 bg-surface-container-high rounded-lg"
                  >
                    <div>
                      <p className="text-body-md text-on-surface font-medium">
                        {model}
                      </p>
                      <p className="text-label-sm text-on-surface-variant">
                        {stats.requests.toLocaleString()} requests
                      </p>
                    </div>
                    <span className="text-body-lg text-primary font-mono">
                      {((stats.promptTokens + stats.completionTokens) / 1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Combos */}
            <div className="bg-surface-container-high p-8 rounded-xl">
              <h3 className="text-headline-lg text-on-surface mb-6">
                Active Combos
              </h3>
              <div className="space-y-4">
                {combos.map((combo) => (
                  <div
                    key={combo.id}
                    className="p-4 bg-surface-container-highest rounded-lg"
                  >
                    <p className="text-body-md text-on-surface font-medium mb-2">
                      {combo.name}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {combo.models.map((model, i) => (
                        <span
                          key={i}
                          className="text-label-sm text-tertiary bg-tertiary-container/20 px-3 py-1 rounded-md"
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
