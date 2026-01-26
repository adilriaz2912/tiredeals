'use client'

import Link from 'next/link'
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
  Brain,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Phone,
  Bot,
  MapPin,
  PieChart,
  Banknote,
  Bell,
  Activity,
  Zap,
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
    children: [
      { label: 'All Customers', href: '/customers' },
      { label: 'Price Drop Alerts', href: '/customers/price-alerts' },
    ],
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
    label: 'Intelligence',
    href: '/intelligence',
    icon: <Brain className="w-5 h-5" />,
    children: [
      { label: 'Tire Replacement Predictor', href: '/intelligence/tire-predictor' },
      { label: 'Customer Lifetime Value', href: '/intelligence/clv' },
      { label: 'Churn Risk Scoring', href: '/intelligence/churn' },
      { label: 'Dynamic Pricing', href: '/intelligence/dynamic-pricing' },
    ],
  },
  {
    label: 'Operations',
    href: '/operations',
    icon: <Zap className="w-5 h-5" />,
    children: [
      { label: 'Fulfillment & Delivery', href: '/operations/fulfillment' },
      { label: 'Smart Scheduling', href: '/operations/smart-scheduling' },
      { label: 'Supplier Scorecard', href: '/operations/supplier-scorecard' },
      { label: 'Fraud Detection', href: '/operations/fraud-detection' },
    ],
  },
  {
    label: 'Support',
    href: '/support',
    icon: <Ticket className="w-5 h-5" />,
    children: [
      { label: 'All Tickets', href: '/support' },
      { label: 'AI Routing', href: '/support/ai-routing' },
      { label: 'Call Center', href: '/support/call-center' },
    ],
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { label: 'E-commerce KPIs', href: '/analytics/ecommerce' },
      { label: 'Conversion Funnel', href: '/analytics/funnel' },
      { label: 'Cohort Retention', href: '/analytics/cohort-retention' },
      { label: 'Attribution', href: '/analytics/attribution' },
      { label: 'Geographic Demand', href: '/analytics/geographic' },
      { label: 'Customer Journey', href: '/analytics/customer-journey' },
      { label: 'Market Share', href: '/analytics/market-share' },
    ],
  },
  {
    label: 'Finance',
    href: '/finance',
    icon: <Banknote className="w-5 h-5" />,
    children: [
      { label: 'Cash Flow Forecast', href: '/finance/cash-flow' },
      { label: 'P&L Statement', href: '/reports/pnl' },
      { label: 'Margin Reports', href: '/reports/margins' },
    ],
  },
  {
    label: 'Shipping',
    href: '/shipping',
    icon: <Truck className="w-5 h-5" />,
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
    children: [
      { label: 'All Inventory', href: '/inventory' },
      { label: 'Inventory Analytics', href: '/inventory/analytics' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    icon: <Activity className="w-5 h-5" />,
    children: [
      { label: 'Product Performance', href: '/products/performance' },
    ],
  },
  {
    label: 'Pricing & Promos',
    href: '/pricing',
    icon: <Tag className="w-5 h-5" />,
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
      <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-800/50">
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white">TireDeals</h1>
          <p className="text-xs text-neutral-500">CRM Dashboard</p>
        </div>
        {/* Mobile close button */}
        <button
          className="lg:hidden ml-auto p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
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
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'transition-colors',
                        isActive(item.href) ? 'text-green-400' : ''
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
                    <ul className="mt-1 ml-4 pl-4 border-l border-neutral-800 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-lg transition-all duration-200',
                              pathname === child.href
                                ? 'text-green-400 bg-green-500/10'
                                : 'text-neutral-500 hover:text-white hover:bg-neutral-800/50'
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
                      ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/5'
                      : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                  )}
                >
                  <span className={cn(
                    'transition-colors',
                    isActive(item.href) ? 'text-green-400' : ''
                  )}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-green-500 text-black text-xs font-semibold px-2 py-0.5 rounded-full">
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
      <div className="p-3 border-t border-neutral-800/50">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
            pathname === '/settings'
              ? 'bg-green-500/20 text-green-400'
              : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-neutral-800/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-800/30">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-sm font-semibold text-black shadow-lg shadow-green-500/20">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-neutral-500 truncate">admin@tiredeals.com</p>
          </div>
          <button className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-700 transition-colors">
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-neutral-900 border border-neutral-800 text-white rounded-xl shadow-xl"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 z-50 h-screen w-72 flex flex-col transform transition-transform duration-300 ease-out',
          'bg-black/95 backdrop-blur-xl border-r border-neutral-800/50',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-black/90 backdrop-blur-xl border-r border-neutral-800/50">
        {sidebarContent}
      </aside>
    </>
  )
}
