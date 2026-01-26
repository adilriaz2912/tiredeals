'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            {showSearch && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-2">
                <input
                  type="text"
                  placeholder="Search customers, orders, tickets..."
                  className="input"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <NotificationItem
                    title="New order received"
                    message="Order #TD-ABC123 from John Smith"
                    time="2 min ago"
                    type="order"
                  />
                  <NotificationItem
                    title="Low stock alert"
                    message="Michelin Defender T+H is running low (5 left)"
                    time="15 min ago"
                    type="inventory"
                  />
                  <NotificationItem
                    title="Support ticket assigned"
                    message="Ticket #TKT-789 needs attention"
                    time="1 hour ago"
                    type="ticket"
                  />
                  <NotificationItem
                    title="Warranty expiring soon"
                    message="3 warranties expiring this week"
                    time="2 hours ago"
                    type="warranty"
                  />
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="relative group">
            <button className="btn-primary btn-md">
              Quick Actions
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <QuickActionItem label="New Customer" href="/customers/new" />
              <QuickActionItem label="New Order" href="/orders/new" />
              <QuickActionItem label="New Ticket" href="/support/new" />
              <QuickActionItem label="Add Installer" href="/installers/new" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function NotificationItem({
  title,
  message,
  time,
  type,
}: {
  title: string
  message: string
  time: string
  type: 'order' | 'inventory' | 'ticket' | 'warranty'
}) {
  const colors = {
    order: 'bg-primary-100 text-primary-600',
    inventory: 'bg-warning-50 text-warning-600',
    ticket: 'bg-info-50 text-info-600',
    warranty: 'bg-danger-50 text-danger-600',
  }

  return (
    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
      <div className="flex gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 ${colors[type].split(' ')[0]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 truncate">{message}</p>
          <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
      </div>
    </div>
  )
}

function QuickActionItem({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {label}
    </a>
  )
}
