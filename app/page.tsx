import Link from "next/link";
import { Sparkles, ChevronDown, ArrowLeft, ShieldCheck, ArrowRight, Package, MapPin, Clock, Shield, CheckCircle2, Truck } from "lucide-react";
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
   <div className="min-h-screen bg-white">

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3.5 py-1.5 rounded-full mb-6">
                <Package className="w-4 h-4" />
                Real-time parcel tracking
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-slate-900 leading-[1.15] mb-6">
                Track your shipments with complete clarity
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                From the moment a label is created to final delivery — see every checkpoint, status, and location in real time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tracking"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-7 py-3.5 rounded-full transition-colors"
                >
                  Track a package
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-7 py-3.5 rounded-full border border-slate-200 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xl shadow-slate-200/60">
                {/* Replace this with a real truck/logistics image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <Truck className="w-24 h-24 text-slate-300" />
                </div>
              </div>
              
              {/* Floating status card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-slate-100 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Out for delivery</p>
                  <p className="text-xs text-slate-500">Updated 2 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
              Everything you need to stay in control
            </h2>
            <p className="text-slate-500 text-lg">
              Clear visibility at every stage of the journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Live location updates",
                desc: "See exactly where your package is — from origin hub to final mile."
              },
              {
                icon: Clock,
                title: "Real-time status",
                desc: "Instant updates the moment a checkpoint is scanned. No delays, no guessing."
              },
              {
                icon: Shield,
                title: "Secure by design",
                desc: "Every status change is logged and protected. Full audit trail included."
              },
              {
                icon: Package,
                title: "Detailed manifest",
                desc: "View package contents, weight, and quantity at a glance."
              },
              {
                icon: CheckCircle2,
                title: "Delivery confirmation",
                desc: "Know the exact moment your shipment is signed for and completed."
              },
              {
                icon: Truck,
                title: "Full journey history",
                desc: "A complete timeline of every event from label creation to delivery."
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
              How tracking works
            </h2>
            <p className="text-slate-500 text-lg">
              Four clear stages. Complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Label created",
                desc: "Your parcel is registered and receives a unique tracking code."
              },
              {
                step: "02",
                title: "In transit",
                desc: "Every hub and sorting center is logged with timestamp and location."
              },
              {
                step: "03",
                title: "Customs & clearance",
                desc: "Border and security checks are recorded as they happen."
              },
              {
                step: "04",
                title: "Delivered",
                desc: "Final mile confirmation closes the journey with a clear timestamp."
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-sm font-semibold text-amber-500 mb-3">{item.step}</div>
                <h3 className="font-medium text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-500 rounded-3xl px-8 py-14 sm:px-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
              Ready to track your next shipment?
            </h2>
            <p className="text-amber-50 text-lg mb-8 max-w-xl mx-auto">
              Enter your tracking code and get instant visibility — no account required.
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
  );
}
