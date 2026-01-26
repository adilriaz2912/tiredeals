'use client'

import { Bell, ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { GlobalSearch } from '@/components/ui/GlobalSearch'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search */}
          <GlobalSearch />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="notification-dot" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">4 new</span>
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
                <div className="px-4 py-3 border-t border-slate-800">
                  <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="relative group">
            <button className="btn-primary btn-md">
              <Sparkles className="w-4 h-4" />
              Quick Actions
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <QuickActionItem label="New Customer" href="/customers/new" />
              <QuickActionItem label="New Order" href="/orders/new" />
              <QuickActionItem label="New Ticket" href="/support/new" />
              <QuickActionItem label="Add Installer" href="/installers/new" />
            </div>
          </div>

          {/* Custom Actions */}
          {actions}
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
    order: 'from-emerald-500 to-cyan-500',
    inventory: 'from-amber-500 to-orange-500',
    ticket: 'from-blue-500 to-indigo-500',
    warranty: 'from-red-500 to-rose-500',
  }

  return (
    <div className="px-4 py-3 hover:bg-slate-800/50 cursor-pointer border-b border-slate-800/50 last:border-0 transition-colors">
      <div className="flex gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${colors[type]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-sm text-slate-400 truncate">{message}</p>
          <p className="text-xs text-slate-500 mt-1">{time}</p>
        </div>
      </div>
    </div>
  )
}

function QuickActionItem({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
    >
      {label}
    </a>
  )
}
