'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const auth = localStorage.getItem('kinetic_auth')
    if (auth !== 'true') {
      router.replace('/login')
    }
  }, [router])

  // Don't render anything until mounted (client-side)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-on-surface-variant">Loading...</p>
        </div>
      </div>
    )
  }

  const auth = localStorage.getItem('kinetic_auth')
  if (auth !== 'true') {
    return null
  }

  return <>{children}</>
}
