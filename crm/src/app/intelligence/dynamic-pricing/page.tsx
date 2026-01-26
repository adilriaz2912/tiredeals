'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Shield,
  Target,
  Zap,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Ban,
  Check,
  X,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Price recommendations
const priceRecommendations = [
  {
    id: 'PR-001',
    product: 'Michelin Defender T+H 215/55R17',
    sku: 'MICH-DEF-2155517',
    currentPrice: 189.99,
    recommendedPrice: 199.99,
    change: 5.3,
    direction: 'increase',
    reason: 'High demand, low inventory (12 units)',
    competitorPrice: 205.99,
    margin: { current: 22, recommended: 27 },
    confidence: 92,
    status: 'pending',
    impact: { revenue: 2400, units: 240 },
  },
  {
    id: 'PR-002',
    product: 'Goodyear Assurance 225/65R17',
    sku: 'GY-ASR-2256517',
    currentPrice: 145.99,
    recommendedPrice: 139.99,
    change: -4.1,
    direction: 'decrease',
    reason: 'Competitor undercut, losing market share',
    competitorPrice: 138.99,
    margin: { current: 24, recommended: 21 },
    confidence: 88,
    status: 'pending',
    impact: { revenue: -1200, units: 450 },
  },
  {
    id: 'PR-003',
    product: 'Bridgestone Turanza QuietTrack 225/60R17',
    sku: 'BS-TUR-2256017',
    currentPrice: 165.99,
    recommendedPrice: 175.99,
    change: 6.0,
    direction: 'increase',
    reason: 'Seasonal demand spike (spring)',
    competitorPrice: 179.99,
    margin: { current: 20, recommended: 25 },
    confidence: 85,
    status: 'approved',
    impact: { revenue: 3200, units: 320 },
  },
  {
    id: 'PR-004',
    product: 'Continental CrossContact LX25 235/65R18',
    sku: 'CONT-CC-2356518',
    currentPrice: 198.99,
    recommendedPrice: 185.99,
    change: -6.5,
    direction: 'decrease',
    reason: 'Overstock - 450 units, slow moving',
    competitorPrice: 189.99,
    margin: { current: 28, recommended: 22 },
    confidence: 94,
    status: 'pending',
    impact: { revenue: -5850, units: 450 },
  },
  {
    id: 'PR-005',
    product: 'Pirelli P4 Four Seasons Plus 205/55R16',
    sku: 'PIR-P4-2055516',
    currentPrice: 132.99,
    recommendedPrice: 132.99,
    change: 0,
    direction: 'hold',
    reason: 'Price optimally positioned vs competition',
    competitorPrice: 134.99,
    margin: { current: 23, recommended: 23 },
    confidence: 91,
    status: 'approved',
    impact: { revenue: 0, units: 280 },
  },
]

// Guardrails
const guardrails = [
  { name: 'Maximum Price Increase', value: '10%', status: 'active' },
  { name: 'Maximum Price Decrease', value: '15%', status: 'active' },
  { name: 'Minimum Margin', value: '18%', status: 'active' },
  { name: 'Competitor Match Limit', value: '-5%', status: 'active' },
  { name: 'Approval Required Above', value: '$50 change', status: 'active' },
  { name: 'Fleet Customer Lock', value: '30 days', status: 'active' },
]

// Recent price changes
const recentChanges = [
  { product: 'BFGoodrich All-Terrain T/A KO2', oldPrice: 245.99, newPrice: 259.99, date: '2025-01-25', approver: 'System' },
  { product: 'Michelin Pilot Sport 4S', oldPrice: 289.99, newPrice: 279.99, date: '2025-01-24', approver: 'John M.' },
  { product: 'Goodyear Wrangler AT/S', oldPrice: 185.99, newPrice: 195.99, date: '2025-01-24', approver: 'Sarah K.' },
  { product: 'Continental TrueContact Tour', oldPrice: 142.99, newPrice: 148.99, date: '2025-01-23', approver: 'System' },
]

// Stats
const stats = {
  pendingApprovals: 8,
  autoApproved: 24,
  revenueImpact: 28500,
  marginImprovement: 2.4,
}

export default function DynamicPricing() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'guardrails' | 'history'>('recommendations')
  const [recommendations, setRecommendations] = useState(priceRecommendations)

  const handleApprove = (id: string) => {
    setRecommendations(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'approved' } : r)
    )
  }

  const handleReject = (id: string) => {
    setRecommendations(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r)
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Dynamic Pricing Engine"
        subtitle="AI-powered price optimization with guardrails and approvals"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.pendingApprovals}</p>
              <p className="text-sm text-neutral-400 mt-1">Pending Approvals</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.autoApproved}</p>
              <p className="text-sm text-neutral-400 mt-1">Auto-Approved (7d)</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <DollarSign className="w-6 h-6 text-green-300" />
              </div>
              <span className="flex items-center gap-1 text-sm text-green-400">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.revenueImpact)}</p>
              <p className="text-sm text-neutral-400 mt-1">Est. Revenue Impact</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Target className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">+{stats.marginImprovement}%</p>
              <p className="text-sm text-neutral-400 mt-1">Margin Improvement</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-neutral-800/50 pb-4">
          {(['recommendations', 'guardrails', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-green-500 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'recommendations' && ` (${stats.pendingApprovals})`}
            </button>
          ))}
        </div>

        {activeTab === 'recommendations' && (
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Price Recommendations
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh Analysis
              </button>
            </div>

            <div className="divide-y divide-neutral-800/30">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-6 hover:bg-neutral-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-white">{rec.product}</h3>
                        <StatusBadge status={rec.status} />
                      </div>
                      <p className="text-sm text-neutral-500 mb-4">{rec.sku}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-neutral-500">Current Price</p>
                          <p className="text-lg font-semibold text-white">{formatCurrency(rec.currentPrice)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500">Recommended</p>
                          <p className={`text-lg font-semibold ${
                            rec.direction === 'increase' ? 'text-green-400' :
                            rec.direction === 'decrease' ? 'text-rose-400' :
                            'text-neutral-400'
                          }`}>
                            {formatCurrency(rec.recommendedPrice)}
                            {rec.change !== 0 && (
                              <span className="text-sm ml-1">
                                ({rec.change > 0 ? '+' : ''}{rec.change}%)
                              </span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500">Competitor</p>
                          <p className="text-lg font-semibold text-neutral-300">{formatCurrency(rec.competitorPrice)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500">Confidence</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: `${rec.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-neutral-400">{rec.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500">Margin:</span>
                          <span className="text-neutral-300">{rec.margin.current}%</span>
                          <ChevronRight className="w-4 h-4 text-neutral-600" />
                          <span className={rec.margin.recommended > rec.margin.current ? 'text-green-400' : 'text-rose-400'}>
                            {rec.margin.recommended}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500">Revenue Impact:</span>
                          <span className={rec.impact.revenue >= 0 ? 'text-green-400' : 'text-rose-400'}>
                            {rec.impact.revenue >= 0 ? '+' : ''}{formatCurrency(rec.impact.revenue)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-neutral-800/40 rounded-lg">
                        <p className="text-sm text-neutral-300">
                          <span className="text-neutral-500">Reason:</span> {rec.reason}
                        </p>
                      </div>
                    </div>

                    {rec.status === 'pending' && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleApprove(rec.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(rec.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guardrails' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-300" />
                  Active Guardrails
                </h2>
                <button className="text-sm text-green-400 hover:text-green-300">+ Add Rule</button>
              </div>
              <div className="divide-y divide-neutral-800/30">
                {guardrails.map((rule) => (
                  <div key={rule.name} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{rule.name}</p>
                      <p className="text-sm text-neutral-500">Limit: {rule.value}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
                      <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="px-6 py-4 border-b border-neutral-800/50">
                <h2 className="text-lg font-semibold text-white">Approval Workflow</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-neutral-800/40 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Auto-Approve Conditions</h3>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Price change under 5%
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Margin stays above 18%
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Within competitor range
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Confidence score above 85%
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-neutral-800/40 rounded-lg">
                  <h3 className="font-medium text-white mb-2">Manual Review Required</h3>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Price change over 10%
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Revenue impact over $5,000
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Fleet/B2B customer pricing
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Below competitor by 10%+
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                  <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                    <Ban className="w-4 h-4 text-rose-400" />
                    Blocked Actions
                  </h3>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li>Margin below 15%</li>
                    <li>Price increase over 15%</li>
                    <li>Price decrease over 20%</li>
                    <li>Changes during active promotions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white">Recent Price Changes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800/50">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Product</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Old Price</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">New Price</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Change</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Approved By</th>
                  </tr>
                </thead>
                <tbody>
                  {recentChanges.map((change, i) => {
                    const pctChange = ((change.newPrice - change.oldPrice) / change.oldPrice * 100).toFixed(1)
                    return (
                      <tr key={i} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                        <td className="p-4 text-white">{change.product}</td>
                        <td className="p-4 text-neutral-400">{formatCurrency(change.oldPrice)}</td>
                        <td className="p-4 text-white">{formatCurrency(change.newPrice)}</td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1 ${
                            change.newPrice > change.oldPrice ? 'text-green-400' : 'text-rose-400'
                          }`}>
                            {change.newPrice > change.oldPrice ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            {pctChange}%
                          </span>
                        </td>
                        <td className="p-4 text-neutral-400">{change.date}</td>
                        <td className="p-4 text-neutral-400">{change.approver}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
