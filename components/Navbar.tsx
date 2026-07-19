'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-4 z-50 w-full px-4 md:px-8 transition-all">
      <nav className="relative max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] border border-slate-100">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="text-indigo-600 group-hover:text-indigo-500 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="4" />
              <circle cx="17" cy="11" r="4" />
              <circle cx="9" cy="17" r="4" />
            </svg>
          </div>
          <span className="font-semibold text-slate-900 text-lg tracking-tight">
            Apexbit Cargo
          </span>
        </Link>

        {/* Center Links (Desktop only - perfectly centered) */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-800 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
          <Link href="/security" className="hover:text-indigo-600 transition-colors">Security</Link>
        </div>

        {/* Right Side Actions & Mobile Toggle */}
        <div className="flex items-center gap-3 lg:gap-6 z-50">
       
          <Link 
            href="/tracking" 
            className="hidden sm:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Track Parcel <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Hamburger Menu Button (Mobile/Tablet) */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex flex-col gap-2 lg:hidden z-40 overflow-hidden">
            <Link 
              href="/" 
              onClick={toggleMenu} 
              className="text-slate-800 font-medium px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={toggleMenu} 
              className="text-slate-800 font-medium px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/security" 
              onClick={toggleMenu} 
              className="text-slate-800 font-medium px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Security
            </Link>
            
            <div className="h-px w-full bg-slate-100 my-2"></div>
            
            <Link 
              href="/" 
              onClick={toggleMenu} 
              className="sm:hidden flex justify-center items-center gap-2 mt-2 bg-black text-white px-5 py-3.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors w-full"
            >
              Track Parcel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </nav>
    </header>
  )
}