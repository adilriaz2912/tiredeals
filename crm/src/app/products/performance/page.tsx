'use client'

import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  Star,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Award,
  ThumbsDown
} from 'lucide-react'

// Mock data
const bestSellers = [
  { rank: 1, name: 'Michelin Defender T+H', sku: 'MICH-DEF-TH', unitsSold: 1245, revenue: 186750, margin: 22.5, trend: 15, rating: 4.8 },
  { rank: 2, name: 'Continental TrueContact Tour', sku: 'CONT-TCT-01', unitsSold: 1120, revenue: 168000, margin: 21.2, trend: 12, rating: 4.7 },
  { rank: 3, name: 'Goodyear Assurance WeatherReady', sku: 'GOOD-AWR-01', unitsSold: 980, revenue: 156800, margin: 19.8, trend: 8, rating: 4.6 },
  { rank: 4, name: 'Bridgestone Turanza QuietTrack', sku: 'BRID-TQT-01', unitsSold: 890, revenue: 142400, margin: 20.5, trend: -3, rating: 4.5 },
  { rank: 5, name: 'Pirelli P7 All Season Plus 3', sku: 'PIRE-P7AS-03', unitsSold: 845, revenue: 135200, margin: 23.1, trend: 22, rating: 4.7 },
  { rank: 6, name: 'Cooper Discoverer AT3 4S', sku: 'COOP-DAT3-4S', unitsSold: 780, revenue: 117000, margin: 18.4, trend: 5, rating: 4.4 },
  { rank: 7, name: 'Yokohama Geolandar A/T G015', sku: 'YOKO-GAT-G15', unitsSold: 720, revenue: 108000, margin: 17.9, trend: -8, rating: 4.3 },
  { rank: 8, name: 'BFGoodrich All-Terrain T/A KO2', sku: 'BFG-ATKO2-01', unitsSold: 695, revenue: 118150, margin: 19.2, trend: 18, rating: 4.8 },
]

const worstSellers = [
  { rank: 1, name: 'Kumho Solus TA11', sku: 'KUMH-STA11', unitsSold: 12, revenue: 1440, margin: 8.2, trend: -45, rating: 3.2, issue: 'Low demand' },
  { rank: 2, name: 'Nexen N\'Fera AU7', sku: 'NEXN-NAU7', unitsSold: 18, revenue: 2520, margin: 9.5, trend: -38, rating: 3.5, issue: 'Poor reviews' },
  { rank: 3, name: 'Falken Sincera SN250', sku: 'FALK-SN250', unitsSold: 24, revenue: 2880, margin: 7.8, trend: -52, rating: 3.1, issue: 'Quality concerns' },
  { rank: 4, name: 'Hankook Kinergy PT', sku: 'HANK-KPT-01', unitsSold: 28, revenue: 3360, margin: 10.2, trend: -28, rating: 3.8, issue: 'Better alternatives' },
  { rank: 5, name: 'Sumitomo HTR A/S P03', sku: 'SUMI-HASP3', unitsSold: 32, revenue: 4160, margin: 11.5, trend: -22, rating: 3.6, issue: 'Unknown brand' },
]

const brandPerformance = [
  { brand: 'Michelin', unitsSold: 3420, revenue: 547200, marketShare: 24.5, avgMargin: 22.8, avgRating: 4.7, trend: 12 },
  { brand: 'Continental', unitsSold: 2890, revenue: 433500, marketShare: 19.4, avgMargin: 21.5, avgRating: 4.6, trend: 8 },
  { brand: 'Goodyear', unitsSold: 2540, revenue: 355600, marketShare: 15.9, avgMargin: 19.2, avgRating: 4.4, trend: 5 },
  { brand: 'Bridgestone', unitsSold: 2180, revenue: 327000, marketShare: 14.6, avgMargin: 20.1, avgRating: 4.5, trend: -2 },
  { brand: 'Pirelli', unitsSold: 1650, revenue: 280500, marketShare: 12.6, avgMargin: 23.4, avgRating: 4.6, trend: 18 },
  { brand: 'Cooper', unitsSold: 980, revenue: 137200, marketShare: 6.1, avgMargin: 18.5, avgRating: 4.3, trend: 3 },
  { brand: 'Others', unitsSold: 1240, revenue: 148800, marketShare: 6.9, avgMargin: 15.2, avgRating: 4.0, trend: -5 },
]

const categoryPerformance = [
  { category: 'All-Season', percentage: 45, revenue: 892500, growth: 8 },
  { category: 'All-Terrain', percentage: 22, revenue: 436700, growth: 15 },
  { category: 'Winter/Snow', percentage: 18, revenue: 357300, growth: 12 },
  { category: 'Performance', percentage: 10, revenue: 198500, growth: -3 },
  { category: 'Highway', percentage: 5, revenue: 99250, growth: 2 },
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

export default function ProductPerformancePage() {
  const [activeTab, setActiveTab] = useState<'best' | 'worst'>('best')

  const totalRevenue = brandPerformance.reduce((sum, b) => sum + b.revenue, 0)
  const totalUnits = brandPerformance.reduce((sum, b) => sum + b.unitsSold, 0)
  const avgMargin = (brandPerformance.reduce((sum, b) => sum + b.avgMargin, 0) / brandPerformance.length).toFixed(1)

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Product Performance"
        subtitle="Best sellers, worst sellers, and brand analytics"
      />

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{formatNumber(totalUnits)}</p>
            <p className="text-neutral-400 text-sm mt-1">Units Sold (30 days)</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.5%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
            <p className="text-neutral-400 text-sm mt-1">Product Revenue</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.1%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{avgMargin}%</p>
            <p className="text-neutral-400 text-sm mt-1">Average Margin</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +0.2
              </span>
            </div>
            <p className="text-3xl font-bold text-white">4.5</p>
            <p className="text-neutral-400 text-sm mt-1">Average Rating</p>
          </div>
        </div>

        {/* Best/Worst Sellers Toggle */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex gap-2">
            <button
              onClick={() => setActiveTab('best')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'best'
                  ? 'bg-green-500 text-black'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Award className="w-4 h-4" />
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('worst')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'worst'
                  ? 'bg-red-500 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              Worst Sellers
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Product</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Units Sold</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Revenue</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Margin</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Rating</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-400 uppercase">Trend</th>
                  {activeTab === 'worst' && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Issue</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {(activeTab === 'best' ? bestSellers : worstSellers).map((product) => (
                  <tr key={product.sku} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        activeTab === 'best'
                          ? product.rank <= 3 ? 'bg-green-500 text-black' : 'bg-neutral-800 text-neutral-300'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-neutral-500">{product.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-neutral-300">{formatNumber(product.unitsSold)}</td>
                    <td className="px-6 py-4 text-right text-white font-semibold">{formatCurrency(product.revenue)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={product.margin >= 20 ? 'text-green-400' : product.margin >= 15 ? 'text-amber-400' : 'text-red-400'}>
                        {product.margin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                        product.trend >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {product.trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(product.trend)}%
                      </span>
                    </td>
                    {activeTab === 'worst' && (
                      <td className="px-6 py-4">
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-lg">
                          {(product as typeof worstSellers[0]).issue}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Brand Performance */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Brand Performance</h2>
            <div className="space-y-4">
              {brandPerformance.map((brand) => (
                <div key={brand.brand} className="p-4 bg-neutral-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">{brand.brand}</span>
                    <span className="text-green-400 font-bold">{brand.marketShare}%</span>
                  </div>
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${brand.marketShare}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <p className="text-neutral-500">Units</p>
                      <p className="text-white font-semibold">{formatNumber(brand.unitsSold)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Revenue</p>
                      <p className="text-white font-semibold">{formatCurrency(brand.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Margin</p>
                      <p className="text-green-400 font-semibold">{brand.avgMargin}%</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Trend</p>
                      <p className={`font-semibold ${brand.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {brand.trend >= 0 ? '+' : ''}{brand.trend}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Category Performance</h2>
            <div className="space-y-4">
              {categoryPerformance.map((category) => (
                <div key={category.category} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-neutral-400">{category.category}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-neutral-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-lg flex items-center px-3"
                        style={{ width: `${category.percentage}%` }}
                      >
                        {category.percentage >= 15 && (
                          <span className="text-xs font-bold text-black">{category.percentage}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-sm text-white font-semibold">{formatCurrency(category.revenue)}</p>
                    <p className={`text-xs ${category.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {category.growth >= 0 ? '+' : ''}{category.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">All-Terrain tires growing fastest (+15%)</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Consider expanding inventory and running targeted campaigns for this category
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Recommended Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm font-medium text-white mb-2">Discontinue Poor Performers</p>
              <p className="text-xs text-neutral-400">5 products with declining sales and poor margins. Recommend phasing out to free up warehouse space.</p>
              <button className="mt-3 text-xs text-red-400 font-medium hover:text-red-300">View Products →</button>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-sm font-medium text-white mb-2">Restock Top Sellers</p>
              <p className="text-xs text-neutral-400">3 best-selling products are running low on inventory. Order now to avoid stockouts.</p>
              <button className="mt-3 text-xs text-amber-400 font-medium hover:text-amber-300">Create PO →</button>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm font-medium text-white mb-2">Promote High-Margin Items</p>
              <p className="text-xs text-neutral-400">12 products have margins above 23% but moderate sales. Run promotions to boost volume.</p>
              <button className="mt-3 text-xs text-green-400 font-medium hover:text-green-300">View Opportunities →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
