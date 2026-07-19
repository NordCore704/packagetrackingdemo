import { Scale } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-24">
      
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/80 via-purple-50/40 to-transparent -z-10 transform -rotate-12 translate-x-20 -translate-y-20"></div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-12 text-center text-slate-900">
        <div className="inline-flex items-center gap-2 text-indigo-700 font-medium mb-6 bg-indigo-50 px-4 py-2 rounded-full">
          <Scale className="w-4 h-4" />
          <span className="text-sm tracking-wide uppercase">Legal Documentation</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-lg text-slate-500">
          Last Updated: July 19, 2026
        </p>
      </header>

      {/* Document Container */}
      <main className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm">
          
          <div className="prose prose-slate prose-indigo max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600">
            <p className="text-lg text-slate-700">
              Welcome to Apexbit Cargo. By accessing our platform or utilizing our logistics and parcel tracking services, you agree to be bound by these Terms of Service. Please read them carefully before using our infrastructure.
            </p>
            
            <hr className="my-8 border-slate-900 bg-slate-900 text-black" />

            <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Description of Services</h2>
            <p className="text-slate-700 mb-4">
              Apexbit Cargo provides digital logistics management, real-time shipment tracking, and network routing solutions. Our public-facing services allow users to track registered parcels using a unique identifier. Our administrative services provide enterprise tools for label creation, manifest management, and checkpoint logging.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">2. User Conduct & Acceptable Use</h2>
            <p className="text-slate-700 mb-4">You agree to use our services only for lawful purposes. You are strictly prohibited from:</p>
            <ul>
              <li className="text-slate-700 mb-2">Using our logistics network to transport illegal, hazardous, or heavily restricted materials without explicit corporate authorization.</li>
              <li className="text-slate-700 mb-2">Deploying automated scraping tools, bots, or excessive API requests against our public tracking endpoints (rate limits are strictly enforced).</li>
              <li className="text-slate-700 mb-4">Attempting to access administrative portals, manipulate tracking statuses, or view shipping manifests without authorized credentials.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">3. Service Availability and Accuracy</h2>
            <p className="text-slate-700 mb-4">
              While we strive for 99.9% uptime, we do not guarantee uninterrupted access to our tracking portal. Delivery dates provided via our platform are <strong>estimates based on real-time transit data</strong> and do not constitute a legally binding delivery guarantee unless explicitly stated under a specialized enterprise contract.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">4. Intellectual Property</h2>
            <p className="text-slate-700 mb-4">
              All content, visual interfaces, tracking algorithms, and database structures hosted on ApexBitOnline are the exclusive intellectual property of our organization. You may not copy, reverse-engineer, or distribute our proprietary software components.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">5. Limitation of Liability</h2>
            <p className="text-slate-700 mb-4">
              Apexbit Cargo shall not be held liable for any indirect, incidental, or consequential damages arising from delayed shipments, inaccurate tracking updates due to third-party carrier failures, or temporary service outages. Our total liability for any claim arising from our digital services is limited to the amount paid for the specific shipment in question.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">6. Governing Law</h2>
            <p className="text-slate-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any legal actions or proceedings arising out of these Terms shall be brought exclusively in the courts.
            </p>
          </div>

        </div>
      </main>

    </div>
  )
}