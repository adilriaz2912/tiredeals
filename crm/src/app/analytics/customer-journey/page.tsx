'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  ArrowRight,
  Eye,
  Search,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  MousePointer,
  Zap,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Funnel stages
const funnelStages = [
  { stage: 'Site Visits', count: 125000, percentage: 100, icon: Eye },
  { stage: 'Product Views', count: 68500, percentage: 54.8, icon: Search },
  { stage: 'Add to Cart', count: 18200, percentage: 14.6, icon: ShoppingCart },
  { stage: 'Checkout Started', count: 12400, percentage: 9.9, icon: CreditCard },
  { stage: 'Purchase Complete', count: 8650, percentage: 6.9, icon: CheckCircle },
]

// Drop-off points
const dropOffPoints = [
  { from: 'Site Visits', to: 'Product Views', dropRate: 45.2, reason: 'Bounced without interaction', suggestion: 'Improve hero section CTAs' },
  { from: 'Product Views', to: 'Add to Cart', dropRate: 73.4, reason: 'Price comparison / research phase', suggestion: 'Add price match guarantee badge' },
  { from: 'Add to Cart', to: 'Checkout', dropRate: 31.9, reason: 'Shipping cost revealed', suggestion: 'Show shipping estimate earlier' },
  { from: 'Checkout', to: 'Purchase', dropRate: 30.2, reason: 'Payment friction', suggestion: 'Add more payment options' },
]

// Journey segments
const segments = [
  { name: 'Quick Buyers', percentage: 28, avgTime: '8 min', touchpoints: 1.5, conversion: 12.4, value: 485 },
  { name: 'Researchers', percentage: 45, avgTime: '3.2 days', touchpoints: 4.8, conversion: 8.2, value: 520 },
  { name: 'Price Shoppers', percentage: 18, avgTime: '5.5 days', touchpoints: 6.2, conversion: 5.1, value: 380 },
  { name: 'Brand Loyalists', percentage: 9, avgTime: '15 min', touchpoints: 2.1, conversion: 18.5, value: 680 },
]

// Key touchpoints
const touchpoints = [
  { touchpoint: 'Google Search', visits: 52000, conversions: 2850, rate: 5.5 },
  { touchpoint: 'Homepage', visits: 125000, conversions: 4200, rate: 3.4 },
  { touchpoint: 'Category Page', visits: 68000, conversions: 3100, rate: 4.6 },
  { touchpoint: 'Product Detail Page', visits: 45000, conversions: 5400, rate: 12.0 },
  { touchpoint: 'Size Finder Tool', visits: 28000, conversions: 2100, rate: 7.5 },
  { touchpoint: 'Cart Page', visits: 18200, conversions: 8650, rate: 47.5 },
]

// Stats
const stats = {
  avgConversionRate: 6.9,
  avgTimeToConvert: '2.4 days',
  avgTouchpoints: 3.8,
  cartAbandonment: 52.5,
}

export default function CustomerJourney() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      <Header
        title="Customer Journey Analytics"
        subtitle="Understand how customers navigate from discovery to purchase"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgConversionRate}%</p>
              <p className="text-sm text-neutral-400 mt-1">Conversion Rate</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <Clock className="w-6 h-6 text-green-300" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgTimeToConvert}</p>
              <p className="text-sm text-neutral-400 mt-1">Avg Time to Convert</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <MousePointer className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgTouchpoints}</p>
              <p className="text-sm text-neutral-400 mt-1">Avg Touchpoints</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-rose-500/20">
                <ShoppingCart className="w-6 h-6 text-rose-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.cartAbandonment}%</p>
              <p className="text-sm text-neutral-400 mt-1">Cart Abandonment</p>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Conversion Funnel
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              {funnelStages.map((stage, i) => {
                const Icon = stage.icon
                const width = Math.max(20, stage.percentage)

                return (
                  <div key={stage.stage} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-500 rounded-t-lg flex items-center justify-center py-8 relative"
                      style={{ opacity: 0.3 + (stage.percentage / 100) * 0.7 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-white">{stage.stage}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stage.count.toLocaleString()}</p>
                      <p className="text-sm text-neutral-400">{stage.percentage}%</p>
                    </div>
                    {i < funnelStages.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                        <ArrowRight className="w-6 h-6 text-neutral-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drop-off Analysis */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                Drop-off Analysis
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {dropOffPoints.map((point) => (
                <div key={point.from} className="p-4 bg-neutral-800/40 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">{point.from}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm text-white">{point.to}</span>
                    </div>
                    <span className="text-rose-400 font-semibold">-{point.dropRate}%</span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-2">{point.reason}</p>
                  <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-400">
                      💡 {point.suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Segments */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-green-300" />
                Journey Segments
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {segments.map((segment) => (
                <button
                  key={segment.name}
                  onClick={() => setSelectedSegment(selectedSegment === segment.name ? null : segment.name)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedSegment === segment.name
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-neutral-800/40 border-neutral-700/50 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">{segment.name}</span>
                    <span className="text-sm text-neutral-400">{segment.percentage}% of visitors</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-sm text-neutral-400">Avg Time</p>
                      <p className="font-semibold text-white">{segment.avgTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Touchpoints</p>
                      <p className="font-semibold text-white">{segment.touchpoints}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Conv Rate</p>
                      <p className="font-semibold text-green-400">{segment.conversion}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Avg Value</p>
                      <p className="font-semibold text-green-300">{formatCurrency(segment.value)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Touchpoint Performance */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50">
            <h2 className="text-lg font-semibold text-white">Touchpoint Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800/50">
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Touchpoint</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">Visits</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">Conversions</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">Conv Rate</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Performance</th>
                </tr>
              </thead>
              <tbody>
                {touchpoints.map((tp) => {
                  const maxRate = Math.max(...touchpoints.map(t => t.rate))

                  return (
                    <tr key={tp.touchpoint} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                      <td className="p-4 font-medium text-white">{tp.touchpoint}</td>
                      <td className="p-4 text-right text-neutral-300">{tp.visits.toLocaleString()}</td>
                      <td className="p-4 text-right text-neutral-300">{tp.conversions.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <span className={`font-semibold ${
                          tp.rate >= 10 ? 'text-green-400' :
                          tp.rate >= 5 ? 'text-green-300' :
                          'text-amber-400'
                        }`}>
                          {tp.rate}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(tp.rate / maxRate) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
