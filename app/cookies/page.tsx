import { Cookie, Lock, SlidersHorizontal, Activity } from 'lucide-react'

const h2 = 'text-xl font-semibold tracking-tight text-slate-900'
const body = 'text-slate-600 leading-relaxed'
const code = 'font-mono text-[0.85em] bg-amber-50 text-amber-800 border border-amber-200 rounded px-1.5 py-0.5'

const types = [
  {
    icon: Lock,
    title: 'Strictly necessary / security',
    desc: (
      <>
        These are essential for the platform to function. We use secure, HTTP-only cookies (like our <code className={code}>admin_token</code>) to authenticate staff members into the <code className={code}>/arc</code> administrative dashboards. Without these, the core routing and tracking update features cannot operate.
      </>
    ),
  },
  {
    icon: SlidersHorizontal,
    title: 'Functional',
    desc: (
      <>
        These remember choices you make, such as dismissing our cookie consent banner (saved as <code className={code}>shiply_cookie_consent</code> in your browser's local storage), so you aren't asked repeatedly upon every visit.
      </>
    ),
  },
  {
    icon: Activity,
    title: 'Performance & analytics',
    desc: 'We utilize lightweight analytics to monitor the latency of our public tracking API. This helps us ensure that users querying their tracking codes receive instantaneous feedback without server timeouts.',
  },
]

function Row({ title, children }) {
  return (
    <section className="grid md:grid-cols-12 gap-3 md:gap-10 py-10 border-t border-slate-200">
      <h2 className={`${h2} md:col-span-4`}>{title}</h2>
      <div className="md:col-span-8 space-y-4 max-w-2xl">{children}</div>
    </section>
  )
}

export default function CookieGuidelinesPage() {
  return (
    <div className="min-h-screen bg-white font-sans pb-24">

      {/* ===== HEADER ===== */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 lg:pt-36 pb-14">
        <div className="flex items-start gap-5">
          <div className="hidden sm:flex w-16 h-16 shrink-0 rounded-2xl bg-amber-500 text-white items-center justify-center">
            <Cookie className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-3">
              Cookie Guidelines
            </h1>
            <p className="text-slate-500 mb-8">Last updated January 25, 2026</p>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              This policy explains how Shiply Cargo uses cookies and similar tracking technologies to ensure our logistics platform runs securely and efficiently. By continuing to use our platform, you consent to our use of these technologies as described below.
            </p>
          </div>
        </div>
      </header>

      {/* ===== COOKIE TYPES: three columns on a tinted band ===== */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">How we use cookies</h2>
          <p className="text-slate-500 mb-10">Our platform categorizes cookies into three primary operational buckets.</p>

          <div className="grid md:grid-cols-3 gap-px bg-slate-200 rounded-3xl overflow-hidden border border-slate-200">
            {types.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="bg-white p-8">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LABEL / TEXT ROWS ===== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">

        <Row title="1. What are cookies?">
          <p className={body}>
            Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by online service providers to facilitate secure logins, remember user preferences, and generate analytics regarding site traffic.
          </p>
        </Row>

        <Row title="2. Data collection scope">
          <p className="text-lg font-medium text-slate-900 leading-snug">
            We do not use tracking cookies to build marketing profiles or target you with third-party advertisements.
          </p>
          <p className={body}>
            Our tracking is strictly limited to infrastructure performance and administrative security. If you look up a parcel, your IP address may be temporarily logged to prevent automated scraping of our tracking endpoints.
          </p>
        </Row>

        <Row title="3. Managing your preferences">
          <p className={body}>
            You have the right to decide whether to accept or reject non-essential cookies. You can exercise your preferences by clicking the appropriate buttons on our floating consent banner when you first arrive at the site.
          </p>
          <p className={body}>
            Additionally, you can set or amend your web browser controls to accept or refuse cookies. If you choose to reject strictly necessary cookies, you may still use our public tracking page, but access to secure administrative areas will be denied.
          </p>
        </Row>

        <Row title="4. Contact us">
          <p className={body}>
            If you have any questions about our use of cookies or other technologies, please contact our data privacy team through the main contact portal on our website.
          </p>
        </Row>

      </main>
    </div>
  )
}