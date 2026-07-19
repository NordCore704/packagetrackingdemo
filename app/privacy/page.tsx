import { ShieldAlert } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-24">
      
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/80 via-purple-50/40 to-transparent -z-10 transform -rotate-12 translate-x-20 -translate-y-20"></div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-indigo-700 font-medium mb-6 bg-indigo-50 px-4 py-2 rounded-full">
          <ShieldAlert className="w-4 h-4" />
          <span className="text-sm tracking-wide uppercase">Legal Documentation</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-500">
          Last Updated: July 18, 2026
        </p>
      </header>

      {/* Document Container */}
      <main className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm">
          
          <div className="prose prose-slate prose-indigo max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-relaxed text-black">
            <p className="text-lg">
              At ApexBit, we are committed to maintaining the trust and confidence of our users. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you utilize our logistics management and real-time parcel tracking services.
            </p>
            
            <hr className="my-8 border-slate-100" />

            <h2>1. Information We Collect</h2>
            <p>We gather data across two primary operational categories to ensure seamless delivery tracking:</p>
            <ul className="mb-3">
              <li><strong>Public Tracking Users:</strong> When you search for a package, we temporarily log your IP address, browser type, and the queried tracking codes to monitor for automated scraping and prevent system abuse.</li>
              <li><strong>Administrative & Enterprise Users:</strong> For operators managing logistics networks, we collect standard account credentials (name, email), sender and receiver routing details, and payment information necessary for software billing.</li>
            </ul>

            <h2>2. How We Use Your Data</h2>
            <p>We process your data strictly to execute our core logistics operations. Specifically:</p>
            <ul>
              <li>To broadcast real-time parcel status updates across our distributed network.</li>
              <li>To secure our infrastructure, including rate-limiting API requests and preventing unauthorized database access.</li>
              <li>To issue operational notifications, such as delivery exceptions, customs delays, and platform updates.</li>
            </ul>
            <p className='mb-3'><strong>Apexbit does not, and will never, sell your logistics data, routing histories, or personal information to third-party advertisers.</strong></p>

            <h2>3. Cookies and Tracking Technologies</h2>
            <p className='mb-3'>We utilize encrypted session cookies to authenticate administrative users and lightweight performance cookies to monitor dashboard latency. You retain full control over non-essential tracking technologies via our consent manager, accessible upon your first visit.</p>

            <h2>4. Data Retention & Compliance</h2>
            <p className='mb-3'>Tracking event logs and routing histories are retained for a standard operational period of 12 months post-delivery. This duration allows for necessary financial audits, insurance claims, and support inquiries. Upon the expiration of this period, identifiable receiver addresses and contact details are permanently obfuscated from our active databases.</p>

            <h2>5. Jurisdiction and Your Rights</h2>
            <p>Operating out of Idaho, US we align our data practices with the United States Data Protection Act (USDPA), while maintaining compliance with international standards (such as GDPR) for global shipments. You have the right to request access to, correction of, or deletion of your personal profile data. Enterprise administrators can execute these requests directly via their secure control panel.</p>
          </div>

        </div>
      </main>

    </div>
  )
}