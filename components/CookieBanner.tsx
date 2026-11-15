'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('shiply_cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('shiply_cookie_consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('shiply_cookie_consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl animate-in slide-in-from-bottom-8 duration-500 fade-in">
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        
        <div className="flex items-start gap-3 flex-1">
          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-amber-50 text-amber-600 items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 mb-0.5">
              We use cookies
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              To improve tracking experience and site performance.{' '}
              <Link href="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-5 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="p-2 text-slate-400 hover:text-slate-600 hidden sm:flex"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}