'use client'

import { useMemo, useState, useEffect } from 'react'
import { Search, Package, Truck, CheckCircle, Loader2, LayoutDashboard, Plus, MapPinned, Settings } from 'lucide-react'
import { getAllParcels } from '@/app/actions/parcel-actions'
import { StatusBadge } from './status-badge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Internal Navigation Component
function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/arc', icon: LayoutDashboard },
    { name: 'Create Shipment', href: '/arc/create', icon: Plus },
    { name: 'Update Status', href: '/arc/update', icon: MapPinned },
    { name: 'Edit Tracking Code', href: '/arc/edit-code', icon: Settings },
  ]

  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`} />
            {item.name}
          </Link>
        )
      })}
      
      {/* Utility to hide the scrollbar specifically for this nav on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </nav>
  )
}


export function AdminDashboard() {
  const [parcels, setParcels] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Fetch live data on load
  useEffect(() => {
    async function loadParcels() {
      setIsLoading(true)
      const response = await getAllParcels()
      if (response.success && response.parcels) {
        setParcels(response.parcels)
      }
      setIsLoading(false)
    }
    loadParcels()
  }, [])

  // Calculate live metrics
  const metrics = useMemo(() => {
    const total = parcels.length
    const inTransit = parcels.filter((p) => p.status === 'IN_TRANSIT').length
    const delivered = parcels.filter((p) => p.status === 'DELIVERED').length

    return { total, inTransit, delivered }
  }, [parcels])

  // Filter live parcels
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel) => {
      const matchesSearch =
        parcel.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.receiverName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [parcels, searchTerm, statusFilter])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Loading network data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 font-sans px-4 md:px-8 pt-24 pb-32 max-w-7xl mx-auto">
      
      {/* Header & Navigation Panel */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-slate-900">Network Overview</h1>
          <p className="text-slate-500 mt-1">Monitor all active shipments across your logistics infrastructure.</p>
        </div>
        
        {/* Navigation inserted here */}
        <AdminNav />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Parcels */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">Total Parcels</p>
            <p className="text-4xl font-medium tracking-tight text-slate-900">{metrics.total}</p>
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
              <Truck className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">In Transit</p>
            <p className="text-4xl font-medium tracking-tight text-slate-900">{metrics.inTransit}</p>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">Delivered</p>
            <p className="text-4xl font-medium tracking-tight text-slate-900">{metrics.delivered}</p>
          </div>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 md:px-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by tracking code, sender, or receiver..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm cursor-pointer min-w-[160px]"
            >
              <option value="all">All Statuses</option>
              {/* Values must match the Prisma ENUM exactly */}
              <option value="LABEL_CREATED">Label Created</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
              <option value="DELIVERED">Delivered</option>
              <option value="EXCEPTION">Exception</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 md:px-8 py-4 font-bold tracking-wider text-slate-500 uppercase text-xs">Tracking Code</th>
                <th className="px-6 py-4 font-bold tracking-wider text-slate-500 uppercase text-xs">Sender</th>
                <th className="px-6 py-4 font-bold tracking-wider text-slate-500 uppercase text-xs">Receiver</th>
                <th className="px-6 py-4 font-bold tracking-wider text-slate-500 uppercase text-xs">Status</th>
                <th className="px-6 md:px-8 py-4 font-bold tracking-wider text-slate-500 uppercase text-xs text-right">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParcels.length > 0 ? (
                filteredParcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 md:px-8 py-5 font-mono font-medium text-slate-900">{parcel.trackingCode}</td>
                    <td className="px-6 py-5 text-slate-600">{parcel.senderName}</td>
                    <td className="px-6 py-5 text-slate-600">{parcel.receiverName}</td>
                    <td className="px-6 py-5">
                      <StatusBadge status={parcel.status} />
                    </td>
                    <td className="px-6 md:px-8 py-5 text-slate-500 text-right">
                      {new Date(parcel.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No parcels found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}