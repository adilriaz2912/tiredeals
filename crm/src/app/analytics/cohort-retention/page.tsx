'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowRight,
  DollarSign,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Cohort data - monthly cohorts with retention rates
const cohortData = [
  {
    cohort: 'Jan 2024',
    customers: 485,
    retention: [100, 68, 52, 45, 41, 38, 35, 33, 31, 29, 28, 27],
    revenue: [48500, 32980, 25220, 21825, 19885, 18430, 16975, 16005, 15035, 14065, 13580, 13095],
  },
  {
    cohort: 'Feb 2024',
    customers: 512,
    retention: [100, 71, 55, 48, 43, 40, 37, 35, 32, 30, 29],
    revenue: [51200, 36352, 28160, 24576, 22016, 20480, 18944, 17920, 16384, 15360, 14848],
  },
  {
    cohort: 'Mar 2024',
    customers: 478,
    retention: [100, 65, 50, 42, 38, 35, 32, 30, 28, 26],
    revenue: [47800, 31070, 23900, 20076, 18164, 16730, 15296, 14340, 13384, 12428],
  },
  {
    cohort: 'Apr 2024',
    customers: 534,
    retention: [100, 72, 56, 49, 44, 41, 38, 35, 33],
    revenue: [53400, 38448, 29904, 26166, 23496, 21894, 20292, 18690, 17622],
  },
  {
    cohort: 'May 2024',
    customers: 498,
    retention: [100, 69, 53, 46, 42, 39, 36, 34],
    revenue: [49800, 34362, 26394, 22908, 20916, 19422, 17928, 16932],
  },
  {
    cohort: 'Jun 2024',
    customers: 521,
    retention: [100, 74, 58, 51, 46, 43, 40],
    revenue: [52100, 38554, 30218, 26571, 23966, 22403, 20840],
  },
  {
    cohort: 'Jul 2024',
    customers: 489,
    retention: [100, 70, 54, 47, 42, 39],
    revenue: [48900, 34230, 26406, 22983, 20538, 19071],
  },
  {
    cohort: 'Aug 2024',
    customers: 556,
    retention: [100, 73, 57, 50, 45],
    revenue: [55600, 40588, 31692, 27800, 25020],
  },
  {
    cohort: 'Sep 2024',
    customers: 523,
    retention: [100, 71, 55, 48],
    revenue: [52300, 37133, 28765, 25104],
  },
  {
    cohort: 'Oct 2024',
    customers: 548,
    retention: [100, 75, 59],
    revenue: [54800, 41100, 32332],
  },
  {
    cohort: 'Nov 2024',
    customers: 512,
    retention: [100, 72],
    revenue: [51200, 36864],
  },
  {
    cohort: 'Dec 2024',
    customers: 534,
    retention: [100],
    revenue: [53400],
  },
]

// Acquisition channel breakdown
const channelRetention = [
  { channel: 'Google Ads', month1: 72, month3: 54, month6: 38, month12: 28, avgClv: 485 },
  { channel: 'Organic Search', month1: 78, month3: 62, month6: 48, month12: 38, avgClv: 620 },
  { channel: 'Direct', month1: 82, month3: 68, month6: 55, month12: 45, avgClv: 780 },
  { channel: 'Referral', month1: 85, month3: 72, month6: 62, month12: 52, avgClv: 920 },
  { channel: 'Social Media', month1: 65, month3: 45, month6: 32, month12: 22, avgClv: 340 },
  { channel: 'Email', month1: 75, month3: 58, month6: 45, month12: 35, avgClv: 550 },
]

// Stats
const stats = {
  avgRetention30: 71,
  avgRetention90: 54,
  avgRetention180: 40,
  avgRetention365: 32,
  totalCohorts: 12,
  bestCohort: 'Jun 2024',
}

export default function CohortRetention() {
  const [viewMode, setViewMode] = useState<'retention' | 'revenue'>('retention')

  const getRetentionColor = (value: number) => {
    if (value >= 70) return 'bg-emerald-500'
    if (value >= 50) return 'bg-cyan-500'
    if (value >= 30) return 'bg-amber-500'
    return 'bg-rose-500'
  }

  const getRetentionBgColor = (value: number) => {
    if (value >= 70) return 'bg-emerald-500/20'
    if (value >= 50) return 'bg-cyan-500/20'
    if (value >= 30) return 'bg-amber-500/20'
    return 'bg-rose-500/20'
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Cohort Retention Analysis"
        subtitle="Track customer retention by acquisition cohort over time"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgRetention30}%</p>
              <p className="text-sm text-slate-400 mt-1">30-Day Retention</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Calendar className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgRetention90}%</p>
              <p className="text-sm text-slate-400 mt-1">90-Day Retention</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <TrendingDown className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgRetention365}%</p>
              <p className="text-sm text-slate-400 mt-1">12-Month Retention</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-violet-500/20">
                <DollarSign className="w-6 h-6 text-violet-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.bestCohort}</p>
              <p className="text-sm text-slate-400 mt-1">Best Performing Cohort</p>
            </div>
          </div>
        </div>

        {/* Cohort Table */}
        <div className="card">
          <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Cohort Retention Matrix</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('retention')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'retention'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Retention %
              </button>
              <button
                onClick={() => setViewMode('revenue')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'revenue'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left p-4 text-sm font-medium text-slate-400 sticky left-0 bg-slate-900">Cohort</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Size</th>
                  {[...Array(12)].map((_, i) => (
                    <th key={i} className="text-center p-3 text-sm font-medium text-slate-400">
                      M{i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortData.map((cohort) => (
                  <tr key={cohort.cohort} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                    <td className="p-4 font-medium text-white sticky left-0 bg-slate-900">{cohort.cohort}</td>
                    <td className="text-center p-4 text-slate-300">{cohort.customers}</td>
                    {[...Array(12)].map((_, i) => {
                      const value = viewMode === 'retention' ? cohort.retention[i] : cohort.revenue[i]
                      if (value === undefined) {
                        return <td key={i} className="p-3" />
                      }
                      return (
                        <td key={i} className="p-2">
                          <div
                            className={`py-2 px-1 rounded text-center text-xs font-medium ${
                              viewMode === 'retention'
                                ? getRetentionBgColor(value)
                                : 'bg-slate-800/60'
                            } ${
                              viewMode === 'retention'
                                ? value >= 50 ? 'text-white' : 'text-slate-300'
                                : 'text-slate-300'
                            }`}
                          >
                            {viewMode === 'retention' ? `${value}%` : `$${(value / 1000).toFixed(1)}k`}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 border-t border-slate-800/50 flex items-center gap-6">
            <span className="text-sm text-slate-400">Retention:</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded bg-emerald-500" /> 70%+
              </span>
              <span className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded bg-cyan-500" /> 50-69%
              </span>
              <span className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded bg-amber-500" /> 30-49%
              </span>
              <span className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded bg-rose-500" /> &lt;30%
              </span>
            </div>
          </div>
        </div>

        {/* Channel Retention */}
        <div className="card">
          <div className="px-6 py-4 border-b border-slate-800/50">
            <h2 className="text-lg font-semibold text-white">Retention by Acquisition Channel</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Channel</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Month 1</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Month 3</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Month 6</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Month 12</th>
                  <th className="text-center p-4 text-sm font-medium text-slate-400">Avg CLV</th>
                </tr>
              </thead>
              <tbody>
                {channelRetention.map((channel) => (
                  <tr key={channel.channel} className="border-b border-slate-800/30 hover:bg-slate-800/30">
                    <td className="p-4 font-medium text-white">{channel.channel}</td>
                    <td className="p-4 text-center">
                      <span className={`${channel.month1 >= 70 ? 'text-emerald-400' : channel.month1 >= 50 ? 'text-cyan-400' : 'text-amber-400'}`}>
                        {channel.month1}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`${channel.month3 >= 60 ? 'text-emerald-400' : channel.month3 >= 40 ? 'text-cyan-400' : 'text-amber-400'}`}>
                        {channel.month3}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`${channel.month6 >= 50 ? 'text-emerald-400' : channel.month6 >= 30 ? 'text-cyan-400' : 'text-amber-400'}`}>
                        {channel.month6}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`${channel.month12 >= 40 ? 'text-emerald-400' : channel.month12 >= 25 ? 'text-cyan-400' : 'text-amber-400'}`}>
                        {channel.month12}%
                      </span>
                    </td>
                    <td className="p-4 text-center text-emerald-400 font-semibold">
                      {formatCurrency(channel.avgClv)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
