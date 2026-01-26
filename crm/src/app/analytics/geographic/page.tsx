'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Truck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Regional data
const regions = [
  {
    id: 'northeast',
    name: 'Northeast',
    states: ['NY', 'NJ', 'PA', 'CT', 'MA', 'NH', 'VT', 'ME', 'RI'],
    revenue: 1245000,
    orders: 3420,
    customers: 8920,
    growth: 12.5,
    topProducts: ['Michelin Defender', 'Goodyear Assurance', 'Continental'],
    avgOrderValue: 364,
    installers: 145,
  },
  {
    id: 'southeast',
    name: 'Southeast',
    states: ['FL', 'GA', 'NC', 'SC', 'VA', 'TN', 'AL', 'MS', 'LA'],
    revenue: 1890000,
    orders: 5120,
    customers: 12450,
    growth: 18.2,
    topProducts: ['Michelin Pilot Sport', 'BFGoodrich', 'Pirelli'],
    avgOrderValue: 369,
    installers: 198,
  },
  {
    id: 'midwest',
    name: 'Midwest',
    states: ['IL', 'OH', 'MI', 'IN', 'WI', 'MN', 'IA', 'MO'],
    revenue: 1120000,
    orders: 3180,
    customers: 7890,
    growth: 8.4,
    topProducts: ['Goodyear Wrangler', 'Bridgestone Blizzak', 'Cooper'],
    avgOrderValue: 352,
    installers: 132,
  },
  {
    id: 'southwest',
    name: 'Southwest',
    states: ['TX', 'AZ', 'NM', 'OK', 'NV'],
    revenue: 1680000,
    orders: 4560,
    customers: 10890,
    growth: 22.8,
    topProducts: ['BFGoodrich All-Terrain', 'Michelin LTX', 'Toyo'],
    avgOrderValue: 368,
    installers: 167,
  },
  {
    id: 'west',
    name: 'West',
    states: ['CA', 'WA', 'OR', 'CO', 'UT'],
    revenue: 2150000,
    orders: 5890,
    customers: 14250,
    growth: 15.6,
    topProducts: ['Tesla OE tires', 'Michelin Pilot', 'Continental'],
    avgOrderValue: 365,
    installers: 212,
  },
]

// Top cities
const topCities = [
  { city: 'Los Angeles, CA', revenue: 485000, orders: 1320, growth: 14.2 },
  { city: 'Houston, TX', revenue: 412000, orders: 1120, growth: 28.5 },
  { city: 'Miami, FL', revenue: 398000, orders: 1080, growth: 21.3 },
  { city: 'Chicago, IL', revenue: 356000, orders: 980, growth: 6.8 },
  { city: 'Phoenix, AZ', revenue: 324000, orders: 890, growth: 32.1 },
  { city: 'New York, NY', revenue: 312000, orders: 850, growth: 8.4 },
  { city: 'Dallas, TX', revenue: 298000, orders: 820, growth: 19.6 },
  { city: 'Atlanta, GA', revenue: 278000, orders: 760, growth: 16.8 },
]

// Stats
const stats = {
  totalRevenue: 8085000,
  totalOrders: 22170,
  avgGrowth: 15.5,
  topRegion: 'West',
}

export default function GeographicDemand() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [metric, setMetric] = useState<'revenue' | 'orders' | 'growth'>('revenue')

  const maxValue = Math.max(...regions.map(r =>
    metric === 'revenue' ? r.revenue :
    metric === 'orders' ? r.orders :
    r.growth
  ))

  return (
    <div className="min-h-screen">
      <Header
        title="Geographic Demand Heatmap"
        subtitle="Analyze demand patterns and opportunities by region"
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
              <p className="text-sm text-neutral-400 mt-1">Total Revenue</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <Package className="w-6 h-6 text-green-300" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.totalOrders.toLocaleString()}</p>
              <p className="text-sm text-neutral-400 mt-1">Total Orders</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">+{stats.avgGrowth}%</p>
              <p className="text-sm text-neutral-400 mt-1">Avg YoY Growth</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.topRegion}</p>
              <p className="text-sm text-neutral-400 mt-1">Top Performing Region</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional Map Visualization */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                Regional Performance
              </h2>
              <div className="flex gap-2">
                {(['revenue', 'orders', 'growth'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      metric === m
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Simplified US Map Grid */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                {regions.map((region) => {
                  const value = metric === 'revenue' ? region.revenue :
                    metric === 'orders' ? region.orders : region.growth
                  const intensity = value / maxValue

                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                      className={`relative p-6 rounded-xl border transition-all ${
                        selectedRegion === region.id
                          ? 'border-green-500/50 bg-green-500/10'
                          : 'border-neutral-700/50 bg-neutral-800/40 hover:border-neutral-600'
                      }`}
                      style={{
                        background: selectedRegion === region.id
                          ? undefined
                          : `linear-gradient(135deg, rgba(16, 185, 129, ${intensity * 0.3}) 0%, rgba(14, 165, 233, ${intensity * 0.2}) 100%)`
                      }}
                    >
                      <h3 className="font-semibold text-white text-center">{region.name}</h3>
                      <p className={`text-center mt-2 font-bold ${
                        metric === 'growth'
                          ? region.growth >= 15 ? 'text-green-400' : 'text-green-300'
                          : 'text-green-400'
                      }`}>
                        {metric === 'revenue' ? formatCurrency(region.revenue) :
                         metric === 'orders' ? region.orders.toLocaleString() :
                         `+${region.growth}%`}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center mt-2">
                        {region.states.slice(0, 3).map(state => (
                          <span key={state} className="text-xs text-neutral-500">{state}</span>
                        ))}
                        {region.states.length > 3 && (
                          <span className="text-xs text-neutral-500">+{region.states.length - 3}</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Selected Region Details */}
              {selectedRegion && (
                <div className="p-6 bg-neutral-800/40 rounded-xl border border-neutral-700/50">
                  {(() => {
                    const region = regions.find(r => r.id === selectedRegion)!
                    return (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">{region.name} Region</h3>
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                            region.growth >= 15
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-green-400/20 text-green-300'
                          }`}>
                            <ArrowUpRight className="w-4 h-4" />
                            {region.growth}% growth
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-neutral-400">Revenue</p>
                            <p className="text-lg font-semibold text-white">{formatCurrency(region.revenue)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-400">Orders</p>
                            <p className="text-lg font-semibold text-white">{region.orders.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-400">Customers</p>
                            <p className="text-lg font-semibold text-white">{region.customers.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-neutral-400">Installers</p>
                            <p className="text-lg font-semibold text-white">{region.installers}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400 mb-2">Top Products</p>
                          <div className="flex gap-2">
                            {region.topProducts.map(product => (
                              <span key={product} className="px-3 py-1 bg-neutral-700 text-neutral-300 text-sm rounded-lg">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Top Cities */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white">Top Cities</h2>
            </div>
            <div className="p-4 space-y-3">
              {topCities.map((city, i) => (
                <div key={city.city} className="p-3 bg-neutral-800/40 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < 3 ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {i + 1}
                      </span>
                      <span className="font-medium text-white">{city.city}</span>
                    </div>
                    <span className={`flex items-center gap-1 text-sm ${
                      city.growth >= 20 ? 'text-green-400' : 'text-green-300'
                    }`}>
                      <ArrowUpRight className="w-3 h-3" />
                      {city.growth}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400 font-semibold">{formatCurrency(city.revenue)}</span>
                    <span className="text-neutral-400">{city.orders} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
