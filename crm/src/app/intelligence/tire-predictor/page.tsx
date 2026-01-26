'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  AlertTriangle,
  Calendar,
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Send,
  TrendingUp,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

// Mock customer tire data with predictions
const customerPredictions = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    vehicle: '2021 Toyota Camry',
    lastPurchase: '2023-03-15',
    tiresPurchased: 'Michelin Defender T+H 215/55R17',
    estimatedMileage: 42000,
    tireLifespan: 50000,
    percentUsed: 84,
    predictedReplacement: '2025-02-15',
    daysUntilReplacement: 20,
    status: 'critical',
    avgMilesPerMonth: 1200,
    lastContact: '2024-12-01',
    preferredContact: 'email',
    lifetimeValue: 2450,
  },
  {
    id: 'CUST-002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    vehicle: '2020 Honda CR-V',
    lastPurchase: '2023-06-20',
    tiresPurchased: 'Goodyear Assurance 225/65R17',
    estimatedMileage: 38000,
    tireLifespan: 55000,
    percentUsed: 69,
    predictedReplacement: '2025-04-10',
    daysUntilReplacement: 74,
    status: 'warning',
    avgMilesPerMonth: 1400,
    lastContact: null,
    preferredContact: 'sms',
    lifetimeValue: 1890,
  },
  {
    id: 'CUST-003',
    name: 'Mike Wilson',
    email: 'mwilson@email.com',
    phone: '(555) 345-6789',
    vehicle: '2022 Ford F-150',
    lastPurchase: '2023-09-10',
    tiresPurchased: 'BFGoodrich All-Terrain T/A KO2 275/65R18',
    estimatedMileage: 28000,
    tireLifespan: 50000,
    percentUsed: 56,
    predictedReplacement: '2025-07-15',
    daysUntilReplacement: 170,
    status: 'healthy',
    avgMilesPerMonth: 1600,
    lastContact: '2025-01-10',
    preferredContact: 'phone',
    lifetimeValue: 4200,
  },
  {
    id: 'CUST-004',
    name: 'Emily Brown',
    email: 'emily.brown@email.com',
    phone: '(555) 456-7890',
    vehicle: '2019 Subaru Outback',
    lastPurchase: '2022-11-05',
    tiresPurchased: 'Continental CrossContact LX25 225/65R17',
    estimatedMileage: 52000,
    tireLifespan: 50000,
    percentUsed: 104,
    predictedReplacement: '2024-12-01',
    daysUntilReplacement: -56,
    status: 'overdue',
    avgMilesPerMonth: 1100,
    lastContact: '2024-11-15',
    preferredContact: 'email',
    lifetimeValue: 3100,
  },
  {
    id: 'CUST-005',
    name: 'David Lee',
    email: 'david.lee@email.com',
    phone: '(555) 567-8901',
    vehicle: '2023 Tesla Model 3',
    lastPurchase: '2024-02-28',
    tiresPurchased: 'Michelin Pilot Sport 4S 235/40R19',
    estimatedMileage: 15000,
    tireLifespan: 30000,
    percentUsed: 50,
    predictedReplacement: '2025-08-20',
    daysUntilReplacement: 206,
    status: 'healthy',
    avgMilesPerMonth: 1300,
    lastContact: null,
    preferredContact: 'email',
    lifetimeValue: 1650,
  },
  {
    id: 'CUST-006',
    name: 'Lisa Martinez',
    email: 'lisa.m@email.com',
    phone: '(555) 678-9012',
    vehicle: '2021 Chevrolet Equinox',
    lastPurchase: '2023-04-12',
    tiresPurchased: 'Bridgestone Turanza QuietTrack 225/60R17',
    estimatedMileage: 44000,
    tireLifespan: 50000,
    percentUsed: 88,
    predictedReplacement: '2025-02-28',
    daysUntilReplacement: 33,
    status: 'critical',
    avgMilesPerMonth: 1150,
    lastContact: '2025-01-20',
    preferredContact: 'sms',
    lifetimeValue: 2780,
  },
]

const stats = {
  overdueCustomers: 12,
  criticalNext30Days: 28,
  warningNext90Days: 145,
  potentialRevenue: 48500,
}

const outreachTemplates = [
  { id: 'reminder-30', name: '30-Day Reminder', channel: 'email' },
  { id: 'reminder-14', name: '14-Day Urgent', channel: 'email' },
  { id: 'overdue', name: 'Overdue Notice', channel: 'email' },
  { id: 'sms-quick', name: 'Quick SMS Reminder', channel: 'sms' },
]

export default function TireReplacementPredictor() {
  const [filter, setFilter] = useState<'all' | 'overdue' | 'critical' | 'warning' | 'healthy'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const filteredCustomers = customerPredictions.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggleCustomer = (id: string) => {
    setSelectedCustomers(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Tire Replacement Predictor"
        subtitle="AI-powered predictions for when customers will need new tires"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Overdue"
            value={stats.overdueCustomers}
            subtitle="Need immediate outreach"
            icon={<AlertTriangle className="w-6 h-6" />}
            color="rose"
          />
          <StatCard
            title="Critical (30 days)"
            value={stats.criticalNext30Days}
            subtitle="Replace within 30 days"
            icon={<Clock className="w-6 h-6" />}
            color="orange"
          />
          <StatCard
            title="Warning (90 days)"
            value={stats.warningNext90Days}
            subtitle="Replace within 90 days"
            icon={<TrendingUp className="w-6 h-6" />}
            color="amber"
          />
          <StatCard
            title="Potential Revenue"
            value={formatCurrency(stats.potentialRevenue)}
            subtitle="From predicted replacements"
            icon={<Truck className="w-6 h-6" />}
            color="emerald"
          />
        </div>

        {/* Filters and Actions */}
        <div className="card">
          <div className="p-6 border-b border-slate-800/50">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div className="flex flex-wrap gap-2">
                {(['all', 'overdue', 'critical', 'warning', 'healthy'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === status
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    {status === 'overdue' && ` (${stats.overdueCustomers})`}
                    {status === 'critical' && ` (${stats.criticalNext30Days})`}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCustomers.length > 0 && (
            <div className="px-6 py-3 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between">
              <span className="text-sm text-emerald-400">
                {selectedCustomers.length} customer{selectedCustomers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">
                  <Mail className="w-4 h-4" />
                  Send Email Campaign
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Send SMS
                </button>
              </div>
            </div>
          )}

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={selectAll}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Vehicle & Tires</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Tire Health</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Predicted Replacement</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Last Contact</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-800/30 hover:bg-slate-800/30">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleCustomer(customer.id)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <Link href={`/customers/${customer.id}`} className="font-medium text-white hover:text-emerald-400 transition-colors">
                          {customer.name}
                        </Link>
                        <p className="text-sm text-slate-500">{customer.email}</p>
                        <p className="text-xs text-slate-600">CLV: {formatCurrency(customer.lifetimeValue)}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-sm text-white">{customer.vehicle}</p>
                          <p className="text-xs text-slate-500">{customer.tiresPurchased}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                customer.percentUsed >= 100 ? 'bg-rose-500' :
                                customer.percentUsed >= 80 ? 'bg-orange-500' :
                                customer.percentUsed >= 60 ? 'bg-amber-500' :
                                'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(customer.percentUsed, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-400 w-12">{customer.percentUsed}%</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          ~{customer.estimatedMileage.toLocaleString()} / {customer.tireLifespan.toLocaleString()} mi
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={customer.status} />
                        <div>
                          <p className="text-sm text-white">
                            {customer.daysUntilReplacement < 0
                              ? `${Math.abs(customer.daysUntilReplacement)} days overdue`
                              : `${customer.daysUntilReplacement} days`
                            }
                          </p>
                          <p className="text-xs text-slate-500">{customer.predictedReplacement}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {customer.lastContact ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-slate-400">{customer.lastContact}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-rose-400">Never contacted</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors" title="Send Email">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors" title="Send SMS">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors" title="Call">
                          <Phone className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/customers/${customer.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                          title="View Customer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outreach Templates */}
        <div className="card">
          <div className="px-6 py-4 border-b border-slate-800/50">
            <h2 className="text-lg font-semibold text-white">Quick Outreach Templates</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {outreachTemplates.map((template) => (
              <button
                key={template.id}
                className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  {template.channel === 'email' ? (
                    <Mail className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  )}
                  <div>
                    <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">{template.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{template.channel}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  color: 'rose' | 'orange' | 'amber' | 'emerald'
}) {
  const colors = {
    rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', glow: 'shadow-rose-500/20' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  }

  return (
    <div className={`card p-6 shadow-lg ${colors[color].glow}`}>
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${colors[color].bg}`}>
          <div className={colors[color].text}>{icon}</div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400 mt-1">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    overdue: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    critical: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    healthy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
