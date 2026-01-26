'use client'

import { Header } from '@/components/layout/Header'
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Clock,
  Repeat,
  MousePointer,
  Globe,
  Search,
  Mail,
  Share2,
  Target
} from 'lucide-react'

// Mock data
const conversionBySource = [
  { source: 'Google Organic', visitors: 45230, conversions: 1582, rate: 3.5, revenue: 284760, trend: 12 },
  { source: 'Google Ads', visitors: 28450, conversions: 1138, rate: 4.0, revenue: 204840, trend: 8 },
  { source: 'Direct', visitors: 18920, conversions: 757, rate: 4.0, revenue: 136260, trend: -3 },
  { source: 'Facebook Ads', visitors: 12340, conversions: 370, rate: 3.0, revenue: 66600, trend: 15 },
  { source: 'Email', visitors: 8560, conversions: 428, rate: 5.0, revenue: 77040, trend: 22 },
  { source: 'Referral', visitors: 5420, conversions: 217, rate: 4.0, revenue: 39060, trend: 5 },
  { source: 'Social Organic', visitors: 3210, conversions: 96, rate: 3.0, revenue: 17280, trend: -8 },
]

const aovTrends = [
  { month: 'Aug', aov: 168, orders: 3420 },
  { month: 'Sep', aov: 172, orders: 3680 },
  { month: 'Oct', aov: 185, orders: 4120 },
  { month: 'Nov', aov: 192, orders: 4890 },
  { month: 'Dec', aov: 198, orders: 5230 },
  { month: 'Jan', aov: 180, orders: 4588 },
]

const timeToFirstPurchase = [
  { range: 'Same Day', customers: 2340, percentage: 28 },
  { range: '1-3 Days', customers: 1890, percentage: 23 },
  { range: '4-7 Days', customers: 1420, percentage: 17 },
  { range: '1-2 Weeks', customers: 1180, percentage: 14 },
  { range: '2-4 Weeks', customers: 840, percentage: 10 },
  { range: '1+ Month', customers: 670, percentage: 8 },
]

const repeatPurchaseData = {
  overall: {
    rate: 34.2,
    trend: 5.8,
    avgTimeBetween: 8.4, // months
  },
  bySegment: [
    { segment: 'VIP Customers', rate: 78, customers: 1240, avgOrders: 4.2 },
    { segment: 'Loyal', rate: 52, customers: 3420, avgOrders: 2.8 },
    { segment: 'Repeat', rate: 34, customers: 5680, avgOrders: 2.1 },
    { segment: 'One-time', rate: 0, customers: 12450, avgOrders: 1.0 },
  ]
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

const sourceIcons: { [key: string]: React.ReactNode } = {
  'Google Organic': <Search className="w-4 h-4" />,
  'Google Ads': <Target className="w-4 h-4" />,
  'Direct': <Globe className="w-4 h-4" />,
  'Facebook Ads': <Share2 className="w-4 h-4" />,
  'Email': <Mail className="w-4 h-4" />,
  'Referral': <MousePointer className="w-4 h-4" />,
  'Social Organic': <Share2 className="w-4 h-4" />,
}

export default function EcommerceKPIsPage() {
  const totalConversions = conversionBySource.reduce((sum, s) => sum + s.conversions, 0)
  const totalVisitors = conversionBySource.reduce((sum, s) => sum + s.visitors, 0)
  const totalRevenue = conversionBySource.reduce((sum, s) => sum + s.revenue, 0)
  const overallConversionRate = ((totalConversions / totalVisitors) * 100).toFixed(1)
  const currentAOV = aovTrends[aovTrends.length - 1].aov
  const maxAOV = Math.max(...aovTrends.map(t => t.aov))

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="E-commerce KPIs"
        subtitle="Conversion, AOV, and purchase behavior analytics"
      />

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.2%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{overallConversionRate}%</p>
            <p className="text-neutral-400 text-sm mt-1">Overall Conversion Rate</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +4.5%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{formatCurrency(currentAOV)}</p>
            <p className="text-neutral-400 text-sm mt-1">Average Order Value</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -12%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">4.2 days</p>
            <p className="text-neutral-400 text-sm mt-1">Avg Time to First Purchase</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Repeat className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{repeatPurchaseData.overall.trend}%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{repeatPurchaseData.overall.rate}%</p>
            <p className="text-neutral-400 text-sm mt-1">Repeat Purchase Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion by Traffic Source */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Conversion by Traffic Source</h2>
            <div className="space-y-4">
              {conversionBySource.map((source) => (
                <div key={source.source} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
                    {sourceIcons[source.source]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{source.source}</span>
                      <span className="text-sm font-bold text-green-400">{source.rate}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(source.rate / 5) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-neutral-500">
                        {formatNumber(source.visitors)} visitors → {formatNumber(source.conversions)} orders
                      </span>
                      <span className={`text-xs font-medium ${source.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {source.trend >= 0 ? '+' : ''}{source.trend}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AOV Trends */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Average Order Value Trends</h2>
            <div className="space-y-4">
              {aovTrends.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-neutral-400">{month.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-8 bg-neutral-800 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-end pr-3"
                          style={{ width: `${(month.aov / maxAOV) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-black">{formatCurrency(month.aov)}</span>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500 w-20 text-right">
                        {formatNumber(month.orders)} orders
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Peak AOV</span>
                <span className="text-white font-semibold">{formatCurrency(maxAOV)} (Nov)</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-neutral-400">6-Month Average</span>
                <span className="text-white font-semibold">
                  {formatCurrency(Math.round(aovTrends.reduce((sum, t) => sum + t.aov, 0) / aovTrends.length))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time to First Purchase */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Time to First Purchase</h2>
            <div className="space-y-3">
              {timeToFirstPurchase.map((range) => (
                <div key={range.range} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-neutral-400">{range.range}</span>
                  <div className="flex-1">
                    <div className="h-8 bg-neutral-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-lg flex items-center px-3"
                        style={{ width: `${range.percentage}%` }}
                      >
                        {range.percentage >= 15 && (
                          <span className="text-xs font-bold text-black">{range.percentage}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-400 w-20 text-right">
                    {formatNumber(range.customers)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">51% convert within 3 days</p>
                  <p className="text-xs text-neutral-400">Focus retargeting on days 4-7 for maximum impact</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repeat Purchase Analysis */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Repeat Purchase by Segment</h2>
            <div className="space-y-4">
              {repeatPurchaseData.bySegment.map((segment) => (
                <div key={segment.segment} className="p-4 bg-neutral-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{segment.segment}</span>
                    <span className="text-green-400 font-bold">{segment.rate}%</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${segment.rate}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{formatNumber(segment.customers)} customers</span>
                    <span>Avg {segment.avgOrders} orders</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-neutral-800/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Avg time between purchases</span>
                <span className="text-white font-semibold">{repeatPurchaseData.overall.avgTimeBetween} months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Source Table */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-lg font-semibold text-white">Revenue by Traffic Source</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Source</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Visitors</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Orders</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Conv. Rate</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Revenue</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">% of Total</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {conversionBySource.map((source) => (
                  <tr key={source.source} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
                          {sourceIcons[source.source]}
                        </div>
                        <span className="font-medium text-white">{source.source}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-neutral-300">{formatNumber(source.visitors)}</td>
                    <td className="px-6 py-4 text-right text-neutral-300">{formatNumber(source.conversions)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-green-400 font-semibold">{source.rate}%</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-semibold">{formatCurrency(source.revenue)}</td>
                    <td className="px-6 py-4 text-right text-neutral-300">
                      {((source.revenue / totalRevenue) * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${source.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {source.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {source.trend >= 0 ? '+' : ''}{source.trend}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-800/50">
                  <td className="px-6 py-4 font-semibold text-white">Total</td>
                  <td className="px-6 py-4 text-right font-semibold text-white">{formatNumber(totalVisitors)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-white">{formatNumber(totalConversions)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-green-400">{overallConversionRate}%</td>
                  <td className="px-6 py-4 text-right font-semibold text-white">{formatCurrency(totalRevenue)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-white">100%</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-green-400 font-semibold">+8.2%</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
