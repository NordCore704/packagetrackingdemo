import Link from 'next/link'
import { Globe2, Zap, ShieldCheck, ArrowRight, Package, ScanLine, Truck } from 'lucide-react'

const stats = [
  ['99.9%', 'System uptime'],
  ['24/7', 'Node monitoring'],
  ['100+', 'Supported hubs'],
  ['Zero', 'Data breaches'],
]

const values = [
  {
    icon: Globe2,
    title: 'Borderless operation',
    desc: 'Our tracking codes are standardized to work across international hubs without data loss.',
  },
  {
    icon: Zap,
    title: 'Zero latency',
    desc: 'When a barcode is scanned at a sorting facility, your dashboard updates in under a second.',
  },
  {
    icon: ShieldCheck,
    title: 'Data integrity',
    desc: 'We strictly protect receiver PII (Personally Identifiable Information) while keeping shipment statuses public.',
  },
]

const checkpoints = [
  { icon: Package, title: 'Physical handoff', desc: 'Every handoff between carriers and fleets is logged accurately.' },
  { icon: ScanLine, title: 'Security scan', desc: 'Every scan is recorded and tamper-proof the moment it happens.' },
  { icon: Truck, title: 'Final mile delivery', desc: 'The last leg closes the timeline, instantly accessible to you.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ===== HERO ===== */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 lg:pt-36 pb-16">
        <p className="text-amber-600 font-medium mb-5">Our story</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1] max-w-4xl mb-8">
          Orchestrating global logistics with absolute clarity.
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
          Legacy shipping systems rely on fragmented data and delayed updates. We built Shiply Cargo to provide instant, verifiable truth for every package in transit.
        </p>

        {/* Stats as a plain ruled row */}
        <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-slate-200">
          {stats.map(([stat, label], i) => (
            <div
              key={label}
              className={`flex flex-col-reverse justify-end py-8 pr-6 ${i >= 2 ? 'border-t border-slate-200 md:border-t-0' : ''} ${i % 2 === 1 ? 'pl-6 border-l border-slate-200' : ''} ${i > 0 ? 'md:pl-8 md:border-l md:border-slate-200' : ''}`}
            >
              <dt className="text-sm text-slate-500 mt-1">{label}</dt>
              <dd className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">{stat}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ===== MISSION ===== */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">The mission</h2>
              <div className="w-12 h-1 rounded-full bg-amber-500"></div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <p className="text-2xl sm:text-[1.75rem] text-slate-900 leading-snug tracking-tight">
              Founded on the principle that both the sender and the receiver deserve complete transparency, Shiply Cargo was engineered to eliminate the "black box" of modern shipping.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              For too long, logistics data has been siloed across different carriers, customs agencies, and last-mile delivery fleets.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              Our mission is to unify this data. We empower e-commerce brands, medical suppliers, and global distributors by putting total control of tracking data and its distribution directly into their hands. When you use our system, you aren't just shipping a box; you are transmitting a secure stream of location data.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-12">What we hold ourselves to</h2>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border-t-2 border-amber-500 pt-6">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INFRASTRUCTURE ===== */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-slate-200 overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-14">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-6">Infrastructure you can trust</h2>
              <div className="space-y-5 text-slate-500 leading-relaxed">
                <p>
                  Building a reliable tracking system requires more than just a frontend interface; it requires a robust, scalable backend capable of handling thousands of concurrent status updates.
                </p>
                <p>
                  Whether managing a single high-value local delivery or coordinating a complex international freight network, our routing architecture ensures that every physical handoff, security scan, and final mile delivery is logged accurately. We utilize state-of-the-art relational databases and encrypted data streams to guarantee that your delivery timeline is both tamper-proof and instantly accessible.
                </p>
              </div>
            </div>

            {/* Journey timeline */}
            <div className="bg-amber-50 p-8 sm:p-12 lg:p-14 flex items-center">
              <ol className="relative w-full space-y-10 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-px before:bg-amber-300">
                {checkpoints.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="relative flex gap-5">
                    <div className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-amber-50">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-500 rounded-3xl px-8 py-14 sm:px-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
              See the truth about your shipment
            </h2>
            <p className="text-amber-50 text-lg mb-8 max-w-xl mx-auto">
              Enter your tracking code and get instant visibility. No account required.
            </p>
            <Link
              href="/tracking"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-medium px-8 py-3.5 rounded-full transition-colors"
            >
              Track a package
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}