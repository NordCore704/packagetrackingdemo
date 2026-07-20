'use client'

import { useState, useEffect } from 'react'
import { MapPin, MapPinned, MessageSquare, Loader2, CheckCircle2, Package, Calendar } from 'lucide-react'
import { getAllParcels, addTrackingEvent } from '@/app/actions/parcel-actions'
import { StatusBadge } from './status-badge'

export function AdminStatusUpdate() {
  const [parcels, setParcels] = useState<any[]>([])
  const [isLoadingParcels, setIsLoadingParcels] = useState(true)
  
  const [selectedParcelId, setSelectedParcelId] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('IN_TRANSIT')
  const [statusMessage, setStatusMessage] = useState('')
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Fetch active parcels for the dropdown
  useEffect(() => {
    async function load() {
      const res = await getAllParcels()
      if (res.success && res.parcels) {
        setParcels(res.parcels)
      }
      setIsLoadingParcels(false)
    }
    load()
  }, [])

  const selectedParcel = parcels.find((p) => p.id === selectedParcelId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedParcelId || !location || !status || !statusMessage) {
      setError('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setError('')

    const response = await addTrackingEvent({
      parcelId: selectedParcelId,
      status,
      location,
      statusMessage,
      expectedDeliveryDate: expectedDeliveryDate || undefined
    })

    if (response.success) {
      setLocation('')
      setStatusMessage('')
      setExpectedDeliveryDate('')
      setSelectedParcelId('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    } else {
      setError(response.error || 'Failed to update status.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-3xl mx-auto font-sans pb-32 pt-12 px-4 md:px-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-slate-900">Update Shipment Status</h1>
        <p className="text-slate-500 mt-1">Log a new transit checkpoint and update delivery estimates.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
        
        {/* Success State */}
        {submitted && (
          <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-3xl animate-in fade-in slide-in-from-top-4 flex items-start gap-4">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 flex-shrink-0 mt-1">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900 tracking-tight text-lg mb-1">Network Updated</h3>
              <p className="text-emerald-700 text-sm">The tracking event has been securely logged to the parcel timeline and the public tracker is now updated.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Parcel Selection */}
          <div className="space-y-4">
            <label htmlFor="parcel" className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase ml-2">
              Select Active Shipment *
            </label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                id="parcel"
                value={selectedParcelId}
                onChange={(e) => setSelectedParcelId(e.target.value)}
                disabled={isLoadingParcels}
                className="w-full pl-12 pr-10 py-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">{isLoadingParcels ? 'Loading network data...' : 'Select a tracking code...'}</option>
                {parcels.map((parcel) => (
                  <option key={parcel.id} value={parcel.id}>
                    {parcel.trackingCode} — To: {parcel.receiverName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Parcel Preview */}
          {selectedParcel && (
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 animate-in fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-1">Tracker ID</p>
                  <p className="font-mono font-semibold text-indigo-950">{selectedParcel.trackingCode}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-1">Current Status</p>
                  <StatusBadge status={selectedParcel.status} />
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-1">Destination</p>
                  <p className="font-medium text-indigo-950 truncate">{selectedParcel.destinationCity}, {selectedParcel.destinationCountry}</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Update Details */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-medium text-slate-900 flex items-center gap-2">
              <MapPinned className="w-5 h-5 text-indigo-500" /> New Checkpoint Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Dropdown */}
              <div className="space-y-2">
                <label htmlFor="status" className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase ml-2">
                  New Status *
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="IN_TRANSIT">In Transit</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="EXCEPTION">Exception (Delay/Hold)</option>
                </select>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label htmlFor="location" className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase ml-2">
                  Checkpoint Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Apex Transit Hub"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Status Message */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="statusMessage" className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase ml-2">
                  Public Status Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea
                    id="statusMessage"
                    value={statusMessage}
                    onChange={(e) => setStatusMessage(e.target.value)}
                    placeholder="e.g. Package has arrived at the sorting facility and is being processed for the next leg of its journey."
                    rows={3}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Edit Delivery Date (Optional) */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="expectedDeliveryDate" className="block text-[11px] font-bold tracking-widest text-slate-400 uppercase ml-2">
                  Update Estimated Delivery Date <span className="normal-case font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    id="expectedDeliveryDate"
                    value={expectedDeliveryDate}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 ml-2">Leave blank if the delivery schedule has not changed.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting || !selectedParcelId}
              className="w-full px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <MapPinned className="w-5 h-5" />
              )}
              {isSubmitting ? 'Syncing Network...' : 'Log Transit Checkpoint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}