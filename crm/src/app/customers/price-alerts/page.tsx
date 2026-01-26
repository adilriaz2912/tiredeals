'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  Bell,
  BellRing,
  TrendingDown,
  DollarSign,
  Users,
  Mail,
  Send,
  Check,
  Clock,
  ShoppingCart,
  Eye,
  ChevronRight,
  Plus,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

// Active price alerts
const priceAlerts = [
  {
    id: 'PA-001',
    customer: 'John Smith',
    email: 'john.smith@email.com',
    product: 'Michelin Defender T+H 215/55R17',
    targetPrice: 165,
    currentPrice: 189,
    createdAt: '2025-01-15',
    status: 'active',
    notifyBelow: 175,
    views: 8,
  },
  {
    id: 'PA-002',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    product: 'Goodyear Assurance 225/65R17',
    targetPrice: 130,
    currentPrice: 145,
    createdAt: '2025-01-18',
    status: 'active',
    notifyBelow: 140,
    views: 5,
  },
  {
    id: 'PA-003',
    customer: 'Mike Wilson',
    email: 'mwilson@email.com',
    product: 'BFGoodrich All-Terrain T/A KO2 275/65R18',
    targetPrice: 220,
    currentPrice: 245,
    createdAt: '2025-01-10',
    status: 'triggered',
    notifyBelow: 235,
    views: 12,
    triggeredPrice: 229,
  },
  {
    id: 'PA-004',
    customer: 'Emily Brown',
    email: 'emily.brown@email.com',
    product: 'Continental CrossContact LX25 235/65R18',
    targetPrice: 175,
    currentPrice: 198,
    createdAt: '2025-01-20',
    status: 'active',
    notifyBelow: 185,
    views: 3,
  },
  {
    id: 'PA-005',
    customer: 'David Lee',
    email: 'david.lee@email.com',
    product: 'Michelin Pilot Sport 4S 235/40R19',
    targetPrice: 260,
    currentPrice: 289,
    createdAt: '2025-01-12',
    status: 'converted',
    notifyBelow: 275,
    views: 15,
    convertedAt: '2025-01-22',
    convertedPrice: 269,
  },
]

// Recent notifications sent
const recentNotifications = [
  { customer: 'Mike Wilson', product: 'BFGoodrich All-Terrain', oldPrice: 245, newPrice: 229, sentAt: '2025-01-25 10:30', opened: true },
  { customer: 'Lisa Chen', product: 'Pirelli P4 Four Seasons', oldPrice: 142, newPrice: 129, sentAt: '2025-01-24 14:15', opened: true },
  { customer: 'James Brown', product: 'Bridgestone Turanza', oldPrice: 175, newPrice: 159, sentAt: '2025-01-24 09:45', opened: false },
  { customer: 'David Lee', product: 'Michelin Pilot Sport 4S', oldPrice: 289, newPrice: 269, sentAt: '2025-01-22 11:20', opened: true },
]

// Stats
const stats = {
  activeAlerts: 156,
  triggeredToday: 12,
  convertedThisWeek: 28,
  conversionRate: 18.2,
  potentialRevenue: 42500,
}

export default function PriceAlerts() {
  const [filter, setFilter] = useState<'all' | 'active' | 'triggered' | 'converted'>('all')

  const filteredAlerts = priceAlerts.filter(a =>
    filter === 'all' || a.status === filter
  )

  return (
    <div className="min-h-screen">
      <Header
        title="Price Drop Alerts"
        subtitle="Manage customer price watchlists and notifications"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-500/20">
                <Bell className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.activeAlerts}</p>
                <p className="text-xs text-neutral-400">Active Alerts</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-400/20">
                <BellRing className="w-5 h-5 text-green-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.triggeredToday}</p>
                <p className="text-xs text-neutral-400">Triggered Today</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-500/20">
                <ShoppingCart className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.convertedThisWeek}</p>
                <p className="text-xs text-neutral-400">Converted (7d)</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20">
                <TrendingDown className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
                <p className="text-xs text-neutral-400">Conv. Rate</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20">
                <DollarSign className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{formatCurrency(stats.potentialRevenue)}</p>
                <p className="text-xs text-neutral-400">Potential Rev</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Alerts Table */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-green-400" />
                Price Alerts
              </h2>
              <div className="flex gap-2">
                {(['all', 'active', 'triggered', 'converted'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filter === f
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-neutral-800/30">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-neutral-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={alert.status} />
                        <span className="text-sm text-neutral-500">#{alert.id}</span>
                      </div>
                      <h3 className="font-medium text-white">{alert.product}</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {alert.customer} • {alert.email}
                      </p>

                      <div className="flex items-center gap-6 mt-3 text-sm">
                        <div>
                          <span className="text-neutral-500">Current: </span>
                          <span className="text-white font-medium">{formatCurrency(alert.currentPrice)}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Target: </span>
                          <span className="text-green-400 font-medium">{formatCurrency(alert.targetPrice)}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">Notify at: </span>
                          <span className="text-green-300 font-medium">{formatCurrency(alert.notifyBelow)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-neutral-500">
                          <Eye className="w-3 h-3" />
                          {alert.views} views
                        </div>
                      </div>

                      {alert.status === 'triggered' && alert.triggeredPrice && (
                        <div className="mt-3 p-2 bg-green-400/10 border border-green-400/20 rounded-lg inline-flex items-center gap-2">
                          <BellRing className="w-4 h-4 text-green-300" />
                          <span className="text-sm text-green-300">
                            Triggered at {formatCurrency(alert.triggeredPrice)}
                          </span>
                        </div>
                      )}

                      {alert.status === 'converted' && alert.convertedPrice && (
                        <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg inline-flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">
                            Purchased at {formatCurrency(alert.convertedPrice)} on {alert.convertedAt}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {alert.status === 'triggered' && (
                        <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors">
                          Send Reminder
                        </button>
                      )}
                      <Link
                        href={`/customers/${alert.id}`}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <div className="card">
              <div className="px-6 py-4 border-b border-neutral-800/50">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-green-300" />
                  Recent Notifications
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {recentNotifications.map((notif, i) => (
                  <div key={i} className="p-3 bg-neutral-800/40 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white text-sm">{notif.customer}</span>
                      {notif.opened ? (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Opened
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-500">Pending</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">{notif.product}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="text-neutral-500 line-through">{formatCurrency(notif.oldPrice)}</span>
                      <span className="text-green-400">{formatCurrency(notif.newPrice)}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-500">{notif.sentAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Settings */}
            <div className="card p-6">
              <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-neutral-400" />
                Alert Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Auto-notify on drop</span>
                  <span className="text-sm text-green-400">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Min price drop %</span>
                  <span className="text-sm text-white">5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Reminder frequency</span>
                  <span className="text-sm text-white">Weekly</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Alert expiry</span>
                  <span className="text-sm text-white">90 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    triggered: 'bg-green-400/20 text-green-300 border-green-400/30',
    converted: 'bg-green-500/20 text-green-400 border-green-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
