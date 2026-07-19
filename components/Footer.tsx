import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-slate-400 py-16 px-4 md:px-8 font-sans border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand Column */}
        <div className="space-y-6 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-indigo-500 group-hover:text-indigo-400 transition-colors">
              {/* Geometric logo from the new navbar */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="4" />
                <circle cx="17" cy="11" r="4" />
                <circle cx="9" cy="17" r="4" />
              </svg>
            </div>
            <span className="font-semibold text-white text-xl tracking-tight">
              Apexbit Cargo
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm text-slate-400">
            Next-generation logistics management. We provide secure, transparent, and instantaneous parcel tracking for global shipments.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-white font-medium mb-6 tracking-tight">Company</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/tracking" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200">
                Track a Package
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/security" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200">
                Security Infrastructure
              </Link>
            </li>
     
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="text-white font-medium mb-6 tracking-tight">Legal</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200">
                Cookie Guidelines
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500">© 2026 Apexbit Cargo. All rights reserved.</p>
        <p className="flex items-center gap-1.5 text-slate-500">
          Secured with <span className="text-indigo-400 font-medium">TLS 1.3 Encryption</span>
        </p>
      </div>
    </footer>
  )
}