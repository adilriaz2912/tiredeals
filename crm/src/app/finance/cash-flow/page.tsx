'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Banknote,
  PiggyBank,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Cash flow forecast data
const forecast = [
  { period: 'Week 1', inflows: 485000, outflows: 420000, net: 65000, balance: 1250000 },
  { period: 'Week 2', inflows: 512000, outflows: 445000, net: 67000, balance: 1317000 },
  { period: 'Week 3', inflows: 498000, outflows: 520000, net: -22000, balance: 1295000 },
  { period: 'Week 4', inflows: 545000, outflows: 480000, net: 65000, balance: 1360000 },
  { period: 'Week 5', inflows: 478000, outflows: 510000, net: -32000, balance: 1328000 },
  { period: 'Week 6', inflows: 520000, outflows: 465000, net: 55000, balance: 1383000 },
]

// Inflow categories
const inflowCategories = [
  { category: 'B2C Orders', amount: 1850000, percentage: 58, trend: 'up', change: 8.5 },
  { category: 'B2B/Fleet', amount: 920000, percentage: 29, trend: 'up', change: 12.2 },
  { category: 'Installation Fees', amount: 280000, percentage: 9, trend: 'stable', change: 1.2 },
  { category: 'Warranties', amount: 130000, percentage: 4, trend: 'down', change: -3.5 },
]

// Outflow categories
const outflowCategories = [
  { category: 'Inventory Purchase', amount: 1680000, percentage: 60, trend: 'up', change: 5.8 },
  { category: 'Payroll', amount: 450000, percentage: 16, trend: 'stable', change: 2.0 },
  { category: 'Marketing', amount: 280000, percentage: 10, trend: 'up', change: 15.2 },
  { category: 'Shipping & Logistics', amount: 220000, percentage: 8, trend: 'up', change: 7.5 },
  { category: 'Rent & Utilities', amount: 85000, percentage: 3, trend: 'stable', change: 0 },
  { category: 'Other', amount: 85000, percentage: 3, trend: 'down', change: -2.1 },
]

// Upcoming payables
const upcomingPayables = [
  { vendor: 'Michelin Distribution', amount: 245000, dueDate: '2025-02-01', status: 'upcoming' },
  { vendor: 'Goodyear Wholesale', amount: 185000, dueDate: '2025-02-05', status: 'upcoming' },
  { vendor: 'Shipping Partners Inc', amount: 42000, dueDate: '2025-02-03', status: 'upcoming' },
  { vendor: 'Marketing Agency', amount: 28000, dueDate: '2025-02-07', status: 'upcoming' },
  { vendor: 'Bridgestone Americas', amount: 156000, dueDate: '2025-02-10', status: 'scheduled' },
]

// Upcoming receivables
const upcomingReceivables = [
  { customer: 'Metro Fleet Services', amount: 48500, dueDate: '2025-02-02', status: 'expected' },
  { customer: 'City Cab Company', amount: 32000, dueDate: '2025-02-05', status: 'expected' },
  { customer: 'Green Logistics', amount: 28500, dueDate: '2025-02-08', status: 'expected' },
  { customer: 'Quick Delivery Co', amount: 21000, dueDate: '2025-02-10', status: 'at_risk' },
]

// Stats
const stats = {
  currentBalance: 1250000,
  projectedBalance30: 1383000,
  avgDailyCashBurn: 15200,
  runwayDays: 82,
}

export default function CashFlowForecast() {
  const [timeframe, setTimeframe] = useState<'6week' | '3month' | '6month'>('6week')

  const maxValue = Math.max(...forecast.map(f => Math.max(f.inflows, f.outflows)))

  return (
    <div className="min-h-screen">
      <Header
        title="Cash Flow Forecasting"
        subtitle="Predict cash position and optimize working capital"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 border-2 border-green-500/30 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Banknote className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.currentBalance)}</p>
              <p className="text-sm text-neutral-400 mt-1">Current Balance</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <PiggyBank className="w-6 h-6 text-green-300" />
              </div>
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                +10.6%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.projectedBalance30)}</p>
              <p className="text-sm text-neutral-400 mt-1">Projected (30d)</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <TrendingDown className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.avgDailyCashBurn)}</p>
              <p className="text-sm text-neutral-400 mt-1">Avg Daily Burn</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.runwayDays} days</p>
              <p className="text-sm text-neutral-400 mt-1">Cash Runway</p>
            </div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              Cash Flow Forecast
            </h2>
            <div className="flex gap-2">
              {(['6week', '3month', '6month'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    timeframe === tf
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tf === '6week' ? '6 Weeks' : tf === '3month' ? '3 Months' : '6 Months'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-end gap-4 h-64">
              {forecast.map((week) => (
                <div key={week.period} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 h-48 items-end">
                    <div
                      className="flex-1 bg-green-500/30 rounded-t"
                      style={{ height: `${(week.inflows / maxValue) * 100}%` }}
                      title={`Inflows: ${formatCurrency(week.inflows)}`}
                    />
                    <div
                      className="flex-1 bg-rose-500/30 rounded-t"
                      style={{ height: `${(week.outflows / maxValue) * 100}%` }}
                      title={`Outflows: ${formatCurrency(week.outflows)}`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-neutral-400">{week.period}</p>
                    <p className={`text-sm font-semibold ${week.net >= 0 ? 'text-green-400' : 'text-rose-400'}`}>
                      {week.net >= 0 ? '+' : ''}{formatCurrency(week.net)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
              <span className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="w-3 h-3 rounded bg-green-500/50" /> Inflows
              </span>
              <span className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="w-3 h-3 rounded bg-rose-500/50" /> Outflows
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inflow Breakdown */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-green-400" />
                Inflow Breakdown
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {inflowCategories.map((cat) => (
                <div key={cat.category} className="p-3 bg-neutral-800/40 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{cat.category}</span>
                    <span className="text-green-400 font-semibold">{formatCurrency(cat.amount)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-neutral-400 w-12">{cat.percentage}%</span>
                    <span className={`text-sm flex items-center gap-1 ${
                      cat.trend === 'up' ? 'text-green-400' :
                      cat.trend === 'down' ? 'text-rose-400' :
                      'text-neutral-400'
                    }`}>
                      {cat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                      {cat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                      {cat.change > 0 ? '+' : ''}{cat.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outflow Breakdown */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5 text-rose-400" />
                Outflow Breakdown
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {outflowCategories.map((cat) => (
                <div key={cat.category} className="p-3 bg-neutral-800/40 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{cat.category}</span>
                    <span className="text-rose-400 font-semibold">{formatCurrency(cat.amount)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-neutral-400 w-12">{cat.percentage}%</span>
                    <span className={`text-sm flex items-center gap-1 ${
                      cat.trend === 'up' ? 'text-rose-400' :
                      cat.trend === 'down' ? 'text-green-400' :
                      'text-neutral-400'
                    }`}>
                      {cat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                      {cat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                      {cat.change > 0 ? '+' : ''}{cat.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Payables */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-400" />
                Upcoming Payables
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800/50">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Vendor</th>
                    <th className="text-right p-4 text-sm font-medium text-neutral-400">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Due Date</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingPayables.map((payable) => (
                    <tr key={payable.vendor} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                      <td className="p-4 text-white">{payable.vendor}</td>
                      <td className="p-4 text-right text-rose-400 font-semibold">{formatCurrency(payable.amount)}</td>
                      <td className="p-4 text-neutral-300">{payable.dueDate}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          payable.status === 'upcoming'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-neutral-500/20 text-neutral-400'
                        }`}>
                          {payable.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Receivables */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Expected Receivables
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800/50">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Customer</th>
                    <th className="text-right p-4 text-sm font-medium text-neutral-400">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Expected</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingReceivables.map((receivable) => (
                    <tr key={receivable.customer} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                      <td className="p-4 text-white">{receivable.customer}</td>
                      <td className="p-4 text-right text-green-400 font-semibold">{formatCurrency(receivable.amount)}</td>
                      <td className="p-4 text-neutral-300">{receivable.dueDate}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          receivable.status === 'expected'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {receivable.status === 'at_risk' ? 'At Risk' : 'Expected'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
