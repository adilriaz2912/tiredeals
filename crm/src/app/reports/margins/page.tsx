'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface BrandMargin {
  brand: string
  revenue: number
  cost: number
  profit: number
  margin: number
  unitsSold: number
  change: number
}

interface CategoryMargin {
  category: string
  revenue: number
  cost: number
  profit: number
  margin: number
  unitsSold: number
}

interface SizeMargin {
  size: string
  revenue: number
  cost: number
  profit: number
  margin: number
  unitsSold: number
}

// Mock data
const overviewStats = {
  totalRevenue: 458750,
  totalCost: 312450,
  grossProfit: 146300,
  grossMargin: 31.9,
  avgMargin: 28.5,
  topMarginBrand: 'Michelin',
  revenueChange: 12.5,
  marginChange: 2.3,
}

const brandMargins: BrandMargin[] = [
  { brand: 'Michelin', revenue: 125680, cost: 81692, profit: 43988, margin: 35.0, unitsSold: 842, change: 15.2 },
  { brand: 'Goodyear', revenue: 98450, cost: 66946, profit: 31504, margin: 32.0, unitsSold: 756, change: 8.5 },
  { brand: 'Bridgestone', revenue: 87320, cost: 60124, profit: 27196, margin: 31.1, unitsSold: 548, change: -2.1 },
  { brand: 'Continental', revenue: 65890, cost: 46123, profit: 19767, margin: 30.0, unitsSold: 423, change: 5.8 },
  { brand: 'Pirelli', revenue: 45620, cost: 32386, profit: 13234, margin: 29.0, unitsSold: 289, change: 12.3 },
  { brand: 'Yokohama', revenue: 35790, cost: 25769, profit: 10021, margin: 28.0, unitsSold: 245, change: -4.5 },
]

const categoryMargins: CategoryMargin[] = [
  { category: 'All-Season', revenue: 185420, cost: 122978, profit: 62442, margin: 33.7, unitsSold: 1245 },
  { category: 'Winter', revenue: 125680, cost: 87976, profit: 37704, margin: 30.0, unitsSold: 756 },
  { category: 'Performance', revenue: 87340, cost: 58519, profit: 28821, margin: 33.0, unitsSold: 423 },
  { category: 'Truck/SUV', revenue: 60310, cost: 42819, profit: 17491, margin: 29.0, unitsSold: 328 },
]

const sizeMargins: SizeMargin[] = [
  { size: '225/65R17', revenue: 78540, cost: 52702, profit: 25838, margin: 32.9, unitsSold: 524 },
  { size: '215/55R17', revenue: 65320, cost: 45724, profit: 19596, margin: 30.0, unitsSold: 456 },
  { size: '205/55R16', revenue: 54210, cost: 37947, profit: 16263, margin: 30.0, unitsSold: 412 },
  { size: '235/45R18', revenue: 48760, cost: 33645, profit: 15115, margin: 31.0, unitsSold: 298 },
  { size: '275/55R20', revenue: 42380, cost: 28395, profit: 13985, margin: 33.0, unitsSold: 212 },
]

const monthlyTrend = [
  { month: 'Aug', revenue: 42500, margin: 28.2 },
  { month: 'Sep', revenue: 48200, margin: 29.5 },
  { month: 'Oct', revenue: 52800, margin: 30.1 },
  { month: 'Nov', revenue: 58400, margin: 31.2 },
  { month: 'Dec', revenue: 62100, margin: 32.5 },
  { month: 'Jan', revenue: 55800, margin: 31.9 },
]

export default function MarginReportsPage() {
  const [dateRange, setDateRange] = useState('30d')
  const [activeView, setActiveView] = useState<'brand' | 'category' | 'size'>('brand')

  return (
    <div className="min-h-screen">
      <Header
        title="Margin Reports"
        subtitle="Track profitability by tire brand, category, and size"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input w-40"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(overviewStats.totalRevenue)}
            change={overviewStats.revenueChange}
            icon={<DollarSign className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Gross Profit"
            value={formatCurrency(overviewStats.grossProfit)}
            change={8.2}
            icon={<TrendingUp className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Gross Margin"
            value={`${overviewStats.grossMargin}%`}
            change={overviewStats.marginChange}
            icon={<PieChart className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Avg. Margin per Tire"
            value={`${overviewStats.avgMargin}%`}
            change={1.5}
            icon={<Package className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* Profit Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Trend Chart */}
          <div className="lg:col-span-2 card">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Revenue & Margin Trend</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                  Revenue
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Margin %
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-end justify-between gap-4">
                {monthlyTrend.map((month, index) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-green-600 font-medium">{month.margin}%</div>
                    <div className="w-full flex flex-col items-center">
                      <div
                        className="w-full bg-primary-500 rounded-t-lg relative"
                        style={{ height: `${(month.revenue / 70000) * 180}px` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-lg"
                          style={{ height: `${month.margin * 2}px` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{month.month}</div>
                    <div className="text-xs text-gray-600">{formatCurrency(month.revenue / 1000)}k</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-900">Top Margin Products</h2>
            </div>
            <div className="card-body space-y-4">
              {brandMargins.slice(0, 5).map((brand, index) => (
                <div key={brand.brand} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{brand.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${(brand.margin / 40) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{brand.margin}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {[
              { key: 'brand', label: 'By Brand' },
              { key: 'category', label: 'By Category' },
              { key: 'size', label: 'By Size' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveView(tab.key as any)}
                className={cn(
                  'py-4 border-b-2 font-medium text-sm transition-colors',
                  activeView === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Data Tables */}
        {activeView === 'brand' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th className="text-right">Revenue</th>
                    <th className="text-right">Cost</th>
                    <th className="text-right">Gross Profit</th>
                    <th className="text-right">Margin</th>
                    <th className="text-right">Units Sold</th>
                    <th className="text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {brandMargins.map((brand) => (
                    <tr key={brand.brand}>
                      <td className="font-medium text-gray-900">{brand.brand}</td>
                      <td className="text-right">{formatCurrency(brand.revenue)}</td>
                      <td className="text-right text-gray-500">{formatCurrency(brand.cost)}</td>
                      <td className="text-right font-medium text-green-600">{formatCurrency(brand.profit)}</td>
                      <td className="text-right">
                        <MarginBadge margin={brand.margin} />
                      </td>
                      <td className="text-right">{formatNumber(brand.unitsSold)}</td>
                      <td className="text-right">
                        <ChangeIndicator change={brand.change} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td>Total</td>
                    <td className="text-right">{formatCurrency(overviewStats.totalRevenue)}</td>
                    <td className="text-right">{formatCurrency(overviewStats.totalCost)}</td>
                    <td className="text-right text-green-600">{formatCurrency(overviewStats.grossProfit)}</td>
                    <td className="text-right">{overviewStats.grossMargin}%</td>
                    <td className="text-right">{formatNumber(brandMargins.reduce((a, b) => a + b.unitsSold, 0))}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {activeView === 'category' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th className="text-right">Revenue</th>
                    <th className="text-right">Cost</th>
                    <th className="text-right">Gross Profit</th>
                    <th className="text-right">Margin</th>
                    <th className="text-right">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryMargins.map((category) => (
                    <tr key={category.category}>
                      <td className="font-medium text-gray-900">{category.category}</td>
                      <td className="text-right">{formatCurrency(category.revenue)}</td>
                      <td className="text-right text-gray-500">{formatCurrency(category.cost)}</td>
                      <td className="text-right font-medium text-green-600">{formatCurrency(category.profit)}</td>
                      <td className="text-right">
                        <MarginBadge margin={category.margin} />
                      </td>
                      <td className="text-right">{formatNumber(category.unitsSold)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'size' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tire Size</th>
                    <th className="text-right">Revenue</th>
                    <th className="text-right">Cost</th>
                    <th className="text-right">Gross Profit</th>
                    <th className="text-right">Margin</th>
                    <th className="text-right">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeMargins.map((size) => (
                    <tr key={size.size}>
                      <td className="font-mono font-medium text-gray-900">{size.size}</td>
                      <td className="text-right">{formatCurrency(size.revenue)}</td>
                      <td className="text-right text-gray-500">{formatCurrency(size.cost)}</td>
                      <td className="text-right font-medium text-green-600">{formatCurrency(size.profit)}</td>
                      <td className="text-right">
                        <MarginBadge margin={size.margin} />
                      </td>
                      <td className="text-right">{formatNumber(size.unitsSold)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            title="Highest Margin"
            value="Michelin"
            detail="35% avg margin, $44k profit"
            trend="up"
          />
          <InsightCard
            title="Best Category"
            value="All-Season"
            detail="33.7% margin, top seller"
            trend="up"
          />
          <InsightCard
            title="Attention Needed"
            value="Yokohama"
            detail="28% margin, -4.5% change"
            trend="down"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className={cn('p-3 rounded-xl', colors[color])}>
          {icon}
        </div>
        <ChangeIndicator change={change} />
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  )
}

function ChangeIndicator({ change }: { change: number }) {
  const isPositive = change >= 0

  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-sm font-medium',
      isPositive ? 'text-green-600' : 'text-red-600'
    )}>
      {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      {Math.abs(change)}%
    </span>
  )
}

function MarginBadge({ margin }: { margin: number }) {
  const color = margin >= 32 ? 'bg-green-100 text-green-700' :
                margin >= 28 ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'

  return (
    <span className={cn('inline-flex px-2 py-1 text-xs font-medium rounded-full', color)}>
      {margin}%
    </span>
  )
}

function InsightCard({
  title,
  value,
  detail,
  trend,
}: {
  title: string
  value: string
  detail: string
  trend: 'up' | 'down'
}) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-gray-600 mt-1">{detail}</p>
        </div>
        <div className={cn(
          'p-2 rounded-lg',
          trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        )}>
          {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        </div>
      </div>
    </div>
  )
}
