'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  TrendingUp,
  DollarSign,
  MousePointer,
  Eye,
  ShoppingCart,
  Target,
  Zap,
  ArrowRight,
  BarChart3,
  PieChart,
  RefreshCw,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Attribution models
const attributionModels = [
  { id: 'last_click', name: 'Last Click', description: '100% credit to final touchpoint' },
  { id: 'first_click', name: 'First Click', description: '100% credit to first touchpoint' },
  { id: 'linear', name: 'Linear', description: 'Equal credit across all touchpoints' },
  { id: 'time_decay', name: 'Time Decay', description: 'More credit to recent touchpoints' },
  { id: 'position', name: 'Position Based', description: '40% first, 40% last, 20% middle' },
  { id: 'data_driven', name: 'Data-Driven', description: 'ML-based attribution' },
]

// Channel performance by attribution model
const channelPerformance = {
  last_click: [
    { channel: 'Google Ads - Brand', conversions: 342, revenue: 125400, cost: 12500, roas: 10.03 },
    { channel: 'Google Ads - Non-Brand', conversions: 256, revenue: 89600, cost: 28400, roas: 3.15 },
    { channel: 'Organic Search', conversions: 428, revenue: 154080, cost: 0, roas: Infinity },
    { channel: 'Direct', conversions: 312, revenue: 112320, cost: 0, roas: Infinity },
    { channel: 'Facebook Ads', conversions: 145, revenue: 50750, cost: 15200, roas: 3.34 },
    { channel: 'Email', conversions: 198, revenue: 71280, cost: 2400, roas: 29.70 },
    { channel: 'Referral', conversions: 89, revenue: 35600, cost: 5800, roas: 6.14 },
  ],
  data_driven: [
    { channel: 'Google Ads - Brand', conversions: 285, revenue: 104500, cost: 12500, roas: 8.36 },
    { channel: 'Google Ads - Non-Brand', conversions: 312, revenue: 109200, cost: 28400, roas: 3.85 },
    { channel: 'Organic Search', conversions: 380, revenue: 136800, cost: 0, roas: Infinity },
    { channel: 'Direct', conversions: 245, revenue: 88200, cost: 0, roas: Infinity },
    { channel: 'Facebook Ads', conversions: 198, revenue: 69300, cost: 15200, roas: 4.56 },
    { channel: 'Email', conversions: 245, revenue: 88200, cost: 2400, roas: 36.75 },
    { channel: 'Referral', conversions: 105, revenue: 42000, cost: 5800, roas: 7.24 },
  ],
}

// Customer journey paths
const journeyPaths = [
  { path: ['Google Ads', 'Email', 'Direct'], conversions: 145, revenue: 52200, avgDays: 12 },
  { path: ['Organic', 'Direct'], conversions: 234, revenue: 84240, avgDays: 5 },
  { path: ['Facebook', 'Google Ads', 'Direct'], conversions: 89, revenue: 32040, avgDays: 18 },
  { path: ['Direct'], conversions: 178, revenue: 64080, avgDays: 1 },
  { path: ['Google Ads', 'Organic', 'Email', 'Direct'], conversions: 67, revenue: 24120, avgDays: 21 },
  { path: ['Referral', 'Direct'], conversions: 56, revenue: 22400, avgDays: 3 },
]

// Stats
const stats = {
  totalRevenue: 639230,
  totalConversions: 1770,
  avgTouchpoints: 2.4,
  avgDaysToConvert: 8.5,
}

export default function Attribution() {
  const [selectedModel, setSelectedModel] = useState('data_driven')
  const currentData = selectedModel === 'data_driven'
    ? channelPerformance.data_driven
    : channelPerformance.last_click

  return (
    <div className="min-h-screen">
      <Header
        title="Attribution Modeling"
        subtitle="Understand which marketing channels drive conversions"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-neutral-400 mt-1">Total Revenue (30d)</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <ShoppingCart className="w-6 h-6 text-green-300" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.totalConversions.toLocaleString()}</p>
              <p className="text-sm text-neutral-400 mt-1">Conversions</p>
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
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgDaysToConvert}</p>
              <p className="text-sm text-neutral-400 mt-1">Avg Days to Convert</p>
            </div>
          </div>
        </div>

        {/* Attribution Model Selector */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50">
            <h2 className="text-lg font-semibold text-white">Attribution Model</h2>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {attributionModels.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedModel === model.id
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-neutral-800/40 border-neutral-700/50 hover:border-neutral-600'
                }`}
              >
                <p className={`font-medium text-sm ${
                  selectedModel === model.id ? 'text-green-400' : 'text-white'
                }`}>
                  {model.name}
                </p>
                <p className="text-xs text-neutral-500 mt-1">{model.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-300" />
              Channel Performance
            </h2>
            <span className="text-sm text-neutral-400">Model: {attributionModels.find(m => m.id === selectedModel)?.name}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800/50">
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Channel</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">Conversions</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">Revenue</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">Cost</th>
                  <th className="text-right p-4 text-sm font-medium text-neutral-400">ROAS</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Performance</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((channel) => {
                  const maxRevenue = Math.max(...currentData.map(c => c.revenue))
                  const barWidth = (channel.revenue / maxRevenue) * 100

                  return (
                    <tr key={channel.channel} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                      <td className="p-4 font-medium text-white">{channel.channel}</td>
                      <td className="p-4 text-right text-neutral-300">{channel.conversions}</td>
                      <td className="p-4 text-right text-green-400 font-semibold">{formatCurrency(channel.revenue)}</td>
                      <td className="p-4 text-right text-neutral-300">
                        {channel.cost > 0 ? formatCurrency(channel.cost) : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-semibold ${
                          channel.roas === Infinity ? 'text-green-400' :
                          channel.roas >= 5 ? 'text-green-400' :
                          channel.roas >= 3 ? 'text-green-300' :
                          'text-amber-400'
                        }`}>
                          {channel.roas === Infinity ? 'Organic' : `${channel.roas.toFixed(2)}x`}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${barWidth}%` }}
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

        {/* Top Conversion Paths */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Top Conversion Paths
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {journeyPaths.map((journey, i) => (
              <div key={i} className="p-4 bg-neutral-800/40 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  {journey.path.map((step, j) => (
                    <div key={j} className="flex items-center">
                      <span className="px-3 py-1.5 bg-neutral-700 text-white text-sm rounded-lg">
                        {step}
                      </span>
                      {j < journey.path.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-neutral-500 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-neutral-400">
                    <span className="text-white font-medium">{journey.conversions}</span> conversions
                  </span>
                  <span className="text-neutral-400">
                    <span className="text-green-400 font-medium">{formatCurrency(journey.revenue)}</span> revenue
                  </span>
                  <span className="text-neutral-400">
                    <span className="text-green-300 font-medium">{journey.avgDays}</span> avg days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
