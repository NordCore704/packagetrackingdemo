'use client'

import { useState } from 'react'
import { Plus, Copy, Check, Loader2, Package, MapPin, User, Calendar, Building2, Trash2 } from 'lucide-react'
import { createParcel } from '@/app/actions/parcel-actions'

export function AdminParcelCreation() {
  const [formData, setFormData] = useState({
    // Sender
    senderName: '', senderPhone: '', senderAddress: '', originCity: '', originCountry: '',
    // Receiver
    receiverName: '', receiverPhone: '', receiverAddress: '', destinationCity: '', destinationCountry: '',
    // Logistics
    dispatchOffice: '', pickupDate: '', dispatchDate: '', expectedDeliveryDate: '',
  })
  
  // Dynamic Package State
  const [packages, setPackages] = useState([{ name: '', weight: '', quantity: 1 }])

  const [generatedCode, setGeneratedCode] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  // Package Array Handlers
  const addPackageItem = () => {
    setPackages([...packages, { name: '', weight: '', quantity: 1 }])
  }

  const removePackageItem = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index))
  }

  const handlePackageChange = (index: number, field: string, value: string) => {
    const newPackages = [...packages]
    newPackages[index] = { ...newPackages[index], [field]: value }
    setPackages(newPackages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.senderName || !formData.originCity || !formData.originCountry ||
        !formData.receiverName || !formData.destinationCity || !formData.destinationCountry ||
        !formData.dispatchOffice || !formData.pickupDate || !formData.dispatchDate ||
        packages.some(p => !p.name || !p.weight)) {
      setError('Please fill in all required fields marked with an asterisk (*).')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await createParcel({
        ...formData,
        packages: packages.map(p => ({
          name: p.name,
          weight: parseFloat(p.weight),
          quantity: parseInt(p.quantity.toString()) || 1
        }))
      })

      if (response.success && response.trackingCode) {
        setGeneratedCode(response.trackingCode)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        
        // Reset form
        setFormData({
          senderName: '', senderPhone: '', senderAddress: '', originCity: '', originCountry: '',
          receiverName: '', receiverPhone: '', receiverAddress: '', destinationCity: '', destinationCountry: '',
          dispatchOffice: '', pickupDate: '', dispatchDate: '', expectedDeliveryDate: '',
        })
        setPackages([{ name: '', weight: '', quantity: 1 }])
        
      } else {
        setError(response.error || 'An error occurred.')
      }
    } catch (err) {
      setError('A network error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto font-sans pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-slate-900">New Shipment Details</h1>
        <p className="text-slate-500 mt-1">Register detailed parcel information and routing metrics.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
        
        {/* Success Banner */}
        {generatedCode && (
          <div className="mb-10 p-6 bg-emerald-50 border border-emerald-200 rounded-3xl animate-in fade-in slide-in-from-top-4">
             <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-emerald-900 tracking-tight text-lg">Shipment Initialized</h3>
              <button onClick={handleCopyCode} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-emerald-700 rounded-full border border-emerald-200">
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy
              </button>
            </div>
            <div className="bg-white/60 rounded-2xl p-4 border border-emerald-100/50 text-center">
              <p className="text-xs font-bold tracking-widest text-emerald-700/70 uppercase mb-1">Generated Tracking Code</p>
              <p className="font-mono font-medium text-4xl tracking-tight text-emerald-900">{generatedCode}</p>
            </div>
          </div>
        )}

        {error && <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* SENDER SECTION */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900 border-b border-slate-100 pb-3 mb-6">
              <User className="w-5 h-5 text-indigo-500" /> Sender Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Contact Name *" name="senderName" value={formData.senderName} onChange={handleInputChange} />
              <InputField label="Phone Number" name="senderPhone" value={formData.senderPhone} onChange={handleInputChange} />
              <div className="md:col-span-2">
                <InputField label="Contact Address" name="senderAddress" value={formData.senderAddress} onChange={handleInputChange} />
              </div>
              <InputField label="Origin City *" name="originCity" value={formData.originCity} onChange={handleInputChange} />
              <InputField label="Country *" name="originCountry" value={formData.originCountry} onChange={handleInputChange} />
            </div>
          </section>

          {/* RECEIVER SECTION */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900 border-b border-slate-100 pb-3 mb-6">
              <MapPin className="w-5 h-5 text-indigo-500" /> Receiver Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Contact Name *" name="receiverName" value={formData.receiverName} onChange={handleInputChange} />
              <InputField label="Phone Number" name="receiverPhone" value={formData.receiverPhone} onChange={handleInputChange} />
              <div className="md:col-span-2">
                <InputField label="Contact Address" name="receiverAddress" value={formData.receiverAddress} onChange={handleInputChange} />
              </div>
              <InputField label="Destination City *" name="destinationCity" value={formData.destinationCity} onChange={handleInputChange} />
              <InputField label="Country *" name="destinationCountry" value={formData.destinationCountry} onChange={handleInputChange} />
            </div>
          </section>

          {/* SHIPMENT LOGISTICS */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900 border-b border-slate-100 pb-3 mb-6">
              <Building2 className="w-5 h-5 text-indigo-500" /> Shipment Logistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputField label="Dispatch Office *" name="dispatchOffice" value={formData.dispatchOffice} onChange={handleInputChange} placeholder="e.g. Apex Central Hub" />
              </div>
              <InputField label="Pickup Date *" name="pickupDate" type="date" value={formData.pickupDate} onChange={handleInputChange} />
              <InputField label="Dispatch Date *" name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleInputChange} />
              <InputField label="Expected Delivery Date" name="expectedDeliveryDate" type="date" value={formData.expectedDeliveryDate} onChange={handleInputChange} />
            </div>
          </section>

          {/* PACKAGES ARRAY */}
          <section>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
              <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <Package className="w-5 h-5 text-indigo-500" /> Packages Included
              </h2>
              <button type="button" onClick={addPackageItem} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            
            <div className="space-y-4">
              {packages.map((pkg, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl relative group">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Item Name *</label>
                    <input type="text" value={pkg.name} onChange={(e) => handlePackageChange(index, 'name', e.target.value)} className="w-full px-3 py-2 text-black rounded-xl border border-slate-200" placeholder="e.g. Dell XPS 15" />
                  </div>
                  <div className="w-full sm:w-24">
                    <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Weight(kg)*</label>
                    <input type="number" step="0.1" value={pkg.weight} onChange={(e) => handlePackageChange(index, 'weight', e.target.value)} className="w-full px-3 text-black py-2 rounded-xl border border-slate-200" />
                  </div>
                  <div className="w-full sm:w-20">
                    <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Qty *</label>
                    <input type="number" min="1" value={pkg.quantity} onChange={(e) => handlePackageChange(index, 'quantity', e.target.value)} className="w-full  text-black px-3 py-2 rounded-xl border border-slate-200" />
                  </div>
                  {packages.length > 1 && (
                    <button type="button" onClick={() => removePackageItem(index)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="pt-6 border-t border-slate-100">
            <button type="submit" disabled={isLoading} className="w-full px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-slate-800 disabled:opacity-70 transition-all flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              {isLoading ? 'Processing...' : 'Finalize Shipment & Generate Tracker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Reusable Input Field Component for cleaner code
function InputField({ label, name, type = "text", value, onChange, placeholder = "" }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
      />
    </div>
  )
}