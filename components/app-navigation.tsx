'use client'

import { useState } from 'react'
import { Package, Menu, X, LayoutDashboard, Plus, TrendingUp } from 'lucide-react'
import { PublicTrackingPage } from './public-tracking-page'
import { AdminDashboard } from './admin-dashboard'
import { AdminParcelCreation } from './admin-parcel-creation'
import { AdminStatusUpdate } from './admin-status-update'

type NavPage = 'tracking' | 'dashboard' | 'create' | 'update'

export function AppNavigation() {
  const [currentPage, setCurrentPage] = useState<NavPage>('tracking')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'tracking', label: 'Track Package', icon: Package, section: 'public' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'admin' },
    { id: 'create', label: 'Create Shipment', icon: Plus, section: 'admin' },
    { id: 'update', label: 'Update Status', icon: TrendingUp, section: 'admin' },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'tracking':
        return <PublicTrackingPage />
      case 'dashboard':
        return <AdminDashboard />
      case 'create':
        return <AdminParcelCreation />
      case 'update':
        return <AdminStatusUpdate />
      default:
        return <PublicTrackingPage />
    }
  }

  const currentPageLabel = navItems.find((item) => item.id === currentPage)?.label || 'Home'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div> */}
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-foreground">ApexBit</h1>
              <p className="text-xs text-muted-foreground">Parcel Tracking & Logistics</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-xl font-bold text-foreground">ApexBit</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as NavPage)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${
                    isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-muted/30">
            <nav className="flex flex-col p-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id as NavPage)
                      setMobileMenuOpen(false)
                    }}
                    className={`px-4 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors text-left ${
                      isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Breadcrumb/Page Title */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-lg font-semibold text-foreground">{currentPageLabel}</h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{renderPage()}</main>

   
    </div>
  )
}
