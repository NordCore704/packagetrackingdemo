import { ShieldCheck } from 'lucide-react'

const sections = [
  { id: 'information-we-collect', title: '1. Information We Collect' },
  { id: 'how-we-use-your-data', title: '2. How We Use Your Data' },
  { id: 'cookies', title: '3. Cookies and Tracking Technologies' },
  { id: 'retention', title: '4. Data Retention & Compliance' },
  { id: 'jurisdiction', title: '5. Jurisdiction and Your Rights' },
]

const h2 = 'text-2xl font-semibold tracking-tight text-slate-900 mb-4 scroll-mt-28'
const p = 'text-slate-600 leading-relaxed'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans pb-24">

      {/* ===== HEADER BAND ===== */}
      <header className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 lg:pt-36 pb-12">
          <p className="text-slate-500 mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500">Last updated January 22, 2026</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 grid lg:grid-cols-12 gap-10 lg:gap-16">

        {/* ===== STICKY TABLE OF CONTENTS ===== */}
        <aside className="lg:col-span-4">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="text-sm font-medium text-slate-900 mb-4">On this page</p>
            <ul className="border-l border-slate-200">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block -ml-px border-l-2 border-transparent hover:border-amber-500 hover:text-slate-900 text-slate-500 text-sm py-2 pl-4 transition-colors focus-visible:outline-none focus-visible:border-amber-500 focus-visible:text-slate-900"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ===== CONTENT ===== */}
        <main className="lg:col-span-8 max-w-2xl">

          <p className="text-xl text-slate-900 leading-relaxed mb-10">
            At Shiply Cargo, we are committed to maintaining the trust and confidence of our users. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you utilize our logistics management and real-time parcel tracking services.
          </p>

          {/* Promise callout */}
          <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-14">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="font-medium text-slate-900 leading-relaxed">
              Shiply Cargo does not, and will never, sell your logistics data, routing histories, or personal information to third-party advertisers.
            </p>
          </div>

          <div className="space-y-14">

            <section id="information-we-collect">
              <h2 className={h2}>1. Information We Collect</h2>
              <p className={`${p} mb-5`}>We gather data across two primary operational categories to ensure seamless delivery tracking:</p>
              <dl className="space-y-4">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <dt className="font-medium text-slate-900 mb-1">Public Tracking Users</dt>
                  <dd className={`${p} text-[0.95rem]`}>When you search for a package, we temporarily log your IP address, browser type, and the queried tracking codes to monitor for automated scraping and prevent system abuse.</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 p-5">
                  <dt className="font-medium text-slate-900 mb-1">Administrative & Enterprise Users</dt>
                  <dd className={`${p} text-[0.95rem]`}>For operators managing logistics networks, we collect standard account credentials (name, email), sender and receiver routing details, and payment information necessary for software billing.</dd>
                </div>
              </dl>
            </section>

            <section id="how-we-use-your-data">
              <h2 className={h2}>2. How We Use Your Data</h2>
              <p className={`${p} mb-5`}>We process your data strictly to execute our core logistics operations. Specifically:</p>
              <ul className="space-y-3">
                {[
                  'To broadcast real-time parcel status updates across our distributed network.',
                  'To secure our infrastructure, including rate-limiting API requests and preventing unauthorized database access.',
                  'To issue operational notifications, such as delivery exceptions, customs delays, and platform updates.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="cookies">
              <h2 className={h2}>3. Cookies and Tracking Technologies</h2>
              <p className={p}>We utilize encrypted session cookies to authenticate administrative users and lightweight performance cookies to monitor dashboard latency. You retain full control over non-essential tracking technologies via our consent manager, accessible upon your first visit.</p>
            </section>

            <section id="retention">
              <h2 className={h2}>4. Data Retention & Compliance</h2>
              <p className={p}>Tracking event logs and routing histories are retained for a standard operational period of 12 months post-delivery. This duration allows for necessary financial audits, insurance claims, and support inquiries. Upon the expiration of this period, identifiable receiver addresses and contact details are permanently obfuscated from our active databases.</p>
            </section>

            <section id="jurisdiction">
              <h2 className={h2}>5. Jurisdiction and Your Rights</h2>
              <p className={p}>Operating out of Idaho, US we align our data practices with the United States Data Protection Act (USDPA), while maintaining compliance with international standards (such as GDPR) for global shipments. You have the right to request access to, correction of, or deletion of your personal profile data. Enterprise administrators can execute these requests directly via their secure control panel.</p>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}