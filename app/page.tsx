import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown, CheckCircle2, ArrowLeft, ShieldCheck  } from "lucide-react";
import Image from "next/image";
import { agencies, saas, healthcare, commerce } from "@/exports";

// Placeholder images mimicking the ones in your reference
const industries = [
  {
    name: "SaaS",
    image:
      saas,
  },
  {
    name: "Agencies",
    image:
      agencies,
  },
  {
    name: "eCommerce",
    image:
      commerce,
  },
  {
    name: "Healthcare",
    image:
      healthcare,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* 
        Background Gradient Simulation 
        (Replace this div with your 3D cube image asset if you have it)
      */}
      <div className="absolute top-0 right-0 w-[80%] h-[120%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/60 via-purple-100/40 to-transparent -z-10 transform -rotate-12 translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-blue-50/50 to-transparent -z-10"></div>

      {/* 
        Dotted Grid Pattern overlay (Bottom Right)
      */}
      <div
        className="absolute bottom-10 right-0 w-[50%] h-[20%] opacity-20 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4f46e5 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      ></div>

      {/* Main Hero Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-32">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="flex items-center gap-2 text-indigo-700 font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Logistics orchestration</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.05] mb-6">
            Track your critical shipments.

          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-800 mb-10 max-w-2xl leading-relaxed">
            End-to-end transparency across Origins, Transit Hubs, Customs, and
            Final Delivery.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <Link href="/tracking" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
              Track a package <ArrowRight className="w-5 h-5" />
            </Link>
            {/* <button className="w-full sm:w-auto flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-full text-base font-medium hover:bg-slate-50 transition-all shadow-sm border border-slate-200">
              View live dashboard
            </button> */}
          </div>

          {/* Small subtext */}
          <p className="text-sm text-slate-600 ml-2">
            Real-time updates: {"<"} 1 second latency
          </p>
        </div>
      </main>

      {/* Bottom Curve & Trust Banner */}
      <div className="relative mt-12">
        {/* Soft white overlay curve to mimic the bottom left of the image */}
        <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none z-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
          >
            <path
              d="M0,0 V120 H1200 V0 C600,120 0,0 0,0 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>

        <div className="bg-white pt-16 pb-8 border-t border-slate-100 flex flex-col items-center justify-center relative z-10">
          {/* Bottom Left Icon (Positioned absolutely like the image) */}
          <div className="absolute left-6 top-6 bg-blue-700 text-white p-2 rounded-full hidden md:block">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          {/* Trust Text */}
          <p className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase px-4 md:px-0 mb-2">
            Businesses choose us for reliable delivery
          </p>
        </div>
      </div>
     <section className="bg-black text-white py-24 px-4 md:px-8 overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-3">
            Sectors We Serve
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            Logistics built for your industry
          </h2>
          <p className="text-lg text-slate-300">
            Specialized tracking and handling for your unique shipping requirements.
          </p>
        </div>

        {/* Horizontal Scrolling Cards Grid */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="relative min-w-[280px] md:min-w-[340px] h-[450px] rounded-[2rem] overflow-hidden snap-start flex-shrink-0 bg-slate-900 group"
            >
              {/* Background Image */}
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Top Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent"></div>

              {/* Card Title */}
              <h3 className="absolute top-6 left-6 text-xl font-medium text-white tracking-wide">
                {industry.name}
              </h3>

              {/* 
                CSS Trick to mimic the bottom-left cutout tab
              */}
              <div className="absolute -bottom-1 -left-1 w-24 h-12 bg-black z-10"></div>
              <div className="absolute bottom-11 left-0 w-24 h-12 bg-black rounded-br-[2rem] z-10"></div>
              <div className="absolute bottom-0 left-[5.5rem] w-12 h-12 bg-black rounded-tl-[2rem] z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Footer Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-8">
          
          {/* Left Side: Icon & Text */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2.5 rounded-full flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-300">
              * We customize routing, handling, and security protocols to meet your industry&apos;s specific delivery standards.
            </p>
          </div>

          {/* Right Side: Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Utility class to hide the scrollbar for a cleaner look */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>

    <section className="bg-white py-24 px-4 md:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-[0.15em] text-slate-500 uppercase mb-4">
            How We Work
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            A tracking process built for clarity
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl">
            Real-time milestones, constant communication, and zero black-boxes. Here is how your package moves from origin to destination.
          </p>
        </div>

        {/* Steps Grid */}
        {/* We use a grid layout with rounded borders on the outermost container, and border-r/b to create the internal dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-3xl overflow-hidden">
          
          {/* Step 1 - Active */}
          <div className="relative p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 flex flex-col justify-between min-h-[320px]">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-6 pb-6 border-b border-slate-200">
                Step 01
              </p>
              <h3 className="text-xl font-medium text-slate-900 mb-4 leading-snug">
                Label Creation &<br />Initial Scan
              </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your parcel is logged into our secure database. A unique tracking code is generated and the initial status is immediately visible.
            </p>
            {/* Active Purple Border at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-indigo-600"></div>
          </div>

          {/* Step 2 */}
          <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between min-h-[320px] bg-white">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-6 pb-6 border-b border-slate-200">
                Step 02
              </p>
              <h3 className="text-xl font-medium text-slate-900 mb-4 leading-snug">
                Transit Hubs &<br />Sorting
              </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              As your package moves through distribution centers, our staff logs every checkpoint. You see exactly what city and facility it passes through.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 md:p-10 border-b md:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between min-h-[320px] bg-white">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-6 pb-6 border-b border-slate-200">
                Step 03
              </p>
              <h3 className="text-xl font-medium text-slate-900 mb-4 leading-snug">
                Customs &<br />Security Clearance
              </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              For international freight, we log border transitions securely. Bottlenecks are identified immediately with clear status updates.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-8 md:p-10 flex flex-col justify-between min-h-[320px] bg-white">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-6 pb-6 border-b border-slate-200">
                Step 04
              </p>
              <h3 className="text-xl font-medium text-slate-900 mb-4 leading-snug">
                Final Mile &<br />Delivery Confirmation
              </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The package goes out for delivery. Once handed over, the driver confirms the drop-off, closing the loop with a timestamped final log.
            </p>
          </div>

        </div>

        {/* Contact Footer */}
        {/* <div className="mt-16 text-center">
          <p className="text-xl font-medium text-slate-900">
            Need custom routing?{' '}
            <Link href="tel:+2340000000000" className="text-indigo-600 hover:text-indigo-700 transition-colors">
              Call our logistics team
            </Link>
          </p>
        </div> */}

      </div>
    </section>
    </div>
  );
}
