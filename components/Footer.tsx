import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-slate-900 text-lg">Shiply</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Simple, transparent parcel tracking. Real-time visibility from origin to final delivery.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/tracking" className="hover:text-slate-900 transition-colors">Track a Package</Link></li>
              <li><Link href="/about" className="hover:text-slate-900 transition-colors">About</Link></li>
              <li><Link href="/security" className="hover:text-slate-900 transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-slate-900 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2026 Shiply. All rights reserved.</p>
          <p>Secured with TLS 1.3</p>
        </div>
      </div>
    </footer>
  )
}