'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, User, Loader2, Package, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { registerAdmin } from '@/app/actions/auth-actions'

export default function AdminRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const response = await registerAdmin(formData)
    
    if (response.success) {
      setSuccess(true)
      setTimeout(() => {
        router.push('/arc/login')
      }, 2000)
    } else {
      setError(response.error || 'Registration failed')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 w-full h-[40vh] bg-black -z-10"></div>
      
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8 text-white">
          <div className="flex items-center gap-2 group">
            <Package className="w-8 h-8 text-indigo-400" />
            <span className="font-semibold text-2xl tracking-tight text-black">Apexbit Cargo</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium tracking-tight text-slate-900">Admin Registration</h1>
            <p className="text-sm text-slate-500 mt-2">Create an authorized staff account.</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Account created successfully. Redirecting to login...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium text-center">
              {error}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="admin@apexbit.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold tracking-widest text-slate-500 uppercase ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-500 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-slate-800 disabled:opacity-70 transition-all shadow-md flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account? <Link href="/arc/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}