import { Sparkles, Globe2, ShieldCheck, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-24">
      
      {/* Subtle Background Gradient to match landing page */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/60 via-purple-50/40 to-transparent -z-10 transform -rotate-12 translate-x-20 -translate-y-20"></div>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-indigo-700 font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 leading-[1.05] mb-8">
            Orchestrating global logistics with absolute clarity.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Legacy shipping systems rely on fragmented data and delayed updates. We built Apexbit Cargo to provide instant, verifiable truth for every package in transit.
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Core Pillars */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* The Mission */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-medium text-slate-900 mb-6 tracking-tight">The Mission</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Founded on the principle that both the sender and the receiver deserve complete transparency, Apexbit Cargo was engineered to eliminate the "black box" of modern shipping. For too long, logistics data has been siloed across different carriers, customs agencies, and last-mile delivery fleets.
                </p>
                <p>
                  Our mission is to unify this data. We empower e-commerce brands, medical suppliers, and global distributors by putting total control of tracking data and its distribution directly into their hands. When you use our system, you aren't just shipping a box; you are transmitting a secure stream of location data.
                </p>
              </div>
            </div>

            {/* The Infrastructure */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-medium text-slate-900 mb-6 tracking-tight">Infrastructure You Can Trust</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Building a reliable tracking system requires more than just a frontend interface; it requires a robust, scalable backend capable of handling thousands of concurrent status updates. 
                </p>
                <p>
                  Whether managing a single high-value local delivery or coordinating a complex international freight network, our routing architecture ensures that every physical handoff, security scan, and final mile delivery is logged accurately. We utilize state-of-the-art relational databases and encrypted data streams to guarantee that your delivery timeline is both tamper-proof and instantly accessible.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Values / Quick Facts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-black text-white rounded-3xl p-8 h-full">
              <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-8 pb-6 border-b border-slate-800">
                Core Values
              </p>
              
              <div className="space-y-8">
                <div>
                  <Globe2 className="w-6 h-6 text-indigo-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Borderless Operation</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Our tracking codes are standardized to work across international hubs without data loss.</p>
                </div>
                
                <div>
                  <Zap className="w-6 h-6 text-indigo-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Zero Latency</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">When a barcode is scanned at a sorting facility, your dashboard updates in under a second.</p>
                </div>

                <div>
                  <ShieldCheck className="w-6 h-6 text-indigo-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Data Integrity</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">We strictly protect receiver PII (Personally Identifiable Information) while keeping shipment statuses public.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Strip - Redesigned to match the dark scheme */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-black text-white rounded-[2rem] p-8 md:p-12 overflow-hidden relative">
          
          {/* Decorative cutouts to mimic the industries section style */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-600 rounded-full blur-[80px] opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-50"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
            {[
              ['99.9%', 'System Uptime'], 
              ['24/7', 'Node Monitoring'], 
              ['100+', 'Supported Hubs'], 
              ['Zero', 'Data Breaches']
            ].map(([stat, label], i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-medium tracking-tight mb-2">{stat}</div>
                <div className="text-sm font-medium tracking-wide text-slate-400 uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}