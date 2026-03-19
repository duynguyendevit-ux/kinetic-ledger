'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'

interface Token {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  requests: number
  status: 'active' | 'revoked'
}

export default function TokensPage() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    // Mock tokens data
    setTokens([
      { 
        id: '1', 
        name: 'Production API', 
        key: 'sk-e53f140b15705189-ox1esx-c9aaee63',
        created: '2026-01-15',
        lastUsed: '2026-03-19',
        requests: 45230,
        status: 'active'
      },
      { 
        id: '2', 
        name: 'Development', 
        key: 'sk-dev-a1b2c3d4e5f6g7h8-test-1234567890',
        created: '2026-02-01',
        lastUsed: '2026-03-18',
        requests: 12450,
        status: 'active'
      },
      { 
        id: '3', 
        name: 'Staging Environment', 
        key: 'sk-stg-9876543210-staging-abcdefgh',
        created: '2026-01-20',
        lastUsed: '2026-03-10',
        requests: 8920,
        status: 'active'
      },
      { 
        id: '4', 
        name: 'Old Production', 
        key: 'sk-old-deprecated-key-revoked-2026',
        created: '2025-12-01',
        lastUsed: '2026-01-15',
        requests: 98450,
        status: 'revoked'
      },
    ])
    setLoading(false)
  }, [])

  const activeTokens = tokens.filter(t => t.status === 'active').length
  const totalRequests = tokens.reduce((sum, t) => sum + t.requests, 0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const maskKey = (key: string) => {
    if (key.length <= 20) return key
    return key.substring(0, 15) + '...' + key.substring(key.length - 8)
  }

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
            className="flex items-center gap-3 py-3 px-4 pl-3 rounded-lg bg-[#222a3d] text-[#00e5ff] font-bold border-l-4 border-[#00e5ff] whitespace-nowrap" 
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined flex-shrink-0">vpn_key</span>
            <span>Tokens</span>
          </a>
          <a 
            href="/analytics"
            className="flex items-center gap-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg whitespace-nowrap" 
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
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input 
                className="w-full bg-surface-container border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary" 
                placeholder="Search tokens..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="hidden sm:flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 font-bold rounded transition-all text-sm"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Create Token
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="sm:hidden p-2 bg-primary-container text-on-primary-container rounded"
            >
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
                  API Key Management
                </div>
                <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                  Tokens
                </h1>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-surface-container-high p-4 sm:p-6 rounded-xl border-l-2 border-tertiary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl">vpn_key</span>
                  </div>
                  <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">
                    Active Tokens
                  </p>
                  <p className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface">
                    {activeTokens}
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
              </div>

              {/* Tokens Table */}
              <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-container-high border-b border-outline-variant/10">
                      <tr>
                        <th className="text-left py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider hidden md:table-cell">
                          Key
                        </th>
                        <th className="text-left py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider hidden lg:table-cell">
                          Created
                        </th>
                        <th className="text-left py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider hidden sm:table-cell">
                          Last Used
                        </th>
                        <th className="text-right py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Requests
                        </th>
                        <th className="text-center py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-right py-4 px-4 sm:px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {tokens.map((token) => (
                        <tr key={token.id} className="hover:bg-surface-container transition-colors">
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-primary text-sm">vpn_key</span>
                              </div>
                              <span className="font-medium text-on-surface">{token.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 sm:px-6 hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                                {maskKey(token.key)}
                              </code>
                              <button
                                onClick={() => copyToClipboard(token.key)}
                                className="p-1 hover:bg-surface-container-high rounded transition-colors"
                                title="Copy to clipboard"
                              >
                                <span className="material-symbols-outlined text-sm text-on-surface-variant">content_copy</span>
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-sm text-on-surface-variant hidden lg:table-cell">
                            {token.created}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-sm text-on-surface-variant hidden sm:table-cell">
                            {token.lastUsed}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right font-mono text-sm text-on-surface font-bold">
                            {token.requests.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-center">
                            <span className={`
                              inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold
                              ${token.status === 'active' 
                                ? 'bg-tertiary/20 text-tertiary border border-tertiary/20' 
                                : 'bg-on-surface-variant/20 text-on-surface-variant border border-on-surface-variant/20'
                              }
                            `}>
                              <span className={`w-1 h-1 rounded-full mr-1.5 ${token.status === 'active' ? 'bg-tertiary animate-pulse' : 'bg-on-surface-variant'}`}></span>
                              {token.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {token.status === 'active' && (
                                <button
                                  className="p-1 hover:bg-surface-container-high rounded transition-colors"
                                  title="Revoke token"
                                >
                                  <span className="material-symbols-outlined text-sm text-error">block</span>
                                </button>
                              )}
                              <button
                                className="p-1 hover:bg-surface-container-high rounded transition-colors"
                                title="Delete token"
                              >
                                <span className="material-symbols-outlined text-sm text-on-surface-variant">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          </div>
        </div>
      </main>

      {/* Create Token Modal (placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-low rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-on-surface mb-4">Create New Token</h2>
            <p className="text-sm text-on-surface-variant mb-4">
              Token creation functionality coming soon...
            </p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="w-full py-2 px-4 bg-primary-container text-on-primary-container font-bold rounded transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </AuthGuard>
  )
}
