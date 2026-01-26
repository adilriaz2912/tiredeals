'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Globe,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Market share data
const marketShare = [
  { competitor: 'TireDeals (Us)', share: 8.2, lastYear: 6.8, color: 'emerald' },
  { competitor: 'SimpleTire', share: 18.5, lastYear: 19.2, color: 'slate' },
  { competitor: 'TireRack', share: 22.4, lastYear: 23.1, color: 'slate' },
  { competitor: 'Discount Tire Direct', share: 15.8, lastYear: 15.2, color: 'slate' },
  { competitor: 'Tire Buyer', share: 6.4, lastYear: 7.1, color: 'slate' },
  { competitor: 'Amazon Tires', share: 12.3, lastYear: 10.8, color: 'slate' },
  { competitor: 'Others', share: 16.4, lastYear: 17.8, color: 'slate' },
]

// Competitive metrics
const competitiveMetrics = [
  {
    metric: 'Average Price',
    us: 168,
    simpleTire: 172,
    tireRack: 185,
    discountTire: 165,
    advantage: 'us',
  },
  {
    metric: 'Avg Shipping Time',
    us: '2.8 days',
    simpleTire: '3.2 days',
    tireRack: '2.5 days',
    discountTire: '3.5 days',
    advantage: 'tireRack',
  },
  {
    metric: 'Free Shipping Threshold',
    us: '$99',
    simpleTire: '$150',
    tireRack: 'All Orders',
    discountTire: '$200',
    advantage: 'tireRack',
  },
  {
    metric: 'Installer Network',
    us: '2,400+',
    simpleTire: '3,800+',
    tireRack: '8,500+',
    discountTire: '1,100+',
    advantage: 'tireRack',
  },
  {
    metric: 'Customer Rating',
    us: '4.7/5',
    simpleTire: '4.4/5',
    tireRack: '4.6/5',
    discountTire: '4.3/5',
    advantage: 'us',
  },
]

// Share by segment
const segmentShare = [
  { segment: 'Passenger Tires', us: 9.2, leader: 'TireRack', leaderShare: 24.5 },
  { segment: 'SUV/Light Truck', us: 7.8, leader: 'Discount Tire', leaderShare: 19.8 },
  { segment: 'Performance', us: 5.4, leader: 'TireRack', leaderShare: 28.2 },
  { segment: 'Winter Tires', us: 11.2, leader: 'TireRack', leaderShare: 22.1 },
  { segment: 'Off-Road', us: 4.2, leader: 'SimpleTire', leaderShare: 21.5 },
]

// Regional share
const regionalShare = [
  { region: 'Northeast', us: 7.5, topCompetitor: 'TireRack', competitorShare: 26.2 },
  { region: 'Southeast', us: 10.8, topCompetitor: 'Discount Tire', competitorShare: 18.5 },
  { region: 'Midwest', us: 6.9, topCompetitor: 'TireRack', competitorShare: 24.8 },
  { region: 'Southwest', us: 9.4, topCompetitor: 'Discount Tire', competitorShare: 22.1 },
  { region: 'West', us: 8.1, topCompetitor: 'SimpleTire', competitorShare: 19.2 },
]

// Stats
const stats = {
  currentShare: 8.2,
  shareGrowth: 1.4,
  marketSize: '12.4B',
  ourRevenue: '1.02B',
}

export default function MarketShare() {
  const [view, setView] = useState<'overall' | 'segment' | 'regional'>('overall')

  return (
    <div className="min-h-screen">
      <Header
        title="Market Share Tracker"
        subtitle="Monitor competitive positioning and market dynamics"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 border-2 border-green-500/30 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <PieChart className="w-6 h-6 text-green-400" />
              </div>
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                +{stats.shareGrowth}%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.currentShare}%</p>
              <p className="text-sm text-neutral-400 mt-1">Our Market Share</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <Globe className="w-6 h-6 text-green-300" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">${stats.marketSize}</p>
              <p className="text-sm text-neutral-400 mt-1">Total Market Size</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">${stats.ourRevenue}</p>
              <p className="text-sm text-neutral-400 mt-1">Our Revenue (Est.)</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">#4</p>
              <p className="text-sm text-neutral-400 mt-1">Industry Ranking</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          {(['overall', 'segment', 'regional'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === v
                  ? 'bg-green-500 text-white'
                  : 'bg-neutral-800/50 text-neutral-400 hover:text-white'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)} View
            </button>
          ))}
        </div>

        {view === 'overall' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Share Chart */}
            <div className="card">
              <div className="px-6 py-4 border-b border-neutral-800/50">
                <h2 className="text-lg font-semibold text-white">Market Share Distribution</h2>
              </div>
              <div className="p-6 space-y-4">
                {marketShare.map((company) => {
                  const change = company.share - company.lastYear
                  const isUs = company.competitor.includes('Us')

                  return (
                    <div key={company.competitor}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium ${isUs ? 'text-green-400' : 'text-white'}`}>
                          {company.competitor}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm flex items-center gap-1 ${
                            change > 0 ? 'text-green-400' : change < 0 ? 'text-rose-400' : 'text-neutral-400'
                          }`}>
                            {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : change < 0 ? <ArrowDownRight className="w-3 h-3" /> : null}
                            {change > 0 ? '+' : ''}{change.toFixed(1)}%
                          </span>
                          <span className={`font-semibold ${isUs ? 'text-green-400' : 'text-white'}`}>
                            {company.share}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isUs ? 'bg-green-500' : 'bg-neutral-600'
                          }`}
                          style={{ width: `${(company.share / 25) * 100}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Competitive Metrics */}
            <div className="card">
              <div className="px-6 py-4 border-b border-neutral-800/50">
                <h2 className="text-lg font-semibold text-white">Competitive Comparison</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800/50">
                      <th className="text-left p-3 text-sm font-medium text-neutral-400">Metric</th>
                      <th className="text-center p-3 text-sm font-medium text-green-400">Us</th>
                      <th className="text-center p-3 text-sm font-medium text-neutral-400">SimpleTire</th>
                      <th className="text-center p-3 text-sm font-medium text-neutral-400">TireRack</th>
                      <th className="text-center p-3 text-sm font-medium text-neutral-400">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveMetrics.map((row) => (
                      <tr key={row.metric} className="border-b border-neutral-800/30">
                        <td className="p-3 text-sm text-white">{row.metric}</td>
                        <td className={`p-3 text-center text-sm font-medium ${
                          row.advantage === 'us' ? 'text-green-400 bg-green-500/10' : 'text-neutral-300'
                        }`}>
                          {typeof row.us === 'number' ? `$${row.us}` : row.us}
                        </td>
                        <td className="p-3 text-center text-sm text-neutral-300">
                          {typeof row.simpleTire === 'number' ? `$${row.simpleTire}` : row.simpleTire}
                        </td>
                        <td className={`p-3 text-center text-sm font-medium ${
                          row.advantage === 'tireRack' ? 'text-amber-400 bg-amber-500/10' : 'text-neutral-300'
                        }`}>
                          {typeof row.tireRack === 'number' ? `$${row.tireRack}` : row.tireRack}
                        </td>
                        <td className="p-3 text-center text-sm text-neutral-300">
                          {typeof row.discountTire === 'number' ? `$${row.discountTire}` : row.discountTire}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {view === 'segment' && (
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white">Market Share by Segment</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {segmentShare.map((seg) => (
                <div key={seg.segment} className="p-4 bg-neutral-800/40 rounded-xl">
                  <h3 className="font-medium text-white mb-4">{seg.segment}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-400">TireDeals</span>
                        <span className="text-green-400 font-semibold">{seg.us}%</span>
                      </div>
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${(seg.us / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-400">{seg.leader} (Leader)</span>
                        <span className="text-neutral-300 font-semibold">{seg.leaderShare}%</span>
                      </div>
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-500"
                          style={{ width: `${(seg.leaderShare / 30) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'regional' && (
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white">Regional Market Share</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800/50">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Region</th>
                    <th className="text-center p-4 text-sm font-medium text-neutral-400">Our Share</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Top Competitor</th>
                    <th className="text-center p-4 text-sm font-medium text-neutral-400">Their Share</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalShare.map((reg) => {
                    const gap = reg.competitorShare - reg.us

                    return (
                      <tr key={reg.region} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                        <td className="p-4 font-medium text-white">{reg.region}</td>
                        <td className="p-4 text-center">
                          <span className="text-green-400 font-semibold">{reg.us}%</span>
                        </td>
                        <td className="p-4 text-neutral-300">{reg.topCompetitor}</td>
                        <td className="p-4 text-center text-neutral-300">{reg.competitorShare}%</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-rose-500"
                                style={{ width: `${(gap / 30) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-rose-400">-{gap.toFixed(1)}%</span>
                          </div>
                        </td>
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
