'use client'

import { useState } from 'react'
import {
  Search,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
  Loader2,
  User,
  Phone,
  MapPinned,
  Box,
  ArrowRight,
} from 'lucide-react'
import { getParcelTracking } from '@/app/actions/parcel-actions'
import { StatusBadge } from './status-badge'
import { Timeline } from './timeline'

export function PublicTrackingPage() {
  const [trackingCode, setTrackingCode] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [searchedParcel, setSearchedParcel] = useState<any>(null)
  const [searched, setSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    const rawCode = trackingCode.trim()
    const code = caseSensitive ? rawCode : rawCode.toUpperCase()

    if (code) {
      setIsLoading(true)
      setSearched(false)

      const response = await getParcelTracking(code)

      if (response.success && response.parcel) {
        setSearchedParcel(response.parcel)
      } else {
        setSearchedParcel(null)
      }

      setIsLoading(false)
      setSearched(true)
    }
  }

  const totalWeight =
    searchedParcel?.packages?.reduce(
      (sum: number, pkg: any) => sum + pkg.weight * pkg.quantity,
      0
    ) || 0

  return (
    <div className="min-h-screen bg-white">
      {/* ===== SEARCH HEADER ===== */}
      <section className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3.5 py-1.5 rounded-full mb-6">
            <Package className="w-4 h-4" />
            Live Tracking
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            Track your package
          </h1>

          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
            Enter your tracking code to see real-time status, location history, and delivery details.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition-all overflow-hidden">
              <Search className="w-5 h-5 text-slate-400 ml-5 flex-shrink-0" />
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="e.g. APEX-K9M2X"
                className={`flex-1 min-w-0 bg-transparent border-none outline-none px-4 py-4 text-slate-900 placeholder:text-slate-400 text-base ${
                  !caseSensitive ? 'uppercase' : ''
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !trackingCode.trim()}
                className="m-1.5 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-medium rounded-full transition-colors flex items-center justify-center min-w-[100px]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Track'
                )}
              </button>
            </div>

            {/* Case sensitivity */}
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
              <span>Case sensitive</span>
              <button
                type="button"
                role="switch"
                aria-checked={caseSensitive}
                onClick={() => setCaseSensitive(!caseSensitive)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  caseSensitive ? 'bg-amber-500' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    caseSensitive ? 'translate-x-4.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      {searched && !isLoading && (
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {searchedParcel ? (
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Overview Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Tracking Code
                    </p>
                    <h2 className="text-2xl font-mono font-medium text-slate-900 mb-5 break-all">
                      {searchedParcel.trackingCode}
                    </h2>

                    <div className="mb-6">
                      <StatusBadge status={searchedParcel.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-5 pt-5 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          Dispatched
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          {new Date(searchedParcel.dispatchDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          Expected
                        </p>
                        <p className="text-sm font-medium text-slate-900">
                          {searchedParcel.expectedDeliveryDate
                            ? new Date(searchedParcel.expectedDeliveryDate).toLocaleDateString()
                            : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Route Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-8">
                    {/* Origin */}
                    <div className="relative">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                            Origin
                          </p>
                          <p className="font-medium text-slate-900">
                            {searchedParcel.originCity}, {searchedParcel.originCountry}
                          </p>
                          <div className="mt-2 space-y-1 text-sm text-slate-500">
                            <p className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              {searchedParcel.senderName}
                            </p>
                            {searchedParcel.senderPhone && (
                              <p className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {searchedParcel.senderPhone}
                              </p>
                            )}
                            {searchedParcel.senderAddress && (
                              <p className="flex items-start gap-2">
                                <MapPinned className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                                <span>{searchedParcel.senderAddress}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-5 top-12 bottom-[-32px] w-px bg-slate-200" />
                    </div>

                    {/* Destination */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 z-10">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                          Destination
                        </p>
                        <p className="font-medium text-slate-900">
                          {searchedParcel.destinationCity}, {searchedParcel.destinationCountry}
                        </p>
                        <div className="mt-2 space-y-1 text-sm text-slate-500">
                          <p className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {searchedParcel.receiverName}
                          </p>
                          {searchedParcel.receiverPhone && (
                            <p className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {searchedParcel.receiverPhone}
                            </p>
                          )}
                          {searchedParcel.receiverAddress && (
                            <p className="flex items-start gap-2">
                              <MapPinned className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                              <span>{searchedParcel.receiverAddress}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manifest */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-medium text-slate-900 flex items-center gap-2">
                        <Box className="w-4 h-4 text-amber-500" />
                        Manifest
                      </h3>
                      <p className="text-sm font-medium text-slate-700">
                        {totalWeight.toFixed(1)} kg total
                      </p>
                    </div>

                    <div className="space-y-3">
                      {searchedParcel.packages?.map((pkg: any) => (
                        <div
                          key={pkg.id}
                          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 text-sm truncate">
                              {pkg.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Qty {pkg.quantity} × {pkg.weight} kg
                            </p>
                          </div>
                          <div className="text-sm font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg whitespace-nowrap">
                            {(pkg.weight * pkg.quantity).toFixed(1)} kg
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN - Timeline */}
                <div className="lg:col-span-7">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 h-full">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">
                      Transit History
                    </h3>
                    <Timeline events={searchedParcel.events} />
                  </div>
                </div>
              </div>
            ) : (
              /* Not Found State */
              <div className="max-w-md mx-auto text-center py-16">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Tracking code not found
                </h3>
                <p className="text-slate-500 mb-6">
                  We couldn’t find a shipment with that code. Please double-check and try again.
                </p>
                <button
                  onClick={() => {
                    setSearched(false)
                    setTrackingCode('')
                  }}
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Try another code
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}