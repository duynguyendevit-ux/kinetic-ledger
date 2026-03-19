'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/login') {
      setIsLoading(false)
      return
    }

    const auth = localStorage.getItem('kinetic_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else {
      router.push('/login')
    }
  }, [router, pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-on-surface-variant">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== '/login') {
    return null
  }

  return <>{children}</>
}
