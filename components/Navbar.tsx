'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-slate-900 text-lg tracking-tight">
            Shiply
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
          <Link href="/security" className="hover:text-slate-900 transition-colors">Security</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/tracking"
            className="hidden sm:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Track Parcel
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
            About
          </Link>
          <Link href="/security" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
            Security
          </Link>
          <Link
            href="/tracking"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-amber-500 text-white font-medium px-5 py-3 rounded-full"
          >
            Track Parcel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  )
}