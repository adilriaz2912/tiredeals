'use client'

import { Header } from '@/components/layout/Header'
import {
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Timer,
  RotateCcw
} from 'lucide-react'

// Mock data
const fulfillmentMetrics = {
  avgFulfillmentTime: 1.8, // days
  targetFulfillmentTime: 2.0,
  trend: -12, // negative is good
  sameDay: 18,
  nextDay: 52,
  twoDayPlus: 30,
}

const deliveryMetrics = {
  successRate: 96.8,
  onTimeRate: 94.2,
  avgDeliveryTime: 3.4, // days
  failedDeliveries: 142,
  returnRate: 2.8,
}

const fulfillmentByWarehouse = [
  { warehouse: 'Dallas, TX', orders: 1842, avgTime: 1.5, successRate: 97.8, capacity: 78 },
  { warehouse: 'Chicago, IL', orders: 1456, avgTime: 1.7, successRate: 96.5, capacity: 82 },
  { warehouse: 'Los Angeles, CA', orders: 1234, avgTime: 2.1, successRate: 95.2, capacity: 91 },
  { warehouse: 'Atlanta, GA', orders: 987, avgTime: 1.6, successRate: 97.1, capacity: 65 },
  { warehouse: 'Newark, NJ', orders: 876, avgTime: 1.9, successRate: 96.8, capacity: 72 },
]

const deliveryIssues = [
  { type: 'Address Not Found', count: 38, percentage: 26.8, trend: -5 },
  { type: 'Customer Not Available', count: 32, percentage: 22.5, trend: 2 },
  { type: 'Damaged in Transit', count: 28, percentage: 19.7, trend: -8 },
  { type: 'Refused by Customer', count: 24, percentage: 16.9, trend: 12 },
  { type: 'Weather Delay', count: 12, percentage: 8.5, trend: -15 },
  { type: 'Other', count: 8, percentage: 5.6, trend: 0 },
]

const carrierPerformance = [
  { carrier: 'FedEx Ground', deliveries: 2340, onTime: 95.2, avgDays: 3.2, cost: 12.80, rating: 4.6 },
  { carrier: 'UPS Ground', deliveries: 1980, onTime: 94.8, avgDays: 3.4, cost: 13.20, rating: 4.5 },
  { carrier: 'USPS Priority', deliveries: 1245, onTime: 91.5, avgDays: 4.1, cost: 9.50, rating: 4.2 },
  { carrier: 'Local Courier', deliveries: 680, onTime: 98.2, avgDays: 1.8, cost: 18.50, rating: 4.8 },
]

const weeklyTrend = [
  { week: 'Week 1', fulfillment: 1.9, delivery: 3.6, success: 96.2 },
  { week: 'Week 2', fulfillment: 1.8, delivery: 3.5, success: 96.5 },
  { week: 'Week 3', fulfillment: 1.7, delivery: 3.4, success: 96.8 },
  { week: 'Week 4', fulfillment: 1.8, delivery: 3.4, success: 96.8 },
]

const recentFailures = [
  { order: 'TD-28934', customer: 'John Smith', address: 'Phoenix, AZ', carrier: 'FedEx', reason: 'Address not found', attempts: 2 },
  { order: 'TD-28921', customer: 'Sarah Johnson', address: 'Denver, CO', carrier: 'UPS', reason: 'Customer not available', attempts: 3 },
  { order: 'TD-28918', customer: 'Mike Brown', address: 'Seattle, WA', carrier: 'USPS', reason: 'Damaged in transit', attempts: 1 },
  { order: 'TD-28905', customer: 'Emily Davis', address: 'Miami, FL', carrier: 'FedEx', reason: 'Refused - wrong item', attempts: 1 },
  { order: 'TD-28899', customer: 'Chris Wilson', address: 'Boston, MA', carrier: 'UPS', reason: 'Weather delay', attempts: 2 },
]

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export default function FulfillmentDashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Fulfillment & Delivery"
        subtitle="Order fulfillment speed and delivery success rates"
      />

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Timer className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> {fulfillmentMetrics.trend}%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{fulfillmentMetrics.avgFulfillmentTime} days</p>
            <p className="text-neutral-400 text-sm mt-1">Avg Fulfillment Time</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +0.5%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{deliveryMetrics.successRate}%</p>
            <p className="text-neutral-400 text-sm mt-1">Delivery Success Rate</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +1.2%
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{deliveryMetrics.onTimeRate}%</p>
            <p className="text-neutral-400 text-sm mt-1">On-Time Delivery</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{deliveryMetrics.avgDeliveryTime} days</p>
            <p className="text-neutral-400 text-sm mt-1">Avg Delivery Time</p>
          </div>

          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-red-400 text-sm font-medium">{deliveryMetrics.failedDeliveries} failed</span>
            </div>
            <p className="text-3xl font-bold text-white">{deliveryMetrics.returnRate}%</p>
            <p className="text-neutral-400 text-sm mt-1">Return Rate</p>
          </div>
        </div>

        {/* Fulfillment Speed Breakdown */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Fulfillment Speed Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-4xl font-bold text-green-400">{fulfillmentMetrics.sameDay}%</p>
              <p className="text-neutral-400 mt-2">Same Day</p>
              <p className="text-xs text-neutral-500 mt-1">Orders shipped within 24 hours</p>
            </div>
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-4xl font-bold text-green-400">{fulfillmentMetrics.nextDay}%</p>
              <p className="text-neutral-400 mt-2">Next Day</p>
              <p className="text-xs text-neutral-500 mt-1">Orders shipped within 48 hours</p>
            </div>
            <div className="text-center p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-4xl font-bold text-amber-400">{fulfillmentMetrics.twoDayPlus}%</p>
              <p className="text-neutral-400 mt-2">2+ Days</p>
              <p className="text-xs text-neutral-500 mt-1">Orders taking longer to fulfill</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Warehouse Performance */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Performance by Warehouse</h2>
            <div className="space-y-4">
              {fulfillmentByWarehouse.map((wh) => (
                <div key={wh.warehouse} className="p-4 bg-neutral-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-white">{wh.warehouse}</span>
                    </div>
                    <span className="text-sm text-neutral-400">{formatNumber(wh.orders)} orders</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500">Avg Time</p>
                      <p className={`font-semibold ${wh.avgTime <= 1.8 ? 'text-green-400' : 'text-amber-400'}`}>
                        {wh.avgTime} days
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Success</p>
                      <p className="text-green-400 font-semibold">{wh.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Capacity</p>
                      <p className={`font-semibold ${wh.capacity >= 85 ? 'text-red-400' : wh.capacity >= 70 ? 'text-amber-400' : 'text-green-400'}`}>
                        {wh.capacity}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrier Performance */}
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Carrier Performance</h2>
            <div className="space-y-4">
              {carrierPerformance.map((carrier) => (
                <div key={carrier.carrier} className="p-4 bg-neutral-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">{carrier.carrier}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-white font-semibold">{carrier.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-neutral-500">Deliveries</p>
                      <p className="text-white font-semibold">{formatNumber(carrier.deliveries)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">On-Time</p>
                      <p className={`font-semibold ${carrier.onTime >= 95 ? 'text-green-400' : carrier.onTime >= 92 ? 'text-amber-400' : 'text-red-400'}`}>
                        {carrier.onTime}%
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Avg Days</p>
                      <p className="text-white font-semibold">{carrier.avgDays}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Avg Cost</p>
                      <p className="text-white font-semibold">${carrier.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Issues */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Delivery Issues Breakdown</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryIssues.map((issue) => (
              <div key={issue.type} className="p-4 bg-neutral-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{issue.type}</span>
                  <span className={`text-xs font-medium ${issue.trend <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {issue.trend <= 0 ? '↓' : '↑'} {Math.abs(issue.trend)}%
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{issue.count}</p>
                    <p className="text-xs text-neutral-500">{issue.percentage}% of failures</p>
                  </div>
                  <div className="h-12 w-16 bg-neutral-700 rounded-lg overflow-hidden">
                    <div
                      className="w-full bg-amber-500"
                      style={{ height: `${issue.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">4-Week Performance Trend</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Week</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Fulfillment Time</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Delivery Time</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {weeklyTrend.map((week, index) => {
                  const prevWeek = index > 0 ? weeklyTrend[index - 1] : null
                  return (
                    <tr key={week.week} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="px-4 py-4 font-medium text-white">{week.week}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-white">{week.fulfillment} days</span>
                          {prevWeek && (
                            <span className={`text-xs ${week.fulfillment < prevWeek.fulfillment ? 'text-green-400' : week.fulfillment > prevWeek.fulfillment ? 'text-red-400' : 'text-neutral-500'}`}>
                              {week.fulfillment < prevWeek.fulfillment ? '↓' : week.fulfillment > prevWeek.fulfillment ? '↑' : '—'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-white">{week.delivery} days</span>
                          {prevWeek && (
                            <span className={`text-xs ${week.delivery < prevWeek.delivery ? 'text-green-400' : week.delivery > prevWeek.delivery ? 'text-red-400' : 'text-neutral-500'}`}>
                              {week.delivery < prevWeek.delivery ? '↓' : week.delivery > prevWeek.delivery ? '↑' : '—'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-green-400 font-semibold">{week.success}%</span>
                          {prevWeek && (
                            <span className={`text-xs ${week.success > prevWeek.success ? 'text-green-400' : week.success < prevWeek.success ? 'text-red-400' : 'text-neutral-500'}`}>
                              {week.success > prevWeek.success ? '↑' : week.success < prevWeek.success ? '↓' : '—'}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Failures */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-white">Recent Delivery Failures</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Carrier</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-400 uppercase">Reason</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Attempts</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {recentFailures.map((failure) => (
                  <tr key={failure.order} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-4 py-4 font-medium text-white">{failure.order}</td>
                    <td className="px-4 py-4 text-neutral-300">{failure.customer}</td>
                    <td className="px-4 py-4 text-neutral-300">{failure.address}</td>
                    <td className="px-4 py-4 text-neutral-300">{failure.carrier}</td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-lg">
                        {failure.reason}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-neutral-300">{failure.attempts}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                        Resolve
                      </button>
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
