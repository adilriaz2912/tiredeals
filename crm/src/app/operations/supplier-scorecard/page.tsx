'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Truck,
  Award,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  BarChart3,
  Calendar,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Suppliers with scores
const suppliers = [
  {
    id: 'SUP-001',
    name: 'Michelin Distribution',
    logo: 'M',
    overallScore: 94,
    trend: 'up',
    metrics: {
      fillRate: 98.2,
      onTimeDelivery: 96.5,
      qualityScore: 99.1,
      priceCompetitiveness: 88,
      communication: 95,
    },
    volume: 245000,
    orders: 342,
    avgLeadTime: 3.2,
    defectRate: 0.3,
    tier: 'platinum',
    status: 'active',
    lastReview: '2025-01-15',
    issues: 2,
  },
  {
    id: 'SUP-002',
    name: 'Goodyear Wholesale',
    logo: 'G',
    overallScore: 89,
    trend: 'stable',
    metrics: {
      fillRate: 94.5,
      onTimeDelivery: 92.3,
      qualityScore: 97.8,
      priceCompetitiveness: 91,
      communication: 88,
    },
    volume: 189000,
    orders: 278,
    avgLeadTime: 4.1,
    defectRate: 0.5,
    tier: 'gold',
    status: 'active',
    lastReview: '2025-01-10',
    issues: 5,
  },
  {
    id: 'SUP-003',
    name: 'Bridgestone Americas',
    logo: 'B',
    overallScore: 86,
    trend: 'down',
    metrics: {
      fillRate: 91.2,
      onTimeDelivery: 88.5,
      qualityScore: 96.4,
      priceCompetitiveness: 85,
      communication: 82,
    },
    volume: 156000,
    orders: 215,
    avgLeadTime: 4.8,
    defectRate: 0.7,
    tier: 'gold',
    status: 'under_review',
    lastReview: '2024-12-20',
    issues: 8,
  },
  {
    id: 'SUP-004',
    name: 'Continental Tire',
    logo: 'C',
    overallScore: 91,
    trend: 'up',
    metrics: {
      fillRate: 95.8,
      onTimeDelivery: 94.2,
      qualityScore: 98.5,
      priceCompetitiveness: 86,
      communication: 91,
    },
    volume: 178000,
    orders: 256,
    avgLeadTime: 3.8,
    defectRate: 0.4,
    tier: 'gold',
    status: 'active',
    lastReview: '2025-01-18',
    issues: 3,
  },
  {
    id: 'SUP-005',
    name: 'Pirelli Distribution',
    logo: 'P',
    overallScore: 82,
    trend: 'down',
    metrics: {
      fillRate: 88.5,
      onTimeDelivery: 85.2,
      qualityScore: 95.8,
      priceCompetitiveness: 78,
      communication: 79,
    },
    volume: 98000,
    orders: 145,
    avgLeadTime: 5.5,
    defectRate: 0.9,
    tier: 'silver',
    status: 'active',
    lastReview: '2024-12-28',
    issues: 12,
  },
]

// Recent issues
const recentIssues = [
  { supplier: 'Bridgestone Americas', issue: 'Late delivery - 3 days', severity: 'medium', date: '2025-01-24', status: 'open' },
  { supplier: 'Pirelli Distribution', issue: 'Wrong SKU shipped', severity: 'high', date: '2025-01-23', status: 'resolved' },
  { supplier: 'Goodyear Wholesale', issue: 'Damaged packaging', severity: 'low', date: '2025-01-22', status: 'resolved' },
  { supplier: 'Bridgestone Americas', issue: 'Stock discrepancy', severity: 'medium', date: '2025-01-20', status: 'investigating' },
]

// Stats
const stats = {
  avgScore: 88.4,
  onTimeDelivery: 91.3,
  avgFillRate: 93.6,
  totalVolume: 866000,
}

export default function SupplierScorecard() {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'score' | 'volume' | 'fillRate'>('score')

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    switch (sortBy) {
      case 'volume': return b.volume - a.volume
      case 'fillRate': return b.metrics.fillRate - a.metrics.fillRate
      default: return b.overallScore - a.overallScore
    }
  })

  return (
    <div className="min-h-screen">
      <Header
        title="Supplier Scorecard"
        subtitle="Track and evaluate supplier performance metrics"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Star className="w-6 h-6 text-emerald-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgScore}</p>
              <p className="text-sm text-slate-400 mt-1">Avg Supplier Score</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Truck className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.onTimeDelivery}%</p>
              <p className="text-sm text-slate-400 mt-1">On-Time Delivery</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-violet-500/20">
                <Package className="w-6 h-6 text-violet-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgFillRate}%</p>
              <p className="text-sm text-slate-400 mt-1">Avg Fill Rate</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <DollarSign className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalVolume)}</p>
              <p className="text-sm text-slate-400 mt-1">Total Volume (YTD)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplier List */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Supplier Rankings
              </h2>
              <div className="flex gap-2">
                {(['score', 'volume', 'fillRate'] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      sortBy === sort
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sort === 'score' ? 'Score' : sort === 'volume' ? 'Volume' : 'Fill Rate'}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-800/30">
              {sortedSuppliers.map((supplier, index) => (
                <button
                  key={supplier.id}
                  onClick={() => setSelectedSupplier(selectedSupplier === supplier.id ? null : supplier.id)}
                  className={`w-full p-4 text-left hover:bg-slate-800/20 transition-colors ${
                    selectedSupplier === supplier.id ? 'bg-slate-800/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-amber-700 to-amber-800 text-white' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {index + 1}
                    </span>

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                      supplier.tier === 'platinum' ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white' :
                      supplier.tier === 'gold' ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' :
                      'bg-gradient-to-br from-slate-400 to-slate-500 text-white'
                    }`}>
                      {supplier.logo}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{supplier.name}</h3>
                        <TierBadge tier={supplier.tier} />
                        {supplier.status === 'under_review' && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">
                            Under Review
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                        <span>{formatCurrency(supplier.volume)} volume</span>
                        <span>{supplier.orders} orders</span>
                        <span className="flex items-center gap-1">
                          {supplier.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                          {supplier.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                          {supplier.trend === 'stable' && <span className="text-slate-500">—</span>}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              supplier.overallScore >= 90 ? 'bg-emerald-500' :
                              supplier.overallScore >= 80 ? 'bg-cyan-500' :
                              supplier.overallScore >= 70 ? 'bg-amber-500' :
                              'bg-rose-500'
                            }`}
                            style={{ width: `${supplier.overallScore}%` }}
                          />
                        </div>
                        <span className={`text-lg font-bold ${
                          supplier.overallScore >= 90 ? 'text-emerald-400' :
                          supplier.overallScore >= 80 ? 'text-cyan-400' :
                          supplier.overallScore >= 70 ? 'text-amber-400' :
                          'text-rose-400'
                        }`}>
                          {supplier.overallScore}
                        </span>
                      </div>
                      {supplier.issues > 0 && (
                        <span className="text-xs text-rose-400">{supplier.issues} open issues</span>
                      )}
                    </div>

                    <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${
                      selectedSupplier === supplier.id ? 'rotate-90' : ''
                    }`} />
                  </div>

                  {selectedSupplier === supplier.id && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50 grid grid-cols-5 gap-4">
                      <MetricCard label="Fill Rate" value={supplier.metrics.fillRate} suffix="%" />
                      <MetricCard label="On-Time" value={supplier.metrics.onTimeDelivery} suffix="%" />
                      <MetricCard label="Quality" value={supplier.metrics.qualityScore} suffix="%" />
                      <MetricCard label="Price" value={supplier.metrics.priceCompetitiveness} suffix="%" />
                      <MetricCard label="Comms" value={supplier.metrics.communication} suffix="%" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Issues */}
            <div className="card">
              <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Issues</h2>
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="p-4 space-y-3">
                {recentIssues.map((issue, i) => (
                  <div key={i} className="p-3 bg-slate-800/40 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{issue.supplier}</span>
                      <SeverityBadge severity={issue.severity} />
                    </div>
                    <p className="text-sm text-slate-400">{issue.issue}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">{issue.date}</span>
                      <IssuStatusBadge status={issue.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="card p-6">
              <h3 className="font-medium text-white mb-4">Performance Benchmarks</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Fill Rate Target</span>
                    <span className="text-white">95%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '93.6%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">On-Time Target</span>
                    <span className="text-white">95%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: '91.3%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Quality Target</span>
                    <span className="text-white">99%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500" style={{ width: '97.5%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    platinum: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    gold: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    silver: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[tier]}`}>
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    high: 'bg-rose-500/20 text-rose-400',
    medium: 'bg-amber-500/20 text-amber-400',
    low: 'bg-slate-500/20 text-slate-400',
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[severity]}`}>
      {severity}
    </span>
  )
}

function IssuStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: 'text-rose-400',
    investigating: 'text-amber-400',
    resolved: 'text-emerald-400',
  }

  return (
    <span className={`text-xs ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function MetricCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="text-center">
      <p className={`text-lg font-bold ${
        value >= 95 ? 'text-emerald-400' :
        value >= 85 ? 'text-cyan-400' :
        value >= 75 ? 'text-amber-400' :
        'text-rose-400'
      }`}>
        {value}{suffix}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  )
}
