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

    // Simple auth - replace with real API call
    if (username === 'admin' && password === 'admin123') {
      // Set session cookie
      document.cookie = 'kinetic_auth=true; path=/; max-age=86400' // 24h
      router.push('/')
    } else {
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-low rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline gradient-primary mb-2">
              Kinetic Ledger
            </h1>
            <p className="text-on-surface-variant text-sm">
              Sign in to your dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-error text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-xs">
              Default credentials: admin / admin123
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Background */}
      <style jsx>{`
        .gradient-primary {
          background: linear-gradient(135deg, #c3f5ff, #00e5ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  )
}
