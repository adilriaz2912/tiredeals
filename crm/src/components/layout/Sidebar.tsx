'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Truck,
  Wrench,
  Package,
  Ticket,
  Shield,
  Gift,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  RotateCcw,
  Tag,
  Calendar,
  Megaphone,
  MousePointer,
  Target,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  children?: { label: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Orders',
    href: '/orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    children: [
      { label: 'All Orders', href: '/orders' },
      { label: 'Pending', href: '/orders?status=PENDING' },
      { label: 'Processing', href: '/orders?status=PROCESSING' },
      { label: 'Shipped', href: '/orders?status=SHIPPED' },
    ],
  },
  {
    label: 'Returns & Refunds',
    href: '/returns',
    icon: <RotateCcw className="w-5 h-5" />,
  },
  {
    label: 'Shipping',
    href: '/shipping',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    label: 'Scheduling',
    href: '/scheduling',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: 'Installers',
    href: '/installers',
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: 'Pricing & Promos',
    href: '/pricing',
    icon: <Tag className="w-5 h-5" />,
  },
  {
    label: 'Support Tickets',
    href: '/support',
    icon: <Ticket className="w-5 h-5" />,
  },
  {
    label: 'Warranties',
    href: '/warranties',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    label: 'Loyalty Program',
    href: '/loyalty',
    icon: <Gift className="w-5 h-5" />,
  },
  {
    label: 'Abandoned Carts',
    href: '/abandoned-carts',
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    label: 'Automations',
    href: '/automations',
    icon: <MousePointer className="w-5 h-5" />,
    children: [
      { label: 'Email Automation', href: '/email-automation' },
      { label: 'Browse Abandonment', href: '/automations/browse-abandonment' },
      { label: 'SMS & Notifications', href: '/notifications' },
    ],
  },
  {
    label: 'Marketing',
    href: '/marketing',
    icon: <Megaphone className="w-5 h-5" />,
    children: [
      { label: 'Google Ads (PPC)', href: '/marketing/ppc' },
      { label: 'Google My Business', href: '/marketing/gmb' },
      { label: 'Social Media Hub', href: '/marketing/social' },
    ],
  },
  {
    label: 'Competitive Intel',
    href: '/competitive',
    icon: <Target className="w-5 h-5" />,
    children: [
      { label: 'Price Comparison', href: '/competitive/pricing' },
    ],
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { label: 'Overview', href: '/reports' },
      { label: 'P&L Statement', href: '/reports/pnl' },
      { label: 'Margin Reports', href: '/reports/margins' },
      { label: 'Sales Forecast', href: '/reports/forecast' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/50">
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white">TireDeals</h1>
          <p className="text-xs text-slate-500">CRM Dashboard</p>
        </div>
        {/* Mobile close button */}
        <button
          className="lg:hidden ml-auto p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'transition-colors',
                        isActive(item.href) ? 'text-emerald-400' : ''
                      )}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        expandedItems.includes(item.label) && 'rotate-180'
                      )}
                    />
                  </button>
                  <div className={cn(
                    'overflow-hidden transition-all duration-200',
                    expandedItems.includes(item.label) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}>
                    <ul className="mt-1 ml-4 pl-4 border-l border-slate-800 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-lg transition-all duration-200',
                              pathname === child.href
                                ? 'text-emerald-400 bg-emerald-500/10'
                                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  )}
                >
                  <span className={cn(
                    'transition-colors',
                    isActive(item.href) ? 'text-emerald-400' : ''
                  )}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-slate-800/50">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
            pathname === '/settings'
              ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400'
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-violet-500/20">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@tiredeals.com</p>
          </div>
          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl shadow-xl"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 z-50 h-screen w-72 flex flex-col transform transition-transform duration-300 ease-out',
          'bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50">
        {sidebarContent}
      </aside>
    </>
  )
}
