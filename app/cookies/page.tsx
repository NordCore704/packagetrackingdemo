import { Cookie } from 'lucide-react'

export default function CookieGuidelinesPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-24">
      
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/80 via-purple-50/40 to-transparent -z-10 transform -rotate-12 translate-x-20 -translate-y-20"></div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-indigo-700 font-medium mb-6 bg-indigo-50 px-4 py-2 rounded-full">
          <Cookie className="w-4 h-4" />
          <span className="text-sm tracking-wide uppercase">Transparency</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-6">
          Cookie Guidelines
        </h1>
        <p className="text-lg text-slate-500">
          Last Updated: July 19, 2026
        </p>
      </header>

      {/* Document Container */}
      <main className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm">
          
          <div className="prose prose-slate prose-indigo max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600">
            <p className="text-lg text-slate-800 mb-4">
              This policy explains how Apexbit uses cookies and similar tracking technologies to ensure our logistics platform runs securely and efficiently. By continuing to use our platform, you consent to our use of these technologies as described below.
            </p>
            
            <hr className="my-8 border-slate-900 bg-slate-900 text-black" />

            <h2 className='font-semibold text-slate-900 mb-2'>1. What Are Cookies?</h2>
            <p className="text-slate-700 mb-4">
              Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by online service providers to facilitate secure logins, remember user preferences, and generate analytics regarding site traffic.
            </p>

            <h2 className='font-semibold text-slate-900 mb-2'>2. How We Use Cookies</h2>
            <p className="mb-4 text-slate-700">
              Our platform categorizes cookies into three primary operational buckets:
            </p>
            <ul className="mb-4 text-slate-700">
              <li><strong>Strictly Necessary / Security Cookies:</strong> These are essential for the platform to function. We use secure, HTTP-only cookies (like our <code>admin_token</code>) to authenticate staff members into the <code>/arc</code> administrative dashboards. Without these, the core routing and tracking update features cannot operate.</li>
              <li><strong>Functional Cookies:</strong> These remember choices you make, such as dismissing our cookie consent banner (saved as <code>apexbit_cookie_consent</code> in your browser's local storage), so you aren't asked repeatedly upon every visit.</li>
              <li><strong>Performance & Analytics Cookies:</strong> We utilize lightweight analytics to monitor the latency of our public tracking API. This helps us ensure that users querying their tracking codes receive instantaneous feedback without server timeouts.</li>
            </ul>

            <h2 className='font-semibold text-slate-900 mb-2'>3. Data Collection Scope</h2>
            <p className="mb-4 text-slate-700">
              <strong>We do not use tracking cookies to build marketing profiles or target you with third-party advertisements.</strong> Our tracking is strictly limited to infrastructure performance and administrative security. If you look up a parcel, your IP address may be temporarily logged to prevent automated scraping of our tracking endpoints.
            </p>

            <h2 className='font-semibold text-slate-900 mb-2'>4. Managing Your Preferences</h2>
            <p className="mb-4 text-slate-700">
              You have the right to decide whether to accept or reject non-essential cookies. You can exercise your preferences by clicking the appropriate buttons on our floating consent banner when you first arrive at the site. 
            </p>
            <p className="mb-4 text-slate-700">
              Additionally, you can set or amend your web browser controls to accept or refuse cookies. If you choose to reject strictly necessary cookies, you may still use our public tracking page, but access to secure administrative areas will be denied.
            </p>

            <h2 className="font-semibold text-slate-900 mb-2">5. Contact Us</h2>
            <p className=" text-slate-700">
              If you have any questions about our use of cookies or other technologies, please contact our data privacy team through the main contact portal on our website.
            </p>
          </div>

        </div>
      </main>

    </div>
  )
}