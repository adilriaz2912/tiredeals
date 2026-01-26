'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  FileText,
  PieChart,
  BarChart3,
  Minus,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface PnLLineItem {
  label: string
  amount: number
  previousAmount: number
  isSubtotal?: boolean
  isTotal?: boolean
  indent?: number
}

// Mock P&L Data
const revenueData: PnLLineItem[] = [
  { label: 'Tire Sales', amount: 458750, previousAmount: 398200 },
  { label: 'Installation Referral Fees', amount: 12450, previousAmount: 10800 },
  { label: 'Shipping Revenue', amount: 28500, previousAmount: 24200 },
  { label: 'Warranty Sales', amount: 8900, previousAmount: 7500 },
  { label: 'Total Revenue', amount: 508600, previousAmount: 440700, isSubtotal: true },
]

const cogsData: PnLLineItem[] = [
  { label: 'Tire Inventory Cost', amount: 312450, previousAmount: 278900 },
  { label: 'Shipping Costs', amount: 42500, previousAmount: 38200 },
  { label: 'Payment Processing Fees', amount: 15258, previousAmount: 13221 },
  { label: 'Total COGS', amount: 370208, previousAmount: 330321, isSubtotal: true },
]

const operatingExpenses: PnLLineItem[] = [
  { label: 'Marketing & Advertising', amount: 28500, previousAmount: 32000, indent: 1 },
  { label: 'Google Ads', amount: 18500, previousAmount: 22000, indent: 2 },
  { label: 'Facebook/Instagram Ads', amount: 6500, previousAmount: 7000, indent: 2 },
  { label: 'Other Marketing', amount: 3500, previousAmount: 3000, indent: 2 },
  { label: 'Payroll & Benefits', amount: 45000, previousAmount: 42000, indent: 1 },
  { label: 'Software & Tools', amount: 4500, previousAmount: 4200, indent: 1 },
  { label: 'Office & Utilities', amount: 3200, previousAmount: 3100, indent: 1 },
  { label: 'Insurance', amount: 2800, previousAmount: 2800, indent: 1 },
  { label: 'Professional Services', amount: 3500, previousAmount: 4000, indent: 1 },
  { label: 'Miscellaneous', amount: 1500, previousAmount: 1800, indent: 1 },
  { label: 'Total Operating Expenses', amount: 89000, previousAmount: 89900, isSubtotal: true },
]

const summaryData = {
  grossProfit: 138392,
  previousGrossProfit: 110379,
  grossMargin: 27.2,
  previousGrossMargin: 25.0,
  operatingIncome: 49392,
  previousOperatingIncome: 20479,
  operatingMargin: 9.7,
  previousOperatingMargin: 4.6,
  netIncome: 42183,
  previousNetIncome: 16383,
  netMargin: 8.3,
  previousNetMargin: 3.7,
}

const monthlyTrend = [
  { month: 'Aug', revenue: 72500, expenses: 65200, profit: 7300 },
  { month: 'Sep', revenue: 78200, expenses: 68400, profit: 9800 },
  { month: 'Oct', revenue: 82800, expenses: 71200, profit: 11600 },
  { month: 'Nov', revenue: 98400, expenses: 82500, profit: 15900 },
  { month: 'Dec', revenue: 112100, expenses: 89800, profit: 22300 },
  { month: 'Jan', revenue: 95800, expenses: 78600, profit: 17200 },
]

const expenseBreakdown = [
  { category: 'Inventory (COGS)', amount: 312450, percent: 68.0, color: 'bg-blue-500' },
  { category: 'Shipping', amount: 42500, percent: 9.2, color: 'bg-green-500' },
  { category: 'Payroll', amount: 45000, percent: 9.8, color: 'bg-green-500' },
  { category: 'Marketing', amount: 28500, percent: 6.2, color: 'bg-amber-500' },
  { category: 'Other OpEx', amount: 15500, percent: 3.4, color: 'bg-pink-500' },
  { category: 'Processing Fees', amount: 15258, percent: 3.3, color: 'bg-green-400' },
]

export default function PnLPage() {
  const [period, setPeriod] = useState('month')
  const [compareMode, setCompareMode] = useState(true)

  return (
    <div className="min-h-screen">
      <Header
        title="Profit & Loss Statement"
        subtitle="Financial performance and profitability analysis"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="input w-40"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(508600)}
            change={15.4}
            subtitle="vs last period"
            icon={<DollarSign className="w-5 h-5" />}
            color="blue"
          />
          <MetricCard
            title="Gross Profit"
            value={formatCurrency(summaryData.grossProfit)}
            change={25.4}
            subtitle={`${summaryData.grossMargin}% margin`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="green"
          />
          <MetricCard
            title="Operating Income"
            value={formatCurrency(summaryData.operatingIncome)}
            change={141.2}
            subtitle={`${summaryData.operatingMargin}% margin`}
            icon={<BarChart3 className="w-5 h-5" />}
            color="purple"
          />
          <MetricCard
            title="Net Income"
            value={formatCurrency(summaryData.netIncome)}
            change={157.5}
            subtitle={`${summaryData.netMargin}% margin`}
            icon={<PieChart className="w-5 h-5" />}
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* P&L Statement */}
          <div className="lg:col-span-2 card">
            <div className="card-header flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Income Statement</h2>
                <p className="text-sm text-gray-500">January 2025</p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={(e) => setCompareMode(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600"
                />
                Compare to previous period
              </label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Description</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Current</th>
                    {compareMode && (
                      <>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Previous</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Change</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* Revenue Section */}
                  <tr className="bg-gray-50">
                    <td colSpan={compareMode ? 4 : 2} className="py-2 px-4 text-sm font-semibold text-gray-700">
                      Revenue
                    </td>
                  </tr>
                  {revenueData.map((item) => (
                    <PnLRow key={item.label} item={item} compareMode={compareMode} />
                  ))}

                  {/* COGS Section */}
                  <tr className="bg-gray-50">
                    <td colSpan={compareMode ? 4 : 2} className="py-2 px-4 text-sm font-semibold text-gray-700">
                      Cost of Goods Sold
                    </td>
                  </tr>
                  {cogsData.map((item) => (
                    <PnLRow key={item.label} item={item} compareMode={compareMode} isExpense />
                  ))}

                  {/* Gross Profit */}
                  <tr className="border-t-2 border-gray-300 bg-green-50">
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">Gross Profit</td>
                    <td className="py-3 px-4 text-sm font-bold text-right text-green-600">
                      {formatCurrency(summaryData.grossProfit)}
                    </td>
                    {compareMode && (
                      <>
                        <td className="py-3 px-4 text-sm text-right text-gray-500">
                          {formatCurrency(summaryData.previousGrossProfit)}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          <ChangeIndicator
                            current={summaryData.grossProfit}
                            previous={summaryData.previousGrossProfit}
                          />
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Operating Expenses Section */}
                  <tr className="bg-gray-50">
                    <td colSpan={compareMode ? 4 : 2} className="py-2 px-4 text-sm font-semibold text-gray-700">
                      Operating Expenses
                    </td>
                  </tr>
                  {operatingExpenses.map((item) => (
                    <PnLRow key={item.label} item={item} compareMode={compareMode} isExpense />
                  ))}

                  {/* Operating Income */}
                  <tr className="border-t-2 border-gray-300 bg-blue-50">
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">Operating Income</td>
                    <td className="py-3 px-4 text-sm font-bold text-right text-blue-600">
                      {formatCurrency(summaryData.operatingIncome)}
                    </td>
                    {compareMode && (
                      <>
                        <td className="py-3 px-4 text-sm text-right text-gray-500">
                          {formatCurrency(summaryData.previousOperatingIncome)}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          <ChangeIndicator
                            current={summaryData.operatingIncome}
                            previous={summaryData.previousOperatingIncome}
                          />
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Other Income/Expenses */}
                  <tr>
                    <td className="py-2 px-4 text-sm text-gray-600">Interest Expense</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">(${formatNumber(1200)})</td>
                    {compareMode && (
                      <>
                        <td className="py-2 px-4 text-sm text-right text-gray-500">(${formatNumber(1100)})</td>
                        <td className="py-2 px-4 text-sm text-right text-red-500">+9.1%</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-sm text-gray-600">Taxes</td>
                    <td className="py-2 px-4 text-sm text-right text-red-600">(${formatNumber(6009)})</td>
                    {compareMode && (
                      <>
                        <td className="py-2 px-4 text-sm text-right text-gray-500">(${formatNumber(2996)})</td>
                        <td className="py-2 px-4 text-sm text-right text-red-500">+100.6%</td>
                      </>
                    )}
                  </tr>

                  {/* Net Income */}
                  <tr className="border-t-2 border-gray-900 bg-gray-900 text-white">
                    <td className="py-4 px-4 text-sm font-bold">Net Income</td>
                    <td className="py-4 px-4 text-sm font-bold text-right text-green-400">
                      {formatCurrency(summaryData.netIncome)}
                    </td>
                    {compareMode && (
                      <>
                        <td className="py-4 px-4 text-sm text-right text-gray-400">
                          {formatCurrency(summaryData.previousNetIncome)}
                        </td>
                        <td className="py-4 px-4 text-sm text-right text-green-400">
                          +157.5%
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="space-y-6">
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Expense Breakdown</h3>
              </div>
              <div className="card-body space-y-4">
                {expenseBreakdown.map((expense) => (
                  <div key={expense.category}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{expense.category}</span>
                      <span className="font-medium">{formatCurrency(expense.amount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div
                          className={cn('h-full rounded-full', expense.color)}
                          style={{ width: `${expense.percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">{expense.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Trend */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Monthly Profit Trend</h3>
              </div>
              <div className="card-body">
                <div className="h-48 flex items-end justify-between gap-2">
                  {monthlyTrend.map((month) => {
                    const maxProfit = Math.max(...monthlyTrend.map(m => m.profit))
                    const heightPercent = (month.profit / maxProfit) * 100

                    return (
                      <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-medium text-green-600">
                          ${(month.profit / 1000).toFixed(1)}k
                        </span>
                        <div
                          className="w-full bg-green-500 rounded-t"
                          style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                        />
                        <span className="text-xs text-gray-500">{month.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Key Ratios */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Key Ratios</h3>
              </div>
              <div className="card-body space-y-3">
                <RatioRow label="Gross Margin" value={summaryData.grossMargin} previous={summaryData.previousGrossMargin} />
                <RatioRow label="Operating Margin" value={summaryData.operatingMargin} previous={summaryData.previousOperatingMargin} />
                <RatioRow label="Net Margin" value={summaryData.netMargin} previous={summaryData.previousNetMargin} />
                <RatioRow label="COGS Ratio" value={72.8} previous={74.9} inverted />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  subtitle,
  icon,
  color,
}: {
  title: string
  value: string
  change: number
  subtitle: string
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  const isPositive = change >= 0

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={cn('p-2 rounded-lg', colors[color])}>
          {icon}
        </div>
        <span className={cn(
          'flex items-center gap-1 text-sm font-medium',
          isPositive ? 'text-green-600' : 'text-red-600'
        )}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  )
}

function PnLRow({
  item,
  compareMode,
  isExpense = false,
}: {
  item: PnLLineItem
  compareMode: boolean
  isExpense?: boolean
}) {
  const change = ((item.amount - item.previousAmount) / item.previousAmount) * 100
  const isPositive = isExpense ? change < 0 : change > 0

  return (
    <tr className={cn(item.isSubtotal && 'border-t border-gray-200 font-semibold bg-gray-50')}>
      <td
        className={cn('py-2 px-4 text-sm', item.isSubtotal ? 'text-gray-900' : 'text-gray-600')}
        style={{ paddingLeft: item.indent ? `${item.indent * 24 + 16}px` : undefined }}
      >
        {item.label}
      </td>
      <td className={cn('py-2 px-4 text-sm text-right', item.isSubtotal && 'font-semibold')}>
        {formatCurrency(item.amount)}
      </td>
      {compareMode && (
        <>
          <td className="py-2 px-4 text-sm text-right text-gray-500">
            {formatCurrency(item.previousAmount)}
          </td>
          <td className="py-2 px-4 text-sm text-right">
            <span className={cn(
              'inline-flex items-center gap-0.5',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </td>
        </>
      )}
    </tr>
  )
}

function ChangeIndicator({ current, previous }: { current: number; previous: number }) {
  const change = ((current - previous) / previous) * 100
  const isPositive = change >= 0

  return (
    <span className={cn(
      'inline-flex items-center gap-0.5 font-medium',
      isPositive ? 'text-green-600' : 'text-red-600'
    )}>
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {Math.abs(change).toFixed(1)}%
    </span>
  )
}

function RatioRow({
  label,
  value,
  previous,
  inverted = false,
}: {
  label: string
  value: number
  previous: number
  inverted?: boolean
}) {
  const change = value - previous
  const isPositive = inverted ? change < 0 : change > 0

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-900">{value.toFixed(1)}%</span>
        <span className={cn(
          'text-xs',
          isPositive ? 'text-green-600' : 'text-red-600'
        )}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}pp
        </span>
      </div>
    </div>
  )
}
