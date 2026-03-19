'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple auth - same as 9router style
    if (username === 'admin' && password === 'admin123') {
      // Store in localStorage like 9router
      localStorage.setItem('kinetic_auth', 'true')
      localStorage.setItem('kinetic_user', username)
      router.push('/')
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-low rounded-2xl shadow-2xl p-8 border border-outline-variant/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-container/20 mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">lock</span>
            </div>
            <h1 className="text-3xl font-bold font-headline text-on-surface mb-2">
              Welcome Back
            </h1>
            <p className="text-on-surface-variant text-sm">
              Sign in to Kinetic Ledger
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center space-x-3">
              <span className="material-symbols-outlined text-error">error</span>
              <p className="text-error text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">person</span>
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg pl-12 pr-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">key</span>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg pl-12 pr-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <div className="bg-surface-container-high/50 p-4 rounded-lg">
              <p className="text-on-surface-variant text-xs text-center">
                <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                Default: <span className="text-primary font-mono">admin</span> / <span className="text-primary font-mono">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
