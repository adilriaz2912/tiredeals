'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Snowflake,
  Sun,
  CloudRain,
  DollarSign,
  Package,
  AlertTriangle,
  Target,
  Download,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface ForecastData {
  month: string
  predicted: number
  lowerBound: number
  upperBound: number
  actual?: number
  seasonFactor: string
}

interface CategoryForecast {
  category: string
  currentMonth: number
  nextMonth: number
  change: number
  trend: 'up' | 'down' | 'stable'
  seasonalNote?: string
}

// Mock data
const forecastData: ForecastData[] = [
  { month: 'Oct 2024', predicted: 52800, lowerBound: 48500, upperBound: 57100, actual: 54200, seasonFactor: 'fall' },
  { month: 'Nov 2024', predicted: 68400, lowerBound: 62800, upperBound: 74000, actual: 71500, seasonFactor: 'winter_start' },
  { month: 'Dec 2024', predicted: 82500, lowerBound: 75800, upperBound: 89200, actual: 79800, seasonFactor: 'winter_peak' },
  { month: 'Jan 2025', predicted: 58200, lowerBound: 53500, upperBound: 62900, actual: 55800, seasonFactor: 'winter' },
  { month: 'Feb 2025', predicted: 48600, lowerBound: 44700, upperBound: 52500, seasonFactor: 'winter_end' },
  { month: 'Mar 2025', predicted: 62400, lowerBound: 57400, upperBound: 67400, seasonFactor: 'spring' },
  { month: 'Apr 2025', predicted: 71200, lowerBound: 65500, upperBound: 76900, seasonFactor: 'spring_peak' },
  { month: 'May 2025', predicted: 68500, lowerBound: 63000, upperBound: 74000, seasonFactor: 'spring' },
  { month: 'Jun 2025', predicted: 58900, lowerBound: 54200, upperBound: 63600, seasonFactor: 'summer' },
]

const categoryForecasts: CategoryForecast[] = [
  { category: 'Winter Tires', currentMonth: 28500, nextMonth: 15200, change: -46.7, trend: 'down', seasonalNote: 'End of winter season' },
  { category: 'All-Season', currentMonth: 18400, nextMonth: 24600, change: 33.7, trend: 'up', seasonalNote: 'Spring demand increase' },
  { category: 'Performance', currentMonth: 8200, nextMonth: 12400, change: 51.2, trend: 'up', seasonalNote: 'Warm weather boost' },
  { category: 'Truck/SUV', currentMonth: 6500, nextMonth: 7800, change: 20.0, trend: 'up' },
]

const topPredictedProducts = [
  { name: 'Michelin Defender T+H', size: '225/65R17', predicted: 145, confidence: 92 },
  { name: 'Goodyear Assurance', size: '215/55R17', predicted: 128, confidence: 88 },
  { name: 'Continental TrueContact', size: '205/55R16', predicted: 112, confidence: 85 },
  { name: 'Bridgestone Turanza', size: '225/60R16', predicted: 98, confidence: 82 },
  { name: 'Pirelli P4 Four Seasons', size: '225/65R17', predicted: 87, confidence: 79 },
]

const seasonalInsights = [
  {
    icon: <Snowflake className="w-5 h-5" />,
    title: 'Winter Season Ending',
    description: 'Winter tire demand declining. Consider promotional pricing to clear inventory.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'Spring Demand Rising',
    description: 'All-season and performance tires trending up. Stock accordingly.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: <CloudRain className="w-5 h-5" />,
    title: 'Weather Impact',
    description: 'Wet spring forecast may boost all-season tire sales 15% above normal.',
    color: 'bg-purple-50 text-purple-600',
  },
]

const stats = {
  nextMonthForecast: 62400,
  forecastAccuracy: 94.2,
  yearOverYear: 18.5,
  inventoryRecommendation: 2450,
}

export default function SalesForecastPage() {
  const [forecastPeriod, setForecastPeriod] = useState('6m')

  const maxValue = Math.max(...forecastData.map(d => d.upperBound))

  return (
    <div className="min-h-screen">
      <Header
        title="Sales Forecasting"
        subtitle="AI-powered demand prediction based on seasonality and trends"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="input w-40"
            >
              <option value="3m">3 Months</option>
              <option value="6m">6 Months</option>
              <option value="12m">12 Months</option>
            </select>
            <button className="btn btn-secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Next Month Forecast"
            value={formatCurrency(stats.nextMonthForecast)}
            subtitle="February 2025"
            icon={<Target className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Forecast Accuracy"
            value={`${stats.forecastAccuracy}%`}
            subtitle="Last 6 months"
            icon={<TrendingUp className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Year-over-Year"
            value={`+${stats.yearOverYear}%`}
            subtitle="vs same period last year"
            icon={<Calendar className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Recommended Stock"
            value={formatNumber(stats.inventoryRecommendation)}
            subtitle="Units for next month"
            icon={<Package className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* Seasonal Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {seasonalInsights.map((insight, index) => (
            <div key={index} className="card p-4">
              <div className="flex items-start gap-4">
                <div className={cn('p-3 rounded-xl', insight.color)}>
                  {insight.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Forecast Chart */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Revenue Forecast</h2>
              <p className="text-sm text-gray-500">Predicted vs actual sales with confidence interval</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                Predicted
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Actual
              </span>
              <span className="flex items-center gap-2">
                <span className="w-8 h-3 bg-primary-100 rounded"></span>
                Confidence Range
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="h-80 flex items-end gap-4 pb-8 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 w-16">
                <span>{formatCurrency(maxValue / 1000)}k</span>
                <span>{formatCurrency((maxValue * 0.75) / 1000)}k</span>
                <span>{formatCurrency((maxValue * 0.5) / 1000)}k</span>
                <span>{formatCurrency((maxValue * 0.25) / 1000)}k</span>
                <span>$0</span>
              </div>

              {/* Chart bars */}
              <div className="flex-1 flex items-end justify-between gap-2 ml-20">
                {forecastData.map((data, index) => {
                  const heightPercent = (data.predicted / maxValue) * 100
                  const rangeBottom = ((data.predicted - data.lowerBound) / maxValue) * 100
                  const rangeTop = ((data.upperBound - data.predicted) / maxValue) * 100

                  return (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative" style={{ height: '240px' }}>
                        {/* Confidence range */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-8 bg-primary-100 rounded"
                          style={{
                            bottom: `${((data.lowerBound / maxValue) * 100)}%`,
                            height: `${((data.upperBound - data.lowerBound) / maxValue) * 100}%`,
                          }}
                        />

                        {/* Predicted bar */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-6 bg-primary-500 rounded-t transition-all"
                          style={{ height: `${heightPercent}%`, bottom: 0 }}
                        />

                        {/* Actual bar (if exists) */}
                        {data.actual && (
                          <div
                            className="absolute left-1/2 translate-x-1 w-3 bg-green-500 rounded-t"
                            style={{ height: `${(data.actual / maxValue) * 100}%`, bottom: 0 }}
                          />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        {data.month.split(' ')[0]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Forecasts */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-900">Category Forecast</h2>
            </div>
            <div className="divide-y">
              {categoryForecasts.map((cat) => (
                <div key={cat.category} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{cat.category}</h3>
                      {cat.seasonalNote && (
                        <p className="text-xs text-gray-500 mt-0.5">{cat.seasonalNote}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{formatCurrency(cat.currentMonth)}</p>
                        <p className="text-sm font-medium">{formatCurrency(cat.nextMonth)}</p>
                      </div>
                      <div className={cn(
                        'flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium',
                        cat.trend === 'up' ? 'bg-green-100 text-green-700' :
                        cat.trend === 'down' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      )}>
                        {cat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                         cat.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                        {cat.change > 0 ? '+' : ''}{cat.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Predicted Products */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-900">Top Predicted Products</h2>
              <p className="text-sm text-gray-500">Next month demand forecast</p>
            </div>
            <div className="divide-y">
              {topPredictedProducts.map((product, index) => (
                <div key={product.name} className="p-4 flex items-center gap-4">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.size}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.predicted} units</p>
                    <p className="text-xs text-gray-500">{product.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Recommendations */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Inventory Recommendations</h2>
              <p className="text-sm text-gray-500">AI-suggested stock levels based on forecast</p>
            </div>
            <button className="btn btn-primary">
              <Package className="w-4 h-4 mr-2" />
              Generate PO
            </button>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RecommendationCard
                title="Restock Now"
                count={12}
                description="Items below safety stock"
                color="red"
                icon={<AlertTriangle className="w-5 h-5" />}
              />
              <RecommendationCard
                title="Order Soon"
                count={24}
                description="Items approaching reorder point"
                color="amber"
                icon={<Package className="w-5 h-5" />}
              />
              <RecommendationCard
                title="Overstocked"
                count={8}
                description="Items above optimal level"
                color="blue"
                icon={<TrendingDown className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string
  value: string
  subtitle: string
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
      <div className="flex items-center gap-4">
        <div className={cn('p-3 rounded-xl', colors[color])}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({
  title,
  count,
  description,
  color,
  icon,
}: {
  title: string
  count: number
  description: string
  color: 'red' | 'amber' | 'blue'
  icon: React.ReactNode
}) {
  const colors = {
    red: 'bg-red-50 border-red-200 text-red-600',
    amber: 'bg-amber-50 border-amber-200 text-amber-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
  }

  return (
    <div className={cn('p-4 rounded-xl border-2', colors[color])}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm opacity-75">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{count}</span>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
