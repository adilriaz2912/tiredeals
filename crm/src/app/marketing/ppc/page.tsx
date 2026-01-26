'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  MousePointer,
  Eye,
  DollarSign,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Settings,
  Download,
  RefreshCw,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'ended'
  type: 'search' | 'display' | 'shopping' | 'performance_max'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  cpc: number
  ctr: number
  roas: number
}

interface Keyword {
  keyword: string
  matchType: 'exact' | 'phrase' | 'broad'
  impressions: number
  clicks: number
  ctr: number
  cpc: number
  conversions: number
  cost: number
  qualityScore: number
}

// Mock data
const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Brand - TireDeals',
    status: 'active',
    type: 'search',
    budget: 150,
    spent: 142.50,
    impressions: 28500,
    clicks: 2850,
    conversions: 142,
    revenue: 22680,
    cpc: 0.05,
    ctr: 10.0,
    roas: 15.9,
  },
  {
    id: '2',
    name: 'Non-Brand - Winter Tires',
    status: 'active',
    type: 'search',
    budget: 500,
    spent: 485.20,
    impressions: 125000,
    clicks: 3750,
    conversions: 89,
    revenue: 14230,
    cpc: 0.13,
    ctr: 3.0,
    roas: 2.9,
  },
  {
    id: '3',
    name: 'Non-Brand - All Season Tires',
    status: 'active',
    type: 'search',
    budget: 400,
    spent: 378.40,
    impressions: 98000,
    clicks: 2940,
    conversions: 62,
    revenue: 9920,
    cpc: 0.13,
    ctr: 3.0,
    roas: 2.6,
  },
  {
    id: '4',
    name: 'Shopping - All Products',
    status: 'active',
    type: 'shopping',
    budget: 800,
    spent: 756.80,
    impressions: 450000,
    clicks: 8500,
    conversions: 156,
    revenue: 24960,
    cpc: 0.09,
    ctr: 1.9,
    roas: 3.3,
  },
  {
    id: '5',
    name: 'Performance Max - Tires',
    status: 'active',
    type: 'performance_max',
    budget: 600,
    spent: 542.30,
    impressions: 380000,
    clicks: 5700,
    conversions: 98,
    revenue: 15680,
    cpc: 0.10,
    ctr: 1.5,
    roas: 2.9,
  },
  {
    id: '6',
    name: 'Remarketing - Cart Abandoners',
    status: 'active',
    type: 'display',
    budget: 200,
    spent: 185.60,
    impressions: 520000,
    clicks: 1560,
    conversions: 48,
    revenue: 7680,
    cpc: 0.12,
    ctr: 0.3,
    roas: 4.1,
  },
  {
    id: '7',
    name: 'Competitor - SimpleTire',
    status: 'paused',
    type: 'search',
    budget: 300,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    cpc: 0,
    ctr: 0,
    roas: 0,
  },
]

const topKeywords: Keyword[] = [
  { keyword: 'tiredeals', matchType: 'exact', impressions: 15000, clicks: 1500, ctr: 10.0, cpc: 0.05, conversions: 75, cost: 75, qualityScore: 10 },
  { keyword: 'buy tires online', matchType: 'phrase', impressions: 45000, clicks: 900, ctr: 2.0, cpc: 0.85, conversions: 18, cost: 765, qualityScore: 7 },
  { keyword: 'winter tires sale', matchType: 'broad', impressions: 32000, clicks: 640, ctr: 2.0, cpc: 0.72, conversions: 15, cost: 460.80, qualityScore: 6 },
  { keyword: 'michelin tires price', matchType: 'phrase', impressions: 28000, clicks: 560, ctr: 2.0, cpc: 0.68, conversions: 12, cost: 380.80, qualityScore: 8 },
  { keyword: 'cheap tires near me', matchType: 'broad', impressions: 52000, clicks: 520, ctr: 1.0, cpc: 0.45, conversions: 8, cost: 234, qualityScore: 5 },
  { keyword: 'goodyear tires', matchType: 'exact', impressions: 18000, clicks: 450, ctr: 2.5, cpc: 0.55, conversions: 11, cost: 247.50, qualityScore: 7 },
]

const stats = {
  totalSpend: 2490.80,
  totalRevenue: 95150,
  totalConversions: 595,
  avgRoas: 3.8,
  totalImpressions: 1601500,
  totalClicks: 25300,
  avgCpc: 0.10,
  avgCtr: 1.6,
}

const dailyTrend = [
  { day: 'Mon', spend: 320, revenue: 1280, conversions: 78 },
  { day: 'Tue', spend: 345, revenue: 1450, conversions: 85 },
  { day: 'Wed', spend: 380, revenue: 1520, conversions: 92 },
  { day: 'Thu', spend: 365, revenue: 1420, conversions: 88 },
  { day: 'Fri', spend: 410, revenue: 1680, conversions: 98 },
  { day: 'Sat', spend: 385, revenue: 1540, conversions: 90 },
  { day: 'Sun', spend: 285, revenue: 1260, conversions: 74 },
]

export default function PPCAnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [activeTab, setActiveTab] = useState<'campaigns' | 'keywords'>('campaigns')

  return (
    <div className="min-h-screen">
      <Header
        title="Google Ads Analytics"
        subtitle="PPC campaign performance and optimization insights"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input w-40"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button className="btn btn-secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync
            </button>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Account Status */}
        <div className="card p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Google Ads Connected</p>
                <p className="text-sm text-green-700">Account ID: 123-456-7890 • Last synced: 5 minutes ago</p>
              </div>
            </div>
            <a
              href="https://ads.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm"
            >
              Open Google Ads
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <StatCard title="Spend" value={formatCurrency(stats.totalSpend)} />
          <StatCard title="Revenue" value={formatCurrency(stats.totalRevenue)} />
          <StatCard title="ROAS" value={`${stats.avgRoas}x`} highlight />
          <StatCard title="Conversions" value={formatNumber(stats.totalConversions)} />
          <StatCard title="Impressions" value={`${(stats.totalImpressions / 1000000).toFixed(1)}M`} />
          <StatCard title="Clicks" value={formatNumber(stats.totalClicks)} />
          <StatCard title="Avg CPC" value={formatCurrency(stats.avgCpc)} />
          <StatCard title="CTR" value={`${stats.avgCtr}%`} />
        </div>

        {/* Performance Chart */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Daily Performance</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Spend
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Revenue
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="h-48 flex items-end justify-between gap-4">
              {dailyTrend.map((day) => {
                const maxRevenue = Math.max(...dailyTrend.map(d => d.revenue))
                const revenueHeight = (day.revenue / maxRevenue) * 100
                const spendHeight = (day.spend / maxRevenue) * 100

                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs text-green-600 font-medium">${day.revenue}</div>
                    <div className="w-full flex gap-1 items-end" style={{ height: '120px' }}>
                      <div
                        className="flex-1 bg-red-400 rounded-t"
                        style={{ height: `${spendHeight}%` }}
                      />
                      <div
                        className="flex-1 bg-green-500 rounded-t"
                        style={{ height: `${revenueHeight}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">{day.day}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'campaigns'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'keywords'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              Keywords
            </button>
          </nav>
        </div>

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th className="text-right">Budget</th>
                    <th className="text-right">Spend</th>
                    <th className="text-right">Impr.</th>
                    <th className="text-right">Clicks</th>
                    <th className="text-right">CTR</th>
                    <th className="text-right">CPC</th>
                    <th className="text-right">Conv.</th>
                    <th className="text-right">Revenue</th>
                    <th className="text-right">ROAS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className={cn(campaign.status === 'paused' && 'opacity-50')}>
                      <td className="font-medium text-gray-900">{campaign.name}</td>
                      <td>
                        <StatusBadge status={campaign.status} />
                      </td>
                      <td className="text-gray-500 capitalize">{campaign.type.replace('_', ' ')}</td>
                      <td className="text-right">{formatCurrency(campaign.budget)}/day</td>
                      <td className="text-right">{formatCurrency(campaign.spent)}</td>
                      <td className="text-right">{formatNumber(campaign.impressions)}</td>
                      <td className="text-right">{formatNumber(campaign.clicks)}</td>
                      <td className="text-right">{campaign.ctr.toFixed(1)}%</td>
                      <td className="text-right">{formatCurrency(campaign.cpc)}</td>
                      <td className="text-right font-medium">{campaign.conversions}</td>
                      <td className="text-right font-medium text-green-600">{formatCurrency(campaign.revenue)}</td>
                      <td className="text-right">
                        <RoasBadge roas={campaign.roas} />
                      </td>
                      <td>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Settings className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>Match Type</th>
                    <th className="text-right">Impr.</th>
                    <th className="text-right">Clicks</th>
                    <th className="text-right">CTR</th>
                    <th className="text-right">CPC</th>
                    <th className="text-right">Cost</th>
                    <th className="text-right">Conv.</th>
                    <th className="text-center">QS</th>
                  </tr>
                </thead>
                <tbody>
                  {topKeywords.map((kw, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{kw.keyword}</span>
                        </div>
                      </td>
                      <td>
                        <span className={cn(
                          'text-xs px-2 py-1 rounded-full',
                          kw.matchType === 'exact' ? 'bg-blue-100 text-blue-700' :
                          kw.matchType === 'phrase' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        )}>
                          {kw.matchType}
                        </span>
                      </td>
                      <td className="text-right">{formatNumber(kw.impressions)}</td>
                      <td className="text-right">{formatNumber(kw.clicks)}</td>
                      <td className="text-right">{kw.ctr.toFixed(1)}%</td>
                      <td className="text-right">{formatCurrency(kw.cpc)}</td>
                      <td className="text-right">{formatCurrency(kw.cost)}</td>
                      <td className="text-right font-medium">{kw.conversions}</td>
                      <td className="text-center">
                        <QualityScoreBadge score={kw.qualityScore} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Optimization Recommendations</h3>
          </div>
          <div className="card-body space-y-3">
            <RecommendationItem
              type="warning"
              title="Low Quality Score Keywords"
              description="3 keywords have QS below 5. Consider improving ad relevance or landing pages."
              action="View Keywords"
            />
            <RecommendationItem
              type="success"
              title="High ROAS Campaign"
              description="Brand campaign achieving 15.9x ROAS. Consider increasing budget."
              action="Adjust Budget"
            />
            <RecommendationItem
              type="info"
              title="New Keyword Opportunities"
              description="12 new keyword suggestions based on search terms report."
              action="Review Keywords"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, highlight }: { title: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn('card p-3', highlight && 'bg-green-50 border-green-200')}>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
      <p className={cn('text-lg font-bold mt-1', highlight ? 'text-green-600' : 'text-gray-900')}>{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: React.ReactNode; color: string }> = {
    active: { icon: <Play className="w-3 h-3" />, color: 'bg-green-100 text-green-700' },
    paused: { icon: <Pause className="w-3 h-3" />, color: 'bg-amber-100 text-amber-700' },
    ended: { icon: <AlertTriangle className="w-3 h-3" />, color: 'bg-gray-100 text-gray-700' },
  }

  const { icon, color } = config[status] || config.active

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full capitalize', color)}>
      {icon}
      {status}
    </span>
  )
}

function RoasBadge({ roas }: { roas: number }) {
  const color = roas >= 4 ? 'text-green-600 bg-green-50' :
                roas >= 2 ? 'text-blue-600 bg-blue-50' :
                roas > 0 ? 'text-amber-600 bg-amber-50' :
                'text-gray-400 bg-gray-50'

  return (
    <span className={cn('inline-flex px-2 py-1 text-xs font-bold rounded', color)}>
      {roas > 0 ? `${roas.toFixed(1)}x` : '-'}
    </span>
  )
}

function QualityScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? 'bg-green-500' :
                score >= 5 ? 'bg-amber-500' :
                'bg-red-500'

  return (
    <span className={cn('inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full', color)}>
      {score}
    </span>
  )
}

function RecommendationItem({
  type,
  title,
  description,
  action,
}: {
  type: 'warning' | 'success' | 'info'
  title: string
  description: string
  action: string
}) {
  const colors = {
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <div className={cn('flex items-center justify-between p-3 rounded-lg border', colors[type])}>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm opacity-75">{description}</p>
      </div>
      <button className="btn btn-secondary text-sm whitespace-nowrap">
        {action}
      </button>
    </div>
  )
}
