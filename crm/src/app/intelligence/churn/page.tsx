'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  AlertTriangle,
  TrendingDown,
  Users,
  DollarSign,
  Mail,
  Phone,
  Gift,
  MessageSquare,
  ChevronRight,
  RefreshCw,
  Clock,
  Activity,
  Target,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

// Churn risk customers
const atRiskCustomers = [
  {
    id: 'C-1001',
    name: 'David Martinez',
    email: 'david.m@email.com',
    riskScore: 92,
    riskLevel: 'critical',
    lastOrder: '2024-06-15',
    daysSinceOrder: 225,
    previousFrequency: 'Monthly',
    clv: 4200,
    signals: ['No activity 7+ months', 'Visited competitor site', 'Ignored last 3 emails'],
    recommendedAction: 'Personal phone call + 20% discount',
  },
  {
    id: 'C-1002',
    name: 'Sarah Thompson',
    email: 'sarah.t@email.com',
    riskScore: 85,
    riskLevel: 'critical',
    lastOrder: '2024-08-20',
    daysSinceOrder: 159,
    previousFrequency: 'Quarterly',
    clv: 2800,
    signals: ['Negative review', 'Support ticket unresolved', 'Reduced engagement'],
    recommendedAction: 'Resolve support issue + apology gift',
  },
  {
    id: 'C-1003',
    name: 'Metro Fleet Inc',
    email: 'fleet@metrofleet.com',
    riskScore: 78,
    riskLevel: 'high',
    lastOrder: '2024-09-10',
    daysSinceOrder: 138,
    previousFrequency: 'Monthly',
    clv: 28500,
    signals: ['Order volume down 60%', 'Contract renewal coming', 'Competitor contact'],
    recommendedAction: 'Account review meeting + custom pricing',
  },
  {
    id: 'C-1004',
    name: 'Jennifer Lee',
    email: 'jlee@email.com',
    riskScore: 72,
    riskLevel: 'high',
    lastOrder: '2024-10-05',
    daysSinceOrder: 113,
    previousFrequency: 'Semi-annual',
    clv: 1950,
    signals: ['Website visits dropped', 'Email unsubscribe attempt', 'Price comparison'],
    recommendedAction: 'Re-engagement email campaign',
  },
  {
    id: 'C-1005',
    name: 'Quick Delivery Services',
    email: 'orders@quickdelivery.com',
    riskScore: 68,
    riskLevel: 'high',
    lastOrder: '2024-09-25',
    daysSinceOrder: 123,
    previousFrequency: 'Bi-weekly',
    clv: 18200,
    signals: ['Reduced order quantity', 'Payment delays', 'Less responsive'],
    recommendedAction: 'Flexible payment terms + loyalty bonus',
  },
  {
    id: 'C-1006',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    riskScore: 58,
    riskLevel: 'medium',
    lastOrder: '2024-11-12',
    daysSinceOrder: 75,
    previousFrequency: 'Quarterly',
    clv: 2100,
    signals: ['Longer response times', 'Browsed but no purchase', 'Cart abandonment'],
    recommendedAction: 'Abandoned cart recovery + offer',
  },
]

// Churn statistics
const stats = {
  atRiskRevenue: 245000,
  criticalCustomers: 28,
  highRiskCustomers: 67,
  mediumRiskCustomers: 145,
  savedThisMonth: 12,
  savedRevenue: 48000,
  churnRate: 4.2,
  industryAvg: 6.8,
}

// Churn signals
const churnSignals = [
  { signal: 'No orders 90+ days', weight: 25, customers: 156 },
  { signal: 'Support issues', weight: 20, customers: 43 },
  { signal: 'Reduced engagement', weight: 18, customers: 89 },
  { signal: 'Competitor activity', weight: 15, customers: 34 },
  { signal: 'Payment problems', weight: 12, customers: 28 },
  { signal: 'Negative feedback', weight: 10, customers: 19 },
]

// Win-back campaigns
const campaigns = [
  { name: 'We Miss You', sent: 450, opened: 156, converted: 23, revenue: 18400, status: 'active' },
  { name: 'Exclusive Return Offer', sent: 280, opened: 98, converted: 15, revenue: 12800, status: 'active' },
  { name: 'Fleet Retention', sent: 45, opened: 32, converted: 8, revenue: 42000, status: 'active' },
  { name: 'VIP Recovery', sent: 28, opened: 22, converted: 12, revenue: 28500, status: 'completed' },
]

export default function ChurnRiskScoring() {
  const [riskFilter, setRiskFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all')
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const filteredCustomers = atRiskCustomers.filter(c =>
    riskFilter === 'all' || c.riskLevel === riskFilter
  )

  return (
    <div className="min-h-screen">
      <Header
        title="Churn Risk Scoring"
        subtitle="Identify at-risk customers before they leave"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 shadow-lg shadow-rose-500/10">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-rose-500/20">
                <DollarSign className="w-6 h-6 text-rose-400" />
              </div>
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.atRiskRevenue)}</p>
              <p className="text-sm text-slate-400 mt-1">At-Risk Revenue</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-orange-500/20">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.criticalCustomers + stats.highRiskCustomers}</p>
              <p className="text-sm text-slate-400 mt-1">High Risk Customers</p>
              <p className="text-xs text-slate-500">{stats.criticalCustomers} critical, {stats.highRiskCustomers} high</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.savedThisMonth}</p>
              <p className="text-sm text-slate-400 mt-1">Saved This Month</p>
              <p className="text-xs text-emerald-400">{formatCurrency(stats.savedRevenue)} recovered</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.churnRate}%</p>
              <p className="text-sm text-slate-400 mt-1">Churn Rate</p>
              <p className="text-xs text-emerald-400">vs {stats.industryAvg}% industry avg</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* At-Risk Customers */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">At-Risk Customers</h2>
              <div className="flex gap-2">
                {(['all', 'critical', 'high', 'medium'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setRiskFilter(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      riskFilter === level
                        ? level === 'critical' ? 'bg-rose-500/20 text-rose-400' :
                          level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          level === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {selectedCustomers.length > 0 && (
              <div className="px-6 py-3 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between">
                <span className="text-sm text-emerald-400">{selectedCustomers.length} selected</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
                    <Mail className="w-4 h-4" /> Email
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm">
                    <Gift className="w-4 h-4" /> Send Offer
                  </button>
                </div>
              </div>
            )}

            <div className="divide-y divide-slate-800/30">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="p-6 hover:bg-slate-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => setSelectedCustomers(prev =>
                          prev.includes(customer.id)
                            ? prev.filter(id => id !== customer.id)
                            : [...prev, customer.id]
                        )}
                        className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <Link href={`/customers/${customer.id}`} className="font-medium text-white hover:text-emerald-400">
                            {customer.name}
                          </Link>
                          <RiskBadge level={customer.riskLevel} score={customer.riskScore} />
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{customer.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {customer.daysSinceOrder} days since order
                          </span>
                          <span>CLV: {formatCurrency(customer.clv)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {customer.signals.map((signal, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-rose-500/10 text-rose-400 rounded">
                              {signal}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-slate-800/40 rounded-lg">
                          <p className="text-xs text-slate-500 mb-1">Recommended Action</p>
                          <p className="text-sm text-emerald-400">{customer.recommendedAction}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg" title="Call">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg" title="Send Offer">
                        <Gift className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Churn Signals */}
            <div className="card">
              <div className="px-6 py-4 border-b border-slate-800/50">
                <h2 className="text-lg font-semibold text-white">Churn Signals</h2>
              </div>
              <div className="p-6 space-y-4">
                {churnSignals.map((signal) => (
                  <div key={signal.signal}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">{signal.signal}</span>
                      <span className="text-xs text-slate-500">{signal.customers} customers</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
                        style={{ width: `${signal.weight * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Win-Back Campaigns */}
            <div className="card">
              <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Win-Back Campaigns</h2>
                <button className="text-sm text-emerald-400 hover:text-emerald-300">+ New</button>
              </div>
              <div className="p-4 space-y-3">
                {campaigns.map((campaign) => (
                  <div key={campaign.name} className="p-3 bg-slate-800/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{campaign.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        campaign.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-semibold text-white">{campaign.converted}</p>
                        <p className="text-xs text-slate-500">Converted</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">{Math.round(campaign.opened / campaign.sent * 100)}%</p>
                        <p className="text-xs text-slate-500">Open Rate</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-emerald-400">{formatCurrency(campaign.revenue)}</p>
                        <p className="text-xs text-slate-500">Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RiskBadge({ level, score }: { level: string; score: number }) {
  const colors: Record<string, string> = {
    critical: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>
      <Activity className="w-3 h-3" />
      {score}% risk
    </span>
  )
}
