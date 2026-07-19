'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('apexbit_cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('apexbit_cookie_consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('apexbit_cookie_consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl animate-in slide-in-from-bottom-10 duration-700 fade-in">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Icon & Text */}
        <div className="flex items-start gap-4">
          <div className="hidden md:flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 flex-shrink-0">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-1 tracking-tight">Data & Privacy Preferences</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
              We use cookies to optimize your routing dashboard, analyze network traffic, and secure our infrastructure. By continuing, you agree to our{' '}
              <Link href="/privacy" className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex w-full md:w-auto items-center gap-3 flex-shrink-0">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-colors"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium bg-black text-white hover:bg-slate-800 rounded-full transition-colors shadow-md"
          >
            Accept All
          </button>
          <button 
            onClick={handleDecline}
            className="p-2 text-slate-400 hover:text-slate-600 hidden md:flex transition-colors"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  )
}