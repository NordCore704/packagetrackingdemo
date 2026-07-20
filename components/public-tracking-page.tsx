'use client'

import { useState } from 'react'
import { Search, Package, MapPin, Calendar, AlertCircle, Loader2, User, Phone, MapPinned, Box } from 'lucide-react'
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
    
    // Respect the case sensitivity toggle
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

  const totalWeight = searchedParcel?.packages?.reduce((sum: number, pkg: any) => sum + (pkg.weight * pkg.quantity), 0) || 0;
  const totalItems = searchedParcel?.packages?.reduce((sum: number, pkg: any) => sum + pkg.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-24">
      
      <div className="absolute top-0 left-0 w-[100%] h-[80%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/80 via-purple-50/20 to-transparent -z-10"></div>

      <header className="w-full max-w-4xl mx-auto px-4 md:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-indigo-700 font-medium mb-6 bg-indigo-50 px-4 py-2 rounded-full">
          <Package className="w-4 h-4" />
          <span className="text-xs sm:text-sm tracking-wide uppercase">Live Shipment Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-slate-900 mb-4 sm:mb-6">
          Track your package.
        </h1>
        <p className="text-base sm:text-lg text-slate-500 mb-8 sm:mb-12 max-w-xl mx-auto">
          Enter your unique tracking code to view real-time routing updates, checkpoint scans, and delivery estimates.
        </p>

        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col items-center gap-4">
            <div className="flex w-full items-center bg-white p-1.5 sm:p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 transition-all focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-within:border-indigo-200">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-3 sm:ml-4 flex-shrink-0" />
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="e.g., APEX-K9M2X"
                // Apply uppercase visually only if case sensitivity is OFF
                className={`flex-1 min-w-0 bg-transparent border-none outline-none px-2 sm:px-4 py-2.5 sm:py-3 text-slate-900 placeholder:text-slate-400 text-sm sm:text-lg ${!caseSensitive ? 'uppercase' : ''}`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !trackingCode.trim()}
                className="px-5 sm:px-8 py-2.5 sm:py-3.5 bg-black text-white text-sm sm:text-base font-medium rounded-full hover:bg-slate-800 transition-colors shadow-md flex-shrink-0 disabled:opacity-70 flex items-center justify-center min-w-[90px] sm:min-w-[120px]"
              >
                {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : 'Track'}
              </button>
            </div>
            
            {/* Case Sensitivity Toggle */}
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/60">
              <span className="text-xs font-medium text-slate-600">Case Sensitive Search</span>
              <button
                type="button"
                role="switch"
                aria-checked={caseSensitive}
                onClick={() => setCaseSensitive(!caseSensitive)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${caseSensitive ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${caseSensitive ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>
          </form>
        </div>
      </header>

      {searched && !isLoading && (
        <main className="w-full max-w-6xl mx-auto px-4 md:px-8 animate-in slide-in-from-bottom-8 duration-500 fade-in">
          {searchedParcel ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              <div className="lg:col-span-5 space-y-6">
                
                {/* Overview Card */}
                <div className="bg-white border border-slate-200 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm">
                  <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Tracking Code</p>
                  <h2 className="text-2xl sm:text-3xl font-mono font-medium text-slate-900 mb-6 tracking-tight break-all">
                    {searchedParcel.trackingCode}
                  </h2>
                  <div className="pb-6 border-b border-slate-100 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <StatusBadge status={searchedParcel.status} />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-1"><Calendar className="w-3.5 h-3.5" /> Dispatch Date</p>
                      <p className="text-sm font-medium text-slate-900">{new Date(searchedParcel.dispatchDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-1"><Calendar className="w-3.5 h-3.5" /> Expected Delivery</p>
                      <p className="text-sm font-medium text-slate-900">
                        {searchedParcel.expectedDeliveryDate ? new Date(searchedParcel.expectedDeliveryDate).toLocaleDateString() : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Routing Card */}
                <div className="bg-white border border-slate-200 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-8">
                  <div className="relative">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 bg-indigo-50 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-indigo-600 flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase mb-1 sm:mb-2">Origin</p>
                        <p className="text-slate-900 font-medium text-base sm:text-lg truncate">{searchedParcel.originCity}, {searchedParcel.originCountry}</p>
                        <div className="mt-2 sm:mt-3 space-y-1">
                          <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 truncate"><User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" /> {searchedParcel.senderName}</p>
                          {searchedParcel.senderPhone && <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 truncate"><Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" /> {searchedParcel.senderPhone}</p>}
                          {searchedParcel.senderAddress && <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-2"><MapPinned className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 mt-0.5 flex-shrink-0" /> <span className="flex-1 break-words">{searchedParcel.senderAddress}</span></p>}
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-[15px] sm:left-[21px] top-[40px] sm:top-[48px] bottom-[-40px] w-[2px] bg-slate-100"></div>
                  </div>

                  <div className="relative pt-2">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 bg-emerald-50 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-emerald-600 flex-shrink-0 z-10">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase mb-1 sm:mb-2">Destination</p>
                        <p className="text-slate-900 font-medium text-base sm:text-lg truncate">{searchedParcel.destinationCity}, {searchedParcel.destinationCountry}</p>
                        <div className="mt-2 sm:mt-3 space-y-1">
                          <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 truncate"><User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" /> {searchedParcel.receiverName}</p>
                          {searchedParcel.receiverPhone && <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 truncate"><Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" /> {searchedParcel.receiverPhone}</p>}
                          {searchedParcel.receiverAddress && <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-2"><MapPinned className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 mt-0.5 flex-shrink-0" /> <span className="flex-1 break-words">{searchedParcel.receiverAddress}</span></p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Manifest */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-base sm:text-lg font-medium text-slate-900 flex items-center gap-2">
                      <Box className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" /> Shipment Manifest
                    </h3>
                    <div className="sm:text-right bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border sm:border-none border-slate-200">
                      <p className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase">Total Weight</p>
                      <p className="text-sm font-medium text-slate-900">{totalWeight.toFixed(1)} kg</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {searchedParcel.packages?.map((pkg: any) => (
                      <div key={pkg.id} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{pkg.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Qty: {pkg.quantity} × {pkg.weight} kg</p>
                        </div>
                        <div className="self-start sm:self-auto text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                          {(pkg.weight * pkg.quantity).toFixed(1)} kg
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Timeline */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-slate-200 rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 shadow-sm h-full">
                  <h3 className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight mb-6 sm:mb-8">
                    Transit History
                  </h3>
                  <Timeline events={searchedParcel.events} />
                </div>
              </div>

            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 text-center shadow-sm">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-slate-900 mb-2 tracking-tight">Tracking code not found</h3>
              <p className="text-sm sm:text-base text-slate-500 max-w-sm mx-auto">
                We couldn't locate a parcel with that exact code in our active database. Please verify the code and try again.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  )
}