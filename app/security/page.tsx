import { Lock, Server, EyeOff, DatabaseBackup, CheckCircle2 } from 'lucide-react'

const pillars = [
  {
    icon: Lock,
    title: 'Cryptographic protection',
    desc: 'All tracking queries, dashboard interactions, and API payloads are secured in transit using TLS 1.3. Your database records and customer delivery histories are encrypted at rest using AES-256 standards.',
    tags: ['TLS 1.3 in transit', 'AES-256 at rest'],
  },
  {
    icon: Server,
    title: 'High-availability servers',
    desc: 'Our tracking architecture is distributed across multiple global availability zones. We guarantee 99.9% uptime, ensuring your logistics data is accessible even during high-traffic seasonal events.',
    tags: ['Multiple availability zones', '99.9% uptime'],
  },
  {
    icon: EyeOff,
    title: 'Zero-trust privacy',
    desc: 'Tracking codes are securely hashed. We employ strict data-masking protocols to ensure that full sender and receiver PII (Personally Identifiable Information) is never exposed on public tracking endpoints.',
    tags: ['Hashed tracking codes', 'PII masking'],
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ===== HERO: headline left, live status right ===== */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 lg:pt-36 pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1] mb-8">
              Security infrastructure built for critical logistics.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              How we protect your parcel data, physical asset routing, and overall tracking integrity from origin to destination.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 p-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-slate-900">All systems operational</span>
              </div>
              <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
                Last security audit: January 2026
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== PILLARS: full-width rows ===== */}
      <section className="bg-slate-50 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 divide-y divide-slate-200">
          {pillars.map(({ icon: Icon, title, desc, tags }) => (
            <article key={title} className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-12 sm:py-16">
              <div className="lg:col-span-5 flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 leading-tight pt-1">
                  {title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg text-slate-600 leading-relaxed mb-5">{desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-sm px-3 py-1.5 rounded-full"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== COMPLIANCE ===== */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-500 rounded-3xl px-8 py-12 sm:px-14 sm:py-16 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-5">
                Compliance and data access
              </h2>
              <p className="text-lg text-amber-50 leading-relaxed max-w-2xl">
                Shiply Cargo is designed to help you meet strict regulatory requirements for data retention and access control, no matter what jurisdiction your shipments pass through.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="inline-flex items-center gap-3 bg-white text-slate-900 rounded-2xl px-5 py-4 shadow-lg shadow-amber-700/20">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DatabaseBackup className="w-5 h-5" />
                </div>
                <span className="font-medium">Automated backups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}