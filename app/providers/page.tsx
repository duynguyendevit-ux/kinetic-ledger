'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'

interface Provider {
  id: string
  name: string
  status: 'active' | 'inactive' | 'error'
  models: number
  requests: number
  latency: number
  uptime: number
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Fetch real providers from API
    fetch('/api/providers')
      .then(r => r.json())
      .then(data => {
        setProviders(data.providers || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch providers:', err)
        // Fallback to mock data
        setProviders([
          { id: '1', name: 'OpenAI', status: 'active', models: 12, requests: 45230, latency: 120, uptime: 99.9 },
          { id: '2', name: 'Anthropic', status: 'active', models: 8, requests: 32100, latency: 95, uptime: 99.8 },
          { id: '3', name: 'Google AI', status: 'active', models: 15, requests: 28900, latency: 110, uptime: 99.7 },
          { id: '4', name: 'Mistral AI', status: 'inactive', models: 5, requests: 0, latency: 0, uptime: 0 },
          { id: '5', name: 'Azure AI', status: 'active', models: 20, requests: 51200, latency: 85, uptime: 99.95 },
        ])
        setLoading(false)
      })
  }, [])

  const activeProviders = providers.filter(p => p.status === 'active').length
  const totalRequests = providers.reduce((sum, p) => sum + p.requests, 0)
  const avgLatency = Math.round(providers.filter(p => p.status === 'active').reduce((sum, p) => sum + p.latency, 0) / activeProviders)

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
        transition-transform duration-300 ease-in-out overflow-y-auto
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
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <a 
            href="/"
            className="flex items-center space-x-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a 
            href="/providers"
            className="flex items-center space-x-3 py-3 px-4 pl-3 rounded-lg bg-[#222a3d] text-[#00e5ff] font-bold border-l-4 border-[#00e5ff]" 
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
                placeholder="Search providers..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="hidden sm:block bg-primary-container text-on-primary-container px-4 py-2 font-bold rounded transition-all text-sm">
              Add Provider
            </button>
            <button className="sm:hidden p-2 bg-primary-container text-on-primary-container rounded">
              <span className="material-symbols-outlined text-lg">add</span>
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
                  Provider Management
                </div>
                <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                  Providers
                </h1>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-tertiary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">check_circle</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Active Providers
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface">
                    {activeProviders}
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-primary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">api</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Total Requests
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface font-mono">
                    {(totalRequests / 1000).toFixed(1)}K
                  </p>
                </div>

                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-primary-container relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">speed</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Avg Latency
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface font-mono">
                    {avgLatency}ms
                  </p>
                </div>
              </div>

              {/* Providers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all"
                  >
                    <div className="p-4 sm:p-6 border-b border-outline-variant/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">hub</span>
                          </div>
                          <div>
                            <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface">
                              {provider.name}
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                              {provider.models} models
                            </p>
                          </div>
                        </div>
                        <span className={`
                          inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold
                          ${provider.status === 'active' 
                            ? 'bg-tertiary/20 text-tertiary border border-tertiary/20' 
                            : 'bg-on-surface-variant/20 text-on-surface-variant border border-on-surface-variant/20'
                          }
                        `}>
                          <span className={`w-1 h-1 rounded-full mr-1.5 ${provider.status === 'active' ? 'bg-tertiary animate-pulse' : 'bg-on-surface-variant'}`}></span>
                          {provider.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">
                          Requests
                        </p>
                        <p className="font-mono text-sm sm:text-base text-on-surface font-bold">
                          {provider.requests.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">
                          Latency
                        </p>
                        <p className="font-mono text-sm sm:text-base text-primary font-bold">
                          {provider.latency}ms
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">
                          Uptime
                        </p>
                        <p className="font-mono text-sm sm:text-base text-tertiary font-bold">
                          {provider.uptime}%
                        </p>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <button className="w-full py-2 px-4 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-bold rounded transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
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
