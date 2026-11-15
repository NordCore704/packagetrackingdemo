import { ChevronDown } from 'lucide-react'

const prohibited = [
  'Using our logistics network to transport illegal, hazardous, or heavily restricted materials without explicit corporate authorization.',
  'Deploying automated scraping tools, bots, or excessive API requests against our public tracking endpoints (rate limits are strictly enforced).',
  'Attempting to access administrative portals, manipulate tracking statuses, or view shipping manifests without authorized credentials.',
]

const body = 'text-slate-600 leading-relaxed'

function Term({ title, defaultOpen = false, children }) {
  return (
    <details
      open={defaultOpen}
      className="group bg-white border border-slate-200 rounded-2xl open:border-amber-300 open:shadow-lg open:shadow-amber-100/60 transition-shadow"
    >
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 py-5 rounded-2xl focus-visible:outline-2 focus-visible:outline-amber-500">
        <h2 className="text-lg sm:text-xl font-medium text-slate-900">{title}</h2>
        <span className="w-8 h-8 shrink-0 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center group-open:bg-amber-500 group-open:text-white transition-colors">
          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <div className="px-6 pb-6 -mt-1">{children}</div>
    </details>
  )
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white font-sans pb-24">

      {/* ===== HEADER: title left, date right ===== */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 lg:pt-36 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
            Terms of Service
          </h1>
          <p className="text-slate-500 sm:text-right shrink-0">Last updated<br className="hidden sm:block" /> January 25, 2026</p>
        </div>
        <p className="text-lg text-slate-500 leading-relaxed border-l-4 border-amber-500 pl-5">
          Welcome to Shiply Cargo. By accessing our platform or utilizing our logistics and parcel tracking services, you agree to be bound by these Terms of Service. Please read them carefully before using our infrastructure.
        </p>
      </header>

      {/* ===== ACCORDION ===== */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3">

        <Term title="1. Description of Services" defaultOpen>
          <p className={body}>
            Shiply Cargo provides digital logistics management, real-time shipment tracking, and network routing solutions. Our public-facing services allow users to track registered parcels using a unique identifier. Our administrative services provide enterprise tools for label creation, manifest management, and checkpoint logging.
          </p>
        </Term>

        <Term title="2. User Conduct & Acceptable Use">
          <p className={`${body} mb-4`}>You agree to use our services only for lawful purposes. You are strictly prohibited from:</p>
          <ul className="space-y-3">
            {prohibited.map((item) => (
              <li key={item} className="flex gap-3 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 leading-relaxed">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </Term>

        <Term title="3. Service Availability and Accuracy">
          <p className={body}>
            While we strive for 99.9% uptime, we do not guarantee uninterrupted access to our tracking portal. Delivery dates provided via our platform are <strong className="text-slate-900">estimates based on real-time transit data</strong> and do not constitute a legally binding delivery guarantee unless explicitly stated under a specialized enterprise contract.
          </p>
        </Term>

        <Term title="4. Intellectual Property">
          <p className={body}>
            All content, visual interfaces, tracking algorithms, and database structures hosted on ShiplyCargo are the exclusive intellectual property of our organization. You may not copy, reverse-engineer, or distribute our proprietary software components.
          </p>
        </Term>

        <Term title="5. Limitation of Liability">
          <p className={body}>
            Shiply Cargo shall not be held liable for any indirect, incidental, or consequential damages arising from delayed shipments, inaccurate tracking updates due to third-party carrier failures, or temporary service outages. Our total liability for any claim arising from our digital services is limited to the amount paid for the specific shipment in question.
          </p>
        </Term>

        <Term title="6. Governing Law">
          <p className={body}>
            These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any legal actions or proceedings arising out of these Terms shall be brought exclusively in the courts.
          </p>
        </Term>

      </main>
    </div>
  )
}