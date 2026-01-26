'use client'

import { Header } from '@/components/layout/Header'
import {
  TrendingUp,
  TrendingDown,
  Package,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  Clock,
  XCircle,
  ArrowRight,
  Calendar
} from 'lucide-react'

// Mock data
const turnoverMetrics = {
  overall: {
    turnoverRate: 4.2,
    avgDaysInStock: 87,
    targetTurnover: 5.0,
    trend: 8,
  },
  byCategory: [
    { category: 'All-Season', turnover: 5.8, daysInStock: 63, status: 'excellent' },
    { category: 'All-Terrain', turnover: 4.5, daysInStock: 81, status: 'good' },
    { category: 'Winter/Snow', turnover: 3.2, daysInStock: 114, status: 'seasonal' },
    { category: 'Performance', turnover: 2.8, daysInStock: 130, status: 'slow' },
    { category: 'Highway', turnover: 3.5, daysInStock: 104, status: 'average' },
  ]
}

const stockoutImpact = {
  summary: {
    stockoutsThisMonth: 23,
    estimatedLostRevenue: 48750,
    lostOrders: 142,
    avgStockoutDays: 4.2,
  },
  recentStockouts: [
    { product: 'Michelin Defender T+H 215/60R16', sku: 'MICH-DEF-TH-215', days: 5, lostRevenue: 8250, lostOrders: 22, restockDate: 'Jan 28' },
    { product: 'Continental TrueContact 225/65R17', sku: 'CONT-TCT-225', days: 3, lostRevenue: 6420, lostOrders: 18, restockDate: 'Jan 27' },
    { product: 'Goodyear Assurance 205/55R16', sku: 'GOOD-AWR-205', days: 7, lostRevenue: 5880, lostOrders: 16, restockDate: 'Jan 30' },
    { product: 'BFGoodrich KO2 265/70R17', sku: 'BFG-KO2-265', days: 4, lostRevenue: 7200, lostOrders: 15, restockDate: 'Jan 26' },
    { product: 'Pirelli P7 225/45R18', sku: 'PIRE-P7-225', days: 6, lostRevenue: 9450, lostOrders: 21, restockDate: 'Feb 1' },
  ],
  topMissedSearches: [
    { term: '225/65R17 all season', searches: 342, conversionLost: 12 },
    { term: 'michelin defender 215/60r16', searches: 289, conversionLost: 15 },
    { term: 'bfgoodrich ko2 265/70r17', searches: 234, conversionLost: 18 },
    { term: '205/55r16 goodyear', searches: 198, conversionLost: 14 },
    { term: 'continental 225/65r17', searches: 187, conversionLost: 11 },
  ]
}

const slowMovingInventory = [
  { product: 'Nexen N\'Fera AU7 245/40R18', sku: 'NEXN-NAU7-245', daysInStock: 245, quantity: 48, value: 7200, lastSold: '42 days ago' },
  { product: 'Kumho Solus TA11 205/70R15', sku: 'KUMH-STA11-205', daysInStock: 198, quantity: 36, value: 4320, lastSold: '38 days ago' },
  { product: 'Falken Sincera SN250 195/65R15', sku: 'FALK-SN250-195', daysInStock: 176, quantity: 52, value: 5720, lastSold: '45 days ago' },
  { product: 'Sumitomo HTR A/S 215/55R17', sku: 'SUMI-HASP-215', daysInStock: 165, quantity: 28, value: 3920, lastSold: '31 days ago' },
  { product: 'Hankook Kinergy PT 225/60R16', sku: 'HANK-KPT-225', daysInStock: 152, quantity: 40, value: 5200, lastSold: '28 days ago' },
]

const inventoryHealth = {
  optimal: { count: 234, percentage: 52, value: 425800 },
  overstocked: { count: 78, percentage: 17, value: 156200 },
  understocked: { count: 45, percentage: 10, value: 89500 },
  slowMoving: { count: 62, percentage: 14, value: 74400 },
  outOfStock: { count: 31, percentage: 7, value: 0 },
}

const monthlyTurnover = [
  { month: 'Aug', turnover: 3.8 },
  { month: 'Sep', turnover: 4.0 },
  { month: 'Oct', turnover: 4.5 },
  { month: 'Nov', turnover: 4.8 },
  { month: 'Dec', turnover: 5.2 },
  { month: 'Jan', turnover: 4.2 },
]

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

export default function InventoryAnalyticsPage() {
  const maxTurnover = Math.max(...monthlyTurnover.map(m => m.turnover))

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Inventory Analytics"
        subtitle="Turnover rates, stockout impact, and inventory health"
      />

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{turnoverMetrics.overall.trend}%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{turnoverMetrics.overall.turnoverRate}x</p>
            <p className="text-neutral-400 text-sm mt-1">Inventory Turnover Rate</p>
            <p className="text-xs text-neutral-500 mt-2">Target: {turnoverMetrics.overall.targetTurnover}x</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -5 days
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{turnoverMetrics.overall.avgDaysInStock}</p>
            <p className="text-neutral-400 text-sm mt-1">Avg Days in Stock</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-red-400 text-sm font-medium">This month</span>
            </div>
            <p className="text-3xl font-bold text-white">{stockoutImpact.summary.stockoutsThisMonth}</p>
            <p className="text-neutral-400 text-sm mt-1">Stockout Events</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-red-400 text-sm font-medium">{stockoutImpact.summary.lostOrders} orders</span>
            </div>
            <p className="text-3xl font-bold text-white">{formatCurrency(stockoutImpact.summary.estimatedLostRevenue)}</p>
            <p className="text-neutral-400 text-sm mt-1">Est. Lost Revenue</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Turnover by Category */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Turnover by Category</h2>
            <div className="space-y-4">
              {turnoverMetrics.byCategory.map((cat) => {
                const statusColors = {
                  excellent: 'text-green-400 bg-green-500/20',
                  good: 'text-green-400 bg-green-500/20',
                  average: 'text-amber-400 bg-amber-500/20',
                  seasonal: 'text-blue-400 bg-blue-500/20',
                  slow: 'text-red-400 bg-red-500/20',
                }
                return (
                  <div key={cat.category} className="p-4 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{cat.category}</span>
                      <span className={`text-xs px-2 py-1 rounded-lg ${statusColors[cat.status as keyof typeof statusColors]}`}>
                        {cat.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="h-3 bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cat.turnover >= 4 ? 'bg-green-500' : cat.turnover >= 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${(cat.turnover / 6) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-white font-bold w-12">{cat.turnover}x</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Avg {cat.daysInStock} days in stock</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Monthly Turnover Trend */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">6-Month Turnover Trend</h2>
            <div className="space-y-4">
              {monthlyTurnover.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-neutral-400">{month.month}</span>
                  <div className="flex-1">
                    <div className="h-8 bg-neutral-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center justify-end pr-3"
                        style={{ width: `${(month.turnover / maxTurnover) * 100}%` }}
                      >
                        <span className="text-xs font-bold text-black">{month.turnover}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-neutral-800/50 rounded-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Peak Turnover</span>
                <span className="text-green-400 font-semibold">5.2x (December)</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-neutral-400">YoY Improvement</span>
                <span className="text-green-400 font-semibold">+18%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stockout Impact */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-white">Recent Stockout Impact</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Product</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Days Out</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Lost Orders</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Lost Revenue</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Restock Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {stockoutImpact.recentStockouts.map((item) => (
                  <tr key={item.sku} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-white">{item.product}</p>
                        <p className="text-xs text-neutral-500">{item.sku}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-red-400 font-semibold">{item.days} days</span>
                    </td>
                    <td className="px-4 py-4 text-right text-neutral-300">{item.lostOrders}</td>
                    <td className="px-4 py-4 text-right text-red-400 font-semibold">{formatCurrency(item.lostRevenue)}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-300">{item.restockDate}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Missed Searches */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Top Missed Searches (Out of Stock)</h2>
            <div className="space-y-3">
              {stockoutImpact.topMissedSearches.map((search, index) => (
                <div key={search.term} className="flex items-center gap-4 p-3 bg-neutral-800/50 rounded-xl">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{search.term}</p>
                    <p className="text-xs text-neutral-500">{search.searches} searches</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-400 font-semibold">~{search.conversionLost}% conv. lost</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Health */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Inventory Health Distribution</h2>
            <div className="space-y-4">
              {[
                { label: 'Optimal Stock', data: inventoryHealth.optimal, color: 'green' },
                { label: 'Overstocked', data: inventoryHealth.overstocked, color: 'amber' },
                { label: 'Understocked', data: inventoryHealth.understocked, color: 'orange' },
                { label: 'Slow Moving', data: inventoryHealth.slowMoving, color: 'red' },
                { label: 'Out of Stock', data: inventoryHealth.outOfStock, color: 'red' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-28 text-sm text-neutral-400">{item.label}</div>
                  <div className="flex-1">
                    <div className="h-6 bg-neutral-800 rounded-lg overflow-hidden">
                      <div
                        className={`h-full rounded-lg bg-${item.color}-500`}
                        style={{
                          width: `${item.data.percentage}%`,
                          backgroundColor: item.color === 'green' ? '#22c55e' : item.color === 'amber' ? '#f59e0b' : item.color === 'orange' ? '#f97316' : '#ef4444'
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="text-white font-semibold">{item.data.count} SKUs</span>
                    <span className="text-neutral-500 text-xs ml-2">({item.data.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                <p className="text-2xl font-bold text-green-400">{formatCurrency(inventoryHealth.optimal.value)}</p>
                <p className="text-xs text-neutral-400 mt-1">Optimal Inventory Value</p>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                <p className="text-2xl font-bold text-amber-400">{formatCurrency(inventoryHealth.overstocked.value)}</p>
                <p className="text-xs text-neutral-400 mt-1">Excess Inventory Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slow Moving Inventory */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Slow Moving Inventory</h2>
            <span className="text-sm text-neutral-400">Items over 150 days in stock</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Product</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Days in Stock</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Value</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Last Sold</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {slowMovingInventory.map((item) => (
                  <tr key={item.sku} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-white">{item.product}</p>
                        <p className="text-xs text-neutral-500">{item.sku}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-red-400 font-semibold">{item.daysInStock} days</span>
                    </td>
                    <td className="px-4 py-4 text-right text-neutral-300">{item.quantity}</td>
                    <td className="px-4 py-4 text-right text-white font-semibold">{formatCurrency(item.value)}</td>
                    <td className="px-4 py-4 text-right text-neutral-400">{item.lastSold}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-500/30 transition-colors">
                        Discount
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">{formatCurrency(26360)} tied up in slow-moving inventory</p>
                <p className="text-xs text-neutral-400 mt-1">Consider running clearance promotions or returning to suppliers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
