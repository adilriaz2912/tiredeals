'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  RefreshCw,
  ArrowRight,
} from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/utils'

// Mock data for charts
const revenueData = [
  { month: 'Jul', revenue: 45000 },
  { month: 'Aug', revenue: 52000 },
  { month: 'Sep', revenue: 48000 },
  { month: 'Oct', revenue: 61000 },
  { month: 'Nov', revenue: 55000 },
  { month: 'Dec', revenue: 67000 },
  { month: 'Jan', revenue: 72000 },
]

const ordersByStatus = [
  { status: 'Completed', count: 156, color: '#10b981' },
  { status: 'Shipped', count: 45, color: '#3b82f6' },
  { status: 'Processing', count: 23, color: '#f59e0b' },
  { status: 'Pending', count: 12, color: '#6b7280' },
]

const topProducts = [
  { name: 'Michelin Defender T+H', sales: 145, revenue: 21750, trend: 12.5 },
  { name: 'Goodyear Assurance', sales: 128, revenue: 15360, trend: 8.2 },
  { name: 'Bridgestone Turanza', sales: 112, revenue: 17920, trend: -3.1 },
  { name: 'Continental TrueContact', sales: 98, revenue: 14700, trend: 15.8 },
  { name: 'Pirelli P4 Four Seasons', sales: 87, revenue: 13920, trend: 5.4 },
]

const topInstallers = [
  { name: 'ABC Tire Shop', orders: 32, revenue: 4250, rating: 4.8 },
  { name: 'Premium Tire Center', orders: 28, revenue: 3890, rating: 4.9 },
  { name: 'Quick Tire Service', orders: 24, revenue: 3120, rating: 4.5 },
  { name: 'AutoNation Tire Dept', orders: 18, revenue: 2890, rating: 4.6 },
  { name: 'Budget Tire Pros', orders: 12, revenue: 1560, rating: 4.2 },
]

const customerMetrics = {
  newCustomers: 156,
  newCustomersChange: 23.5,
  repeatRate: 34.2,
  repeatRateChange: 5.1,
  avgLifetimeValue: 892,
  avgLifetimeValueChange: 12.3,
  churnRate: 8.5,
  churnRateChange: -2.1,
}

const kpis = {
  revenue: { value: 125750, change: 12.5, period: 'vs last month' },
  orders: { value: 342, change: 8.2, period: 'vs last month' },
  avgOrderValue: { value: 367.69, change: 4.1, period: 'vs last month' },
  conversionRate: { value: 3.2, change: 0.5, period: 'vs last month' },
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="min-h-screen">
      <Header
        title="Reports & Analytics"
        subtitle="Track your business performance"
      />

      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['7d', '30d', '90d', '12m', 'All'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-primary-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' :
                 range === '30d' ? 'Last 30 Days' :
                 range === '90d' ? 'Last 90 Days' :
                 range === '12m' ? 'Last 12 Months' : 'All Time'}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="btn-outline btn-md">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="btn-outline btn-md">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(kpis.revenue.value)}
            change={kpis.revenue.change}
            period={kpis.revenue.period}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
          />
          <KPICard
            title="Total Orders"
            value={kpis.orders.value.toString()}
            change={kpis.orders.change}
            period={kpis.orders.period}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="blue"
          />
          <KPICard
            title="Avg. Order Value"
            value={formatCurrency(kpis.avgOrderValue.value)}
            change={kpis.avgOrderValue.change}
            period={kpis.avgOrderValue.period}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
          />
          <KPICard
            title="Conversion Rate"
            value={`${kpis.conversionRate.value}%`}
            change={kpis.conversionRate.change}
            period={kpis.conversionRate.period}
            icon={<BarChart3 className="w-6 h-6" />}
            color="amber"
          />
        </div>

        {/* Revenue Chart */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <select className="select w-40">
              <option>Revenue</option>
              <option>Orders</option>
              <option>Customers</option>
            </select>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-end justify-between gap-2">
              {revenueData.map((data, i) => {
                const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
                const height = (data.revenue / maxRevenue) * 100
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                      <div
                        className="absolute bottom-0 w-full bg-primary-500 rounded-t-lg transition-all hover:bg-primary-600"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                    <p className="text-xs font-medium">{formatCurrency(data.revenue)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by Status */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Orders by Status</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {ordersByStatus.map((item) => {
                  const total = ordersByStatus.reduce((sum, s) => sum + s.count, 0)
                  const percentage = (item.count / total) * 100
                  return (
                    <div key={item.status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.status}</span>
                        <span className="text-sm text-gray-500">{item.count} orders ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Customer Metrics */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Customer Metrics</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  label="New Customers"
                  value={customerMetrics.newCustomers.toString()}
                  change={customerMetrics.newCustomersChange}
                />
                <MetricCard
                  label="Repeat Purchase Rate"
                  value={`${customerMetrics.repeatRate}%`}
                  change={customerMetrics.repeatRateChange}
                />
                <MetricCard
                  label="Avg. Lifetime Value"
                  value={formatCurrency(customerMetrics.avgLifetimeValue)}
                  change={customerMetrics.avgLifetimeValueChange}
                />
                <MetricCard
                  label="Churn Rate"
                  value={`${customerMetrics.churnRate}%`}
                  change={customerMetrics.churnRateChange}
                  invertColors
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Top Selling Products</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, i) => (
                    <tr key={product.name}>
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                            {i + 1}
                          </span>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td>{product.sales}</td>
                      <td className="font-medium">{formatCurrency(product.revenue)}</td>
                      <td>
                        <span className={`flex items-center gap-1 ${product.trend >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                          {product.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(product.trend)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Installers */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Top Installers</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Installer</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topInstallers.map((installer, i) => (
                    <tr key={installer.name}>
                      <td>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                            {i + 1}
                          </span>
                          <span className="font-medium">{installer.name}</span>
                        </div>
                      </td>
                      <td>{installer.orders}</td>
                      <td className="font-medium">{formatCurrency(installer.revenue)}</td>
                      <td>
                        <span className="flex items-center gap-1 text-yellow-600">
                          ★ {installer.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({
  title,
  value,
  change,
  period,
  icon,
  color,
}: {
  title: string
  value: string
  change: number
  period: string
  icon: React.ReactNode
  color: 'green' | 'blue' | 'purple' | 'amber'
}) {
  const colors = {
    green: 'bg-primary-50 text-primary-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{period}</p>
    </div>
  )
}

function MetricCard({
  label,
  value,
  change,
  invertColors = false,
}: {
  label: string
  value: string
  change: number
  invertColors?: boolean
}) {
  const isPositive = invertColors ? change < 0 : change >= 0

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <span className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  )
}
