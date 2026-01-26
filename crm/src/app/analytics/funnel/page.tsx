'use client'

import { Header } from '@/components/layout/Header'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Search,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

// Mock data
const funnelStages = [
  { stage: 'Site Visitors', count: 122130, icon: Eye },
  { stage: 'Product Views', count: 68450, icon: Search },
  { stage: 'Add to Cart', count: 18920, icon: ShoppingCart },
  { stage: 'Checkout Started', count: 12340, icon: CreditCard },
  { stage: 'Purchase Complete', count: 4588, icon: CheckCircle },
]

const dropOffAnalysis = [
  {
    from: 'Site Visitors',
    to: 'Product Views',
    dropOff: 43.9,
    lost: 53680,
    reasons: [
      { reason: 'Bounced from homepage', percentage: 38 },
      { reason: 'Left after category page', percentage: 32 },
      { reason: 'No matching tires found', percentage: 18 },
      { reason: 'Price comparison exit', percentage: 12 },
    ]
  },
  {
    from: 'Product Views',
    to: 'Add to Cart',
    dropOff: 72.4,
    lost: 49530,
    reasons: [
      { reason: 'Price too high', percentage: 35 },
      { reason: 'Comparing options', percentage: 28 },
      { reason: 'Fitment uncertainty', percentage: 22 },
      { reason: 'Out of stock', percentage: 15 },
    ]
  },
  {
    from: 'Add to Cart',
    to: 'Checkout Started',
    dropOff: 34.8,
    lost: 6580,
    reasons: [
      { reason: 'Shipping cost surprise', percentage: 42 },
      { reason: 'Just browsing/saving for later', percentage: 28 },
      { reason: 'Looking for coupon', percentage: 18 },
      { reason: 'Distracted/abandoned', percentage: 12 },
    ]
  },
  {
    from: 'Checkout Started',
    to: 'Purchase Complete',
    dropOff: 62.8,
    lost: 7752,
    reasons: [
      { reason: 'Payment declined', percentage: 25 },
      { reason: 'Long form/friction', percentage: 24 },
      { reason: 'Installation scheduling', percentage: 22 },
      { reason: 'Wanted different payment method', percentage: 18 },
      { reason: 'Security concerns', percentage: 11 },
    ]
  },
]

const deviceFunnel = [
  {
    device: 'Desktop',
    icon: Monitor,
    visitors: 58624,
    cartRate: 18.2,
    checkoutRate: 72.1,
    purchaseRate: 42.5,
    conversionRate: 5.2,
  },
  {
    device: 'Mobile',
    icon: Smartphone,
    visitors: 52043,
    cartRate: 12.8,
    checkoutRate: 58.4,
    purchaseRate: 31.2,
    conversionRate: 2.3,
  },
  {
    device: 'Tablet',
    icon: Tablet,
    visitors: 11463,
    cartRate: 15.4,
    checkoutRate: 65.3,
    purchaseRate: 38.6,
    conversionRate: 3.9,
  },
]

const weeklyTrend = [
  { week: 'Week 1', cartRate: 15.2, checkoutRate: 63.5, purchaseRate: 35.8 },
  { week: 'Week 2', cartRate: 15.8, checkoutRate: 64.2, purchaseRate: 36.4 },
  { week: 'Week 3', cartRate: 15.5, checkoutRate: 65.8, purchaseRate: 37.2 },
  { week: 'Week 4', cartRate: 16.1, checkoutRate: 66.4, purchaseRate: 38.5 },
]

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export default function FunnelAnalysisPage() {
  const overallConversion = ((funnelStages[4].count / funnelStages[0].count) * 100).toFixed(2)

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Cart-to-Purchase Funnel"
        subtitle="Analyze conversion at each stage of the buying journey"
      />

      <div className="p-6 space-y-6">
        {/* Funnel Visualization */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-white">Conversion Funnel</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-400">Overall Conversion:</span>
              <span className="text-green-400 font-bold text-lg">{overallConversion}%</span>
            </div>
          </div>

          <div className="relative">
            {/* Funnel stages */}
            <div className="flex flex-col items-center space-y-2">
              {funnelStages.map((stage, index) => {
                const Icon = stage.icon
                const widthPercentage = 100 - (index * 15)
                const prevCount = index > 0 ? funnelStages[index - 1].count : stage.count
                const conversionFromPrev = index > 0 ? ((stage.count / prevCount) * 100).toFixed(1) : '100'

                return (
                  <div key={stage.stage} className="w-full flex flex-col items-center">
                    <div
                      className="relative py-4 px-6 bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-500/30 rounded-xl transition-all hover:from-green-500/30 hover:to-green-400/20"
                      style={{ width: `${widthPercentage}%` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{stage.stage}</p>
                            <p className="text-2xl font-bold text-green-400">{formatNumber(stage.count)}</p>
                          </div>
                        </div>
                        {index > 0 && (
                          <div className="text-right">
                            <p className="text-xs text-neutral-500">from previous</p>
                            <p className="text-lg font-bold text-white">{conversionFromPrev}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < funnelStages.length - 1 && (
                      <div className="h-4 w-0.5 bg-green-500/30" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Drop-off Analysis */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Drop-off Analysis</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dropOffAnalysis.map((analysis) => (
              <div key={analysis.from} className="bg-neutral-800/50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white font-medium">{analysis.from}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                  <span className="text-white font-medium">{analysis.to}</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="h-3 bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${analysis.dropOff}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-red-400 font-bold">{analysis.dropOff}% drop</span>
                </div>

                <p className="text-sm text-neutral-400 mb-3">
                  <span className="text-red-400 font-semibold">{formatNumber(analysis.lost)}</span> users lost
                </p>

                <div className="space-y-2">
                  <p className="text-xs text-neutral-500 uppercase font-semibold">Top Reasons</p>
                  {analysis.reasons.map((reason) => (
                    <div key={reason.reason} className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500/60 rounded-full"
                          style={{ width: `${reason.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-400 w-8">{reason.percentage}%</span>
                      <span className="text-xs text-neutral-300 flex-1">{reason.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Comparison */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Funnel by Device</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Device</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Visitors</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Add to Cart</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Start Checkout</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Complete Purchase</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {deviceFunnel.map((device) => {
                  const Icon = device.icon
                  return (
                    <tr key={device.device} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-neutral-400" />
                          </div>
                          <span className="font-medium text-white">{device.device}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-neutral-300">{formatNumber(device.visitors)}</td>
                      <td className="px-4 py-4 text-right">
                        <span className={device.cartRate >= 15 ? 'text-green-400' : 'text-amber-400'}>
                          {device.cartRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={device.checkoutRate >= 65 ? 'text-green-400' : 'text-amber-400'}>
                          {device.checkoutRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={device.purchaseRate >= 35 ? 'text-green-400' : 'text-amber-400'}>
                          {device.purchaseRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={`font-bold ${device.conversionRate >= 4 ? 'text-green-400' : 'text-amber-400'}`}>
                          {device.conversionRate}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Mobile conversion is 56% lower than desktop</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Consider optimizing mobile checkout flow, reducing form fields, and adding mobile payment options (Apple Pay, Google Pay)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">4-Week Trend</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {weeklyTrend.map((week, index) => {
              const prevWeek = index > 0 ? weeklyTrend[index - 1] : null
              const cartTrend = prevWeek ? week.cartRate - prevWeek.cartRate : 0
              const purchaseTrend = prevWeek ? week.purchaseRate - prevWeek.purchaseRate : 0

              return (
                <div key={week.week} className="bg-neutral-800/50 rounded-xl p-4">
                  <p className="text-sm text-neutral-400 mb-3">{week.week}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Cart Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{week.cartRate}%</span>
                        {cartTrend !== 0 && (
                          <span className={`text-xs ${cartTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {cartTrend > 0 ? '+' : ''}{cartTrend.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Checkout Rate</span>
                      <span className="text-white font-semibold">{week.checkoutRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">Purchase Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-semibold">{week.purchaseRate}%</span>
                        {purchaseTrend !== 0 && (
                          <span className={`text-xs ${purchaseTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {purchaseTrend > 0 ? '+' : ''}{purchaseTrend.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-neutral-300">Purchase rate up <span className="text-green-400 font-semibold">+2.7%</span> this month</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-neutral-300">Checkout rate up <span className="text-green-400 font-semibold">+2.9%</span> this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
