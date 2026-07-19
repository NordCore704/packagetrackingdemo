import { ShieldCheck, Lock, Server, EyeOff, KeyRound, DatabaseBackup } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-24">
      
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/60 via-purple-50/30 to-transparent -z-10 transform rotate-12 -translate-x-20 -translate-y-20"></div>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 text-indigo-700 font-medium mb-6 bg-indigo-50 px-4 py-2 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-sm tracking-wide uppercase">Platform Trust</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 leading-[1.05] mb-8 max-w-4xl">
          Security infrastructure built for critical logistics.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
          How we protect your parcel data, physical asset routing, and overall tracking integrity from origin to destination.
        </p>
      </header>

      {/* Core Security Features Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Encryption */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
              <Lock className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">Cryptographic Protection</h3>
            <p className="text-slate-600 leading-relaxed">
              All tracking queries, dashboard interactions, and API payloads are secured in transit using TLS 1.3. Your database records and customer delivery histories are encrypted at rest using AES-256 standards.
            </p>
          </div>

          {/* Infrastructure */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
              <Server className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">High-Availability Servers</h3>
            <p className="text-slate-600 leading-relaxed">
              Our tracking architecture is distributed across multiple global availability zones. We guarantee 99.9% uptime, ensuring your logistics data is accessible even during high-traffic seasonal events.
            </p>
          </div>

          {/* Privacy */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
              <EyeOff className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">Zero-Trust Privacy</h3>
            <p className="text-slate-600 leading-relaxed">
              Tracking codes are securely hashed. We employ strict data-masking protocols to ensure that full sender and receiver PII (Personally Identifiable Information) is never exposed on public tracking endpoints.
            </p>
          </div>

        </div>
      </section>

      {/* Dark Compliance Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-black text-white rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              Compliance and Data Access
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Apexbit is designed to help you meet strict regulatory requirements for data retention and access control, no matter what jurisdiction your shipments pass through.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
                <DatabaseBackup className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium">Automated Backups</span>
              </div>
              {/* <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
                <KeyRound className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium">Role-Based Admin Access</span>
              </div> */}
            </div>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full">
              <div className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-4">
                System Status
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-lg font-medium text-white">All systems operational</span>
              </div>
              <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-slate-800">
                Last security audit: July 2026
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}