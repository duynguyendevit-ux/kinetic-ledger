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

  return (
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
        fixed left-0 top-0 h-full w-64 flex flex-col z-40 bg-[#0b1326] border-r border-[#222a3d]/50 shadow-[4px_0_24px_rgba(0,0,0,0.3)]
        transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tighter text-[#c3f5ff] uppercase mb-1 font-headline">
            Kinetic Ledger
          </div>
          <div className="text-[10px] text-on-surface-variant tracking-[0.2em] opacity-50">
            v1.0.0
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a 
            className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-[#222a3d] text-[#00e5ff] font-bold border-l-4 border-[#00e5ff]" 
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a 
            className="flex items-center space-x-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg" 
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">hub</span>
            <span>Providers</span>
          </a>
          <a 
            className="flex items-center space-x-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg" 
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">vpn_key</span>
            <span>Tokens</span>
          </a>
          <a 
            className="flex items-center space-x-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg" 
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span>Analytics</span>
          </a>
          <a 
            className="flex items-center space-x-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg" 
            href="#"
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">settings</span>
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
              document.cookie = 'kinetic_auth=; path=/; max-age=0'
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
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input 
                className="w-full bg-surface-container border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary" 
                placeholder="Search..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="hidden sm:block bg-primary-container text-on-primary-container px-4 py-2 font-bold rounded transition-all text-sm">
              Add Key
            </button>
            <button className="sm:hidden p-2 bg-primary-container text-on-primary-container rounded">
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-on-surface-variant">Loading...</div>
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div>
                <div className="text-primary text-xs font-mono tracking-widest uppercase mb-1">
                  Token Management
                </div>
                <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                  Dashboard Overview
                </h1>
              </div>

              {/* Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-primary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">token</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Total Tokens (24h)
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface font-mono">
                    {(totalTokens / 1000000).toFixed(1)}M
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-tertiary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">hub</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Active Providers
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface">
                    {activeProviders}
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-primary-container relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">api</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    API Calls
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface font-mono">
                    {(totalRequests / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              {/* Usage Table */}
              <div className="bg-surface-container-low rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-4 sm:p-6 border-b border-outline-variant/10">
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                    Usage by Model
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container/50">
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                          Model
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                          Requests
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                          Tokens
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {Object.entries(usage?.byModel || {}).map(([model, stats]) => (
                        <tr key={model} className="hover:bg-surface-container-high/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 sm:py-5">
                            <div className="text-xs sm:text-sm font-bold text-on-surface break-all">
                              {model}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5 font-mono text-xs sm:text-sm text-on-surface">
                            {stats.requests.toLocaleString()}
                          </td>
                          <td className="px-4 sm:px-6 py-4 sm:py-5 font-mono text-xs sm:text-sm text-primary">
                            {((stats.promptTokens + stats.completionTokens) / 1000).toFixed(1)}K
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Combos */}
              <div className="bg-surface-container-high p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface mb-4 sm:mb-6">
                  Active Combos
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {combos.map((combo) => (
                    <div key={combo.id} className="p-4 sm:p-6 bg-surface-container-highest rounded-xl">
                      <p className="text-sm font-bold text-on-surface mb-3 sm:mb-4">{combo.name}</p>
                      <div className="flex gap-2 flex-wrap">
                        {combo.models.map((model, i) => (
                          <span
                            key={i}
                            className="text-xs text-tertiary bg-tertiary-container/20 px-3 py-1 rounded-lg font-medium border border-tertiary/20"
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
        </div>
      </main>
    </div>
  )
}
