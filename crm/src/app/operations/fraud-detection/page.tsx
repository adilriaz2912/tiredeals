'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  AlertTriangle,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  ChevronRight,
  Activity,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

// Flagged transactions
const flaggedTransactions = [
  {
    id: 'TXN-8734',
    orderId: 'TD-X9Y8Z7',
    customer: 'Unknown User',
    email: 'temp.buyer92@mailinator.com',
    amount: 2456.00,
    riskScore: 95,
    riskLevel: 'critical',
    flags: ['Disposable email', 'VPN detected', 'Multiple failed cards', 'Shipping ≠ Billing'],
    timestamp: '2025-01-26 14:32:05',
    paymentMethod: 'Visa *4532',
    location: 'Unknown (VPN)',
    status: 'blocked',
  },
  {
    id: 'TXN-8729',
    orderId: 'TD-A1B2C3',
    customer: 'James Wilson',
    email: 'jwilson@email.com',
    amount: 3890.00,
    riskScore: 82,
    riskLevel: 'high',
    flags: ['First order', 'High value', 'Rush shipping', 'New address'],
    timestamp: '2025-01-26 13:15:22',
    paymentMethod: 'Mastercard *7891',
    location: 'Miami, FL',
    status: 'review',
  },
  {
    id: 'TXN-8721',
    orderId: 'TD-D4E5F6',
    customer: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    amount: 1245.00,
    riskScore: 68,
    riskLevel: 'medium',
    flags: ['Unusual purchase time', 'Different device', 'Gift shipping'],
    timestamp: '2025-01-26 11:45:18',
    paymentMethod: 'Amex *3456',
    location: 'New York, NY',
    status: 'review',
  },
  {
    id: 'TXN-8715',
    orderId: 'TD-G7H8I9',
    customer: 'Mike Brown',
    email: 'mbrown@email.com',
    amount: 856.00,
    riskScore: 45,
    riskLevel: 'low',
    flags: ['New shipping address'],
    timestamp: '2025-01-26 10:22:44',
    paymentMethod: 'Visa *2345',
    location: 'Chicago, IL',
    status: 'approved',
  },
]

// Fraud patterns
const fraudPatterns = [
  { pattern: 'Card Testing', count: 12, trend: 'up', blocked: 12 },
  { pattern: 'Account Takeover', count: 3, trend: 'down', blocked: 2 },
  { pattern: 'Refund Fraud', count: 8, trend: 'stable', blocked: 5 },
  { pattern: 'Friendly Fraud', count: 15, trend: 'up', blocked: 0 },
  { pattern: 'Address Fraud', count: 6, trend: 'down', blocked: 4 },
]

// Return fraud suspects
const returnFraudSuspects = [
  { customer: 'Alex Johnson', returns: 8, value: 3240, rate: 45, pattern: 'Serial returner' },
  { customer: 'Maria Garcia', returns: 5, value: 1890, rate: 62, pattern: 'Wardrobing suspected' },
  { customer: 'Ryan Smith', returns: 4, value: 2100, rate: 80, pattern: 'Wrong tire claims' },
]

// Stats
const stats = {
  blockedToday: 8,
  amountProtected: 18450,
  reviewQueue: 12,
  falsePositiveRate: 2.3,
  fraudRate: 0.8,
  industryAvg: 1.5,
}

export default function FraudDetection() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')
  const [transactions, setTransactions] = useState(flaggedTransactions)

  const filteredTransactions = transactions.filter(t =>
    filter === 'all' || t.riskLevel === filter
  )

  const handleApprove = (id: string) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'approved' } : t)
    )
  }

  const handleBlock = (id: string) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'blocked' } : t)
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Fraud Detection"
        subtitle="AI-powered fraud prevention and transaction monitoring"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 shadow-lg shadow-rose-500/10">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-rose-500/20">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.blockedToday}</p>
              <p className="text-sm text-slate-400 mt-1">Blocked Today</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.amountProtected)}</p>
              <p className="text-sm text-slate-400 mt-1">Amount Protected</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.reviewQueue}</p>
              <p className="text-sm text-slate-400 mt-1">Pending Review</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.fraudRate}%</p>
              <p className="text-sm text-slate-400 mt-1">Fraud Rate</p>
              <p className="text-xs text-emerald-400">vs {stats.industryAvg}% industry</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flagged Transactions */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-400" />
                Flagged Transactions
              </h2>
              <div className="flex gap-2">
                {(['all', 'critical', 'high', 'medium', 'low'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filter === level
                        ? level === 'critical' ? 'bg-rose-500/20 text-rose-400' :
                          level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          level === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                          level === 'low' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-800/30">
              {filteredTransactions.map((txn) => (
                <div key={txn.id} className="p-6 hover:bg-slate-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-slate-400">{txn.id}</span>
                        <RiskBadge level={txn.riskLevel} score={txn.riskScore} />
                        <StatusBadge status={txn.status} />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="text-sm text-white">{txn.customer}</p>
                            <p className="text-xs text-slate-500">{txn.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <p className="text-sm font-semibold text-white">{formatCurrency(txn.amount)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-500" />
                          <p className="text-sm text-slate-300">{txn.paymentMethod}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <p className="text-sm text-slate-300">{txn.location}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {txn.flags.map((flag, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-rose-500/10 text-rose-400 rounded flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {flag}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-slate-500 mt-3">
                        Order: {txn.orderId} • {txn.timestamp}
                      </p>
                    </div>

                    {txn.status === 'review' && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleApprove(txn.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleBlock(txn.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors"
                        >
                          <Ban className="w-4 h-4" />
                          Block
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors">
                          <Eye className="w-4 h-4" />
                          Investigate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fraud Patterns */}
            <div className="card">
              <div className="px-6 py-4 border-b border-slate-800/50">
                <h2 className="text-lg font-semibold text-white">Fraud Patterns (30d)</h2>
              </div>
              <div className="p-4 space-y-3">
                {fraudPatterns.map((pattern) => (
                  <div key={pattern.pattern} className="p-3 bg-slate-800/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{pattern.pattern}</span>
                      <span className="flex items-center gap-1 text-sm">
                        {pattern.trend === 'up' && <TrendingUp className="w-3 h-3 text-rose-400" />}
                        {pattern.trend === 'down' && <TrendingUp className="w-3 h-3 text-emerald-400 rotate-180" />}
                        <span className={pattern.trend === 'up' ? 'text-rose-400' : pattern.trend === 'down' ? 'text-emerald-400' : 'text-slate-400'}>
                          {pattern.count}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Blocked: {pattern.blocked}/{pattern.count}</span>
                      <span className="text-emerald-400">{Math.round(pattern.blocked / pattern.count * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Fraud Suspects */}
            <div className="card">
              <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Return Fraud Suspects</h2>
                <Package className="w-5 h-5 text-amber-400" />
              </div>
              <div className="p-4 space-y-3">
                {returnFraudSuspects.map((suspect) => (
                  <div key={suspect.customer} className="p-3 bg-slate-800/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{suspect.customer}</span>
                      <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">
                        {suspect.rate}% return rate
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{suspect.returns} returns</span>
                      <span>{formatCurrency(suspect.value)}</span>
                    </div>
                    <p className="text-xs text-rose-400 mt-1">{suspect.pattern}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="font-medium text-white mb-4">System Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">False Positive Rate</span>
                  <span className="text-emerald-400">{stats.falsePositiveRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Detection Accuracy</span>
                  <span className="text-emerald-400">97.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Review Time</span>
                  <span className="text-white">4.2 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rules Active</span>
                  <span className="text-white">42</span>
                </div>
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
    low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>
      <Activity className="w-3 h-3" />
      Risk: {score}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; icon: React.ReactNode }> = {
    blocked: { bg: 'bg-rose-500/20 text-rose-400', icon: <Ban className="w-3 h-3" /> },
    approved: { bg: 'bg-emerald-500/20 text-emerald-400', icon: <CheckCircle className="w-3 h-3" /> },
    review: { bg: 'bg-amber-500/20 text-amber-400', icon: <Clock className="w-3 h-3" /> },
  }

  const style = styles[status]

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg}`}>
      {style.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
