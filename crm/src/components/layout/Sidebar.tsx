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
  TicketCheck,
  Shield,
  Gift,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
} from 'lucide-react'
import { useState } from 'react'

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
  },
  {
    label: 'Support Tickets',
    href: '/support',
    icon: <TicketCheck className="w-5 h-5" />,
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
    label: 'SMS & Notifications',
    href: '/notifications',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="w-5 h-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center font-bold text-lg">
          TD
        </div>
        <div>
          <h1 className="font-bold text-lg">TireDeals</h1>
          <p className="text-xs text-gray-400">CRM Dashboard</p>
        </div>
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
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors',
                      isActive(item.href)
                        ? 'bg-primary-500/10 text-primary-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform',
                        expandedItems.includes(item.label) && 'rotate-180'
                      )}
                    />
                  </button>
                  {expandedItems.includes(item.label) && (
                    <ul className="mt-1 ml-8 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-lg transition-colors',
                              pathname === child.href
                                ? 'text-primary-400 bg-primary-500/10'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings & Logout */}
      <div className="p-3 border-t border-gray-800">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
            pathname === '/settings'
              ? 'bg-primary-500/10 text-primary-400'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">admin@tiredeals.com</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
