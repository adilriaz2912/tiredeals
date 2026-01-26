'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Crown,
  Star,
  Award,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Filter,
  Download,
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

// Customer segments with CLV data
const segments = [
  {
    id: 'vip',
    name: 'VIP Customers',
    icon: Crown,
    color: 'amber',
    count: 156,
    avgClv: 8450,
    totalValue: 1318200,
    avgOrders: 12.4,
    avgOrderValue: 682,
    retentionRate: 94,
    characteristics: ['5+ purchases', 'High-margin products', 'Referrals'],
  },
  {
    id: 'loyal',
    name: 'Loyal Customers',
    icon: Star,
    color: 'emerald',
    count: 892,
    avgClv: 3250,
    totalValue: 2899000,
    avgOrders: 5.8,
    avgOrderValue: 560,
    retentionRate: 78,
    characteristics: ['3-4 purchases', 'Regular intervals', 'Good reviews'],
  },
  {
    id: 'growth',
    name: 'Growth Potential',
    icon: TrendingUp,
    color: 'cyan',
    count: 1456,
    avgClv: 1850,
    totalValue: 2693600,
    avgOrders: 2.3,
    avgOrderValue: 804,
    retentionRate: 62,
    characteristics: ['2 purchases', 'High AOV', 'Recent activity'],
  },
  {
    id: 'atrisk',
    name: 'At Risk',
    icon: TrendingDown,
    color: 'rose',
    count: 423,
    avgClv: 950,
    totalValue: 401850,
    avgOrders: 1.8,
    avgOrderValue: 528,
    retentionRate: 34,
    characteristics: ['Declining activity', 'Long gaps', 'No recent purchase'],
  },
]

// Top CLV customers
const topCustomers = [
  { id: 'C-001', name: 'Anderson Fleet Services', type: 'B2B', clv: 45200, orders: 48, lastOrder: '2025-01-20', trend: 'up', segment: 'VIP' },
  { id: 'C-002', name: 'Metro Auto Group', type: 'B2B', clv: 38900, orders: 42, lastOrder: '2025-01-18', trend: 'up', segment: 'VIP' },
  { id: 'C-003', name: 'Robert Chen', type: 'B2C', clv: 12450, orders: 18, lastOrder: '2025-01-15', trend: 'stable', segment: 'VIP' },
  { id: 'C-004', name: 'Sunrise Delivery Co', type: 'B2B', clv: 28700, orders: 35, lastOrder: '2025-01-22', trend: 'up', segment: 'VIP' },
  { id: 'C-005', name: 'Jennifer Walsh', type: 'B2C', clv: 9800, orders: 14, lastOrder: '2024-12-28', trend: 'down', segment: 'VIP' },
  { id: 'C-006', name: 'City Cab Company', type: 'B2B', clv: 52100, orders: 62, lastOrder: '2025-01-24', trend: 'up', segment: 'VIP' },
  { id: 'C-007', name: 'Michael Torres', type: 'B2C', clv: 8200, orders: 11, lastOrder: '2025-01-10', trend: 'stable', segment: 'VIP' },
  { id: 'C-008', name: 'Green Earth Logistics', type: 'B2B', clv: 31400, orders: 38, lastOrder: '2025-01-19', trend: 'up', segment: 'VIP' },
]

// CLV distribution data
const clvDistribution = [
  { range: '$0-500', count: 2340, percentage: 45 },
  { range: '$500-1K', count: 1245, percentage: 24 },
  { range: '$1K-2.5K', count: 892, percentage: 17 },
  { range: '$2.5K-5K', count: 456, percentage: 9 },
  { range: '$5K-10K', count: 189, percentage: 4 },
  { range: '$10K+', count: 78, percentage: 1 },
]

// CLV factors
const clvFactors = [
  { factor: 'Purchase Frequency', impact: 35, description: 'Orders per year' },
  { factor: 'Average Order Value', impact: 28, description: 'Spend per transaction' },
  { factor: 'Customer Tenure', impact: 18, description: 'Years as customer' },
  { factor: 'Product Mix', impact: 12, description: 'High-margin vs low-margin' },
  { factor: 'Referrals Made', impact: 7, description: 'New customers referred' },
]

export default function CustomerLifetimeValue() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [customerType, setCustomerType] = useState<'all' | 'B2B' | 'B2C'>('all')

  const filteredCustomers = topCustomers.filter(c =>
    customerType === 'all' || c.type === customerType
  )

  const totalClv = segments.reduce((sum, s) => sum + s.totalValue, 0)
  const totalCustomers = segments.reduce((sum, s) => sum + s.count, 0)
  const avgClv = totalClv / totalCustomers

  return (
    <div className="min-h-screen">
      <Header
        title="Customer Lifetime Value"
        subtitle="Understand and maximize the long-term value of your customers"
      />

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
                12.5%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(totalClv)}</p>
              <p className="text-sm text-slate-400 mt-1">Total Customer Value</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
                8.3%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(avgClv)}</p>
              <p className="text-sm text-slate-400 mt-1">Average CLV</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{segments[0].count}</p>
              <p className="text-sm text-slate-400 mt-1">VIP Customers</p>
              <p className="text-xs text-slate-500">Top 5% by value</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-rose-500/20">
                <TrendingDown className="w-6 h-6 text-rose-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{segments[3].count}</p>
              <p className="text-sm text-slate-400 mt-1">At-Risk Customers</p>
              <p className="text-xs text-slate-500">Need re-engagement</p>
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="card">
          <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Customer Segments</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((segment) => {
              const Icon = segment.icon
              const colors: Record<string, { bg: string; text: string; border: string }> = {
                amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
                emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
                cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
                rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
              }
              const color = colors[segment.color]

              return (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(selectedSegment === segment.id ? null : segment.id)}
                  className={`p-5 rounded-xl border transition-all text-left ${
                    selectedSegment === segment.id
                      ? `${color.bg} ${color.border} border-2`
                      : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${color.bg}`}>
                      <Icon className={`w-5 h-5 ${color.text}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{segment.name}</h3>
                      <p className="text-xs text-slate-500">{segment.count} customers</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Avg CLV</span>
                      <span className="text-sm font-medium text-white">{formatCurrency(segment.avgClv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Retention</span>
                      <span className="text-sm font-medium text-white">{segment.retentionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Avg Orders</span>
                      <span className="text-sm font-medium text-white">{segment.avgOrders}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {segment.characteristics.map((char, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                        {char}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Customers */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Top Customers by CLV</h2>
              <div className="flex gap-2">
                {(['all', 'B2B', 'B2C'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCustomerType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      customerType === type
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {type === 'all' ? 'All' : type}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800/50">
                    <th className="text-left p-4 text-sm font-medium text-slate-400">Customer</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">CLV</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">Orders</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">Trend</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer.id} className="border-b border-slate-800/30 hover:bg-slate-800/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < 3 ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-white">{customer.name}</p>
                            <p className="text-xs text-slate-500">{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          customer.type === 'B2B'
                            ? 'bg-violet-500/20 text-violet-400'
                            : 'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {customer.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-emerald-400">{formatCurrency(customer.clv)}</span>
                      </td>
                      <td className="p-4 text-slate-300">{customer.orders}</td>
                      <td className="p-4">
                        {customer.trend === 'up' && (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <ArrowUpRight className="w-4 h-4" /> Growing
                          </span>
                        )}
                        {customer.trend === 'down' && (
                          <span className="flex items-center gap-1 text-rose-400">
                            <ArrowDownRight className="w-4 h-4" /> Declining
                          </span>
                        )}
                        {customer.trend === 'stable' && (
                          <span className="text-slate-400">Stable</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Link href={`/customers/${customer.id}`} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors inline-block">
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CLV Factors */}
          <div className="card">
            <div className="px-6 py-4 border-b border-slate-800/50">
              <h2 className="text-lg font-semibold text-white">CLV Impact Factors</h2>
            </div>
            <div className="p-6 space-y-4">
              {clvFactors.map((factor) => (
                <div key={factor.factor}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{factor.factor}</span>
                    <span className="text-sm text-emerald-400">{factor.impact}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                      style={{ width: `${factor.impact}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{factor.description}</p>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-slate-800/50">
              <h3 className="text-sm font-medium text-white mb-3">CLV Distribution</h3>
              <div className="space-y-2">
                {clvDistribution.map((dist) => (
                  <div key={dist.range} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-16">{dist.range}</span>
                    <div className="flex-1 h-4 bg-slate-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-16 text-right">{dist.count}</span>
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
