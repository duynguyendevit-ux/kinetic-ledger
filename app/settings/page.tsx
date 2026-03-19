'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'

export default function SettingsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [settings, setSettings] = useState({
    apiUrl: 'https://9router.tomtom79.tech/api',
    theme: 'dark',
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30,
    timezone: 'UTC+7',
    language: 'en',
  })

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!')
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
            className="flex items-center gap-3 py-3 px-4 text-[#bac9cc] hover:text-[#c3f5ff] hover:bg-[#131b2e] transition-colors duration-200 rounded-lg whitespace-nowrap" 
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
            className="flex items-center gap-3 py-3 px-4 pl-3 rounded-lg bg-[#222a3d] text-[#00e5ff] font-bold border-l-4 border-[#00e5ff] whitespace-nowrap" 
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
              Settings
            </h2>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 font-bold rounded transition-all text-sm"
          >
            <span className="material-symbols-outlined text-lg">save</span>
            <span className="hidden sm:inline">Save Changes</span>
          </button>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Page Header */}
            <div>
              <div className="text-primary text-xs font-mono tracking-widest uppercase mb-1">
                Configuration
              </div>
              <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                Application Settings
              </h1>
            </div>

            {/* API Configuration */}
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">api</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    API Configuration
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Configure your API endpoint and credentials
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">
                    API URL
                  </label>
                  <input
                    type="text"
                    value={settings.apiUrl}
                    onChange={(e) => setSettings({ ...settings, apiUrl: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">palette</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    Appearance
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Customize the look and feel
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">notifications</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    Notifications
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Manage notification preferences
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Enable Notifications</p>
                    <p className="text-xs text-on-surface-variant">Receive alerts and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Auto Refresh</p>
                    <p className="text-xs text-on-surface-variant">Automatically refresh data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoRefresh}
                      onChange={(e) => setSettings({ ...settings, autoRefresh: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {settings.autoRefresh && (
                  <div>
                    <label className="block text-sm font-bold text-on-surface mb-2">
                      Refresh Interval (seconds)
                    </label>
                    <input
                      type="number"
                      value={settings.refreshInterval}
                      onChange={(e) => setSettings({ ...settings, refreshInterval: parseInt(e.target.value) })}
                      min="10"
                      max="300"
                      className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Regional */}
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">public</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    Regional Settings
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Configure timezone and locale
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="UTC+7">UTC+7 (Ho Chi Minh)</option>
                    <option value="UTC+8">UTC+8 (Singapore)</option>
                    <option value="UTC+9">UTC+9 (Tokyo)</option>
                    <option value="UTC-8">UTC-8 (Los Angeles)</option>
                    <option value="UTC-5">UTC-5 (New York)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-2xl border-l-2 border-error">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-error">warning</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-error">
                    Danger Zone
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Irreversible actions
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-bold rounded transition-all text-left flex items-center justify-between">
                  <span>Clear Cache</span>
                  <span className="material-symbols-outlined text-lg">delete_sweep</span>
                </button>
                <button className="w-full py-2 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-bold rounded transition-all text-left flex items-center justify-between">
                  <span>Reset to Defaults</span>
                  <span className="material-symbols-outlined text-lg">restart_alt</span>
                </button>
                <button className="w-full py-2 px-4 bg-error/20 hover:bg-error/30 text-error text-sm font-bold rounded transition-all text-left flex items-center justify-between">
                  <span>Delete Account</span>
                  <span className="material-symbols-outlined text-lg">delete_forever</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
