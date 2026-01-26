'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Package,
  Target,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber, formatDate } from '@/lib/utils'

type Competitor = 'simpletire' | 'tirerack' | 'tireagent' | 'prioritytire' | 'discounttire'

interface CompetitorPrice {
  competitor: Competitor
  price: number
  inStock: boolean
  shipping: number
  lastUpdated: Date
  url: string
}

interface TireComparison {
  id: string
  sku: string
  brand: string
  model: string
  size: string
  ourPrice: number
  ourCost: number
  competitors: CompetitorPrice[]
  pricePosition: 'lowest' | 'competitive' | 'higher'
  opportunity: number
}

// Mock data
const competitors: Record<Competitor, { name: string; logo: string; color: string }> = {
  simpletire: { name: 'SimpleTire', logo: 'ST', color: 'bg-orange-500' },
  tirerack: { name: 'Tire Rack', logo: 'TR', color: 'bg-red-600' },
  tireagent: { name: 'TireAgent', logo: 'TA', color: 'bg-blue-600' },
  prioritytire: { name: 'Priority Tire', logo: 'PT', color: 'bg-green-600' },
  discounttire: { name: 'Discount Tire', logo: 'DT', color: 'bg-purple-600' },
}

const comparisons: TireComparison[] = [
  {
    id: '1',
    sku: 'MICH-DEF-225-65-17',
    brand: 'Michelin',
    model: 'Defender T+H',
    size: '225/65R17',
    ourPrice: 149.99,
    ourCost: 98.50,
    competitors: [
      { competitor: 'simpletire', price: 155.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'tirerack', price: 152.00, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 7200000), url: '#' },
      { competitor: 'tireagent', price: 148.50, inStock: true, shipping: 12.99, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'prioritytire', price: 159.99, inStock: false, shipping: 0, lastUpdated: new Date(Date.now() - 14400000), url: '#' },
    ],
    pricePosition: 'competitive',
    opportunity: 0,
  },
  {
    id: '2',
    sku: 'GOOD-ASS-215-55-17',
    brand: 'Goodyear',
    model: 'Assurance',
    size: '215/55R17',
    ourPrice: 119.99,
    ourCost: 78.20,
    competitors: [
      { competitor: 'simpletire', price: 115.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'tirerack', price: 118.00, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 7200000), url: '#' },
      { competitor: 'tireagent', price: 112.50, inStock: true, shipping: 12.99, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'prioritytire', price: 124.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 14400000), url: '#' },
    ],
    pricePosition: 'higher',
    opportunity: -4.00,
  },
  {
    id: '3',
    sku: 'BRID-TUR-225-60-16',
    brand: 'Bridgestone',
    model: 'Turanza Quiettrack',
    size: '225/60R16',
    ourPrice: 159.99,
    ourCost: 105.40,
    competitors: [
      { competitor: 'simpletire', price: 168.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'tirerack', price: 165.00, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 7200000), url: '#' },
      { competitor: 'tireagent', price: 162.50, inStock: false, shipping: 12.99, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'prioritytire', price: 172.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 14400000), url: '#' },
    ],
    pricePosition: 'lowest',
    opportunity: 5.01,
  },
  {
    id: '4',
    sku: 'CONT-TRU-205-55-16',
    brand: 'Continental',
    model: 'TrueContact Tour',
    size: '205/55R16',
    ourPrice: 129.99,
    ourCost: 85.60,
    competitors: [
      { competitor: 'simpletire', price: 132.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'tirerack', price: 130.00, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 7200000), url: '#' },
      { competitor: 'tireagent', price: 128.50, inStock: true, shipping: 12.99, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'prioritytire', price: 135.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 14400000), url: '#' },
    ],
    pricePosition: 'competitive',
    opportunity: 0,
  },
  {
    id: '5',
    sku: 'PIRE-P4F-225-65-17',
    brand: 'Pirelli',
    model: 'P4 Four Seasons Plus',
    size: '225/65R17',
    ourPrice: 139.99,
    ourCost: 92.80,
    competitors: [
      { competitor: 'simpletire', price: 145.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'tirerack', price: 142.00, inStock: false, shipping: 0, lastUpdated: new Date(Date.now() - 7200000), url: '#' },
      { competitor: 'tireagent', price: 138.50, inStock: true, shipping: 12.99, lastUpdated: new Date(Date.now() - 3600000), url: '#' },
      { competitor: 'prioritytire', price: 149.99, inStock: true, shipping: 0, lastUpdated: new Date(Date.now() - 14400000), url: '#' },
    ],
    pricePosition: 'lowest',
    opportunity: 2.01,
  },
]

const stats = {
  productsTracked: 2450,
  lowestPriceCount: 1245,
  avgPriceDiff: -2.3,
  priceAlerts: 12,
}

const priceAlerts = [
  { tire: 'Michelin Defender LTX M/S', size: '275/55R20', competitor: 'SimpleTire', change: -8.5, newPrice: 198.99 },
  { tire: 'Goodyear Wrangler', size: '265/70R17', competitor: 'Tire Rack', change: -5.2, newPrice: 165.00 },
  { tire: 'BFGoodrich KO2', size: '285/75R16', competitor: 'Priority Tire', change: -12.0, newPrice: 245.99 },
]

export default function CompetitivePricingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')

  const filteredComparisons = comparisons.filter(comp => {
    const matchesSearch = comp.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.size.includes(searchQuery)
    const matchesBrand = brandFilter === 'all' || comp.brand.toLowerCase() === brandFilter.toLowerCase()
    const matchesPosition = positionFilter === 'all' || comp.pricePosition === positionFilter
    return matchesSearch && matchesBrand && matchesPosition
  })

  return (
    <div className="min-h-screen">
      <Header
        title="Competitor Price Comparison"
        subtitle="Monitor and compare prices across major tire retailers"
        actions={
          <div className="flex items-center gap-3">
            <button className="btn btn-secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Prices
            </button>
            <button className="btn btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Products Tracked"
            value={formatNumber(stats.productsTracked)}
            icon={<Package className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Lowest Price"
            value={`${Math.round((stats.lowestPriceCount / stats.productsTracked) * 100)}%`}
            subtitle={`${formatNumber(stats.lowestPriceCount)} products`}
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Avg. Price Diff"
            value={`${stats.avgPriceDiff}%`}
            subtitle="vs competitors"
            icon={<TrendingDown className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Price Alerts"
            value={stats.priceAlerts}
            subtitle="competitors dropped"
            icon={<Bell className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* Competitor Overview */}
        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Competitor Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(competitors).map(([key, comp]) => (
              <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold', comp.color)}>
                  {comp.logo}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{comp.name}</p>
                  <p className="text-xs text-gray-500">Last sync: 1h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Alerts */}
        {priceAlerts.length > 0 && (
          <div className="card p-4 bg-amber-50 border-amber-200">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900">Price Drop Alerts</h3>
            </div>
            <div className="space-y-2">
              {priceAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.tire}</p>
                    <p className="text-xs text-gray-500">{alert.size} • {alert.competitor}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-medium flex items-center gap-1">
                      <ArrowDownRight className="w-4 h-4" />
                      {alert.change}%
                    </span>
                    <span className="font-bold">{formatCurrency(alert.newPrice)}</span>
                    <button className="btn btn-secondary text-xs">Match Price</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by brand, model, or size..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="input w-full md:w-40"
            >
              <option value="all">All Brands</option>
              <option value="michelin">Michelin</option>
              <option value="goodyear">Goodyear</option>
              <option value="bridgestone">Bridgestone</option>
              <option value="continental">Continental</option>
              <option value="pirelli">Pirelli</option>
            </select>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="input w-full md:w-48"
            >
              <option value="all">All Positions</option>
              <option value="lowest">Lowest Price</option>
              <option value="competitive">Competitive</option>
              <option value="higher">Higher Than Comp.</option>
            </select>
          </div>
        </div>

        {/* Price Comparison Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Our Price</th>
                  {Object.entries(competitors).map(([key, comp]) => (
                    <th key={key} className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <span className={cn('w-6 h-6 rounded text-white text-xs flex items-center justify-center', comp.color)}>
                          {comp.logo}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Position</th>
                </tr>
              </thead>
              <tbody>
                {filteredComparisons.map((comp) => {
                  const lowestCompPrice = Math.min(...comp.competitors.map(c => c.price + c.shipping))

                  return (
                    <tr key={comp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{comp.brand} {comp.model}</p>
                          <p className="text-sm text-gray-500">{comp.size} • SKU: {comp.sku}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div>
                          <p className="font-bold text-lg text-primary-600">{formatCurrency(comp.ourPrice)}</p>
                          <p className="text-xs text-gray-500">Cost: {formatCurrency(comp.ourCost)}</p>
                        </div>
                      </td>
                      {Object.keys(competitors).map((key) => {
                        const compPrice = comp.competitors.find(c => c.competitor === key)
                        if (!compPrice) {
                          return (
                            <td key={key} className="py-4 px-4 text-center text-gray-400">
                              N/A
                            </td>
                          )
                        }

                        const totalPrice = compPrice.price + compPrice.shipping
                        const diff = comp.ourPrice - totalPrice
                        const isLowest = totalPrice === lowestCompPrice

                        return (
                          <td key={key} className="py-4 px-4 text-center">
                            <div>
                              <p className={cn(
                                'font-medium',
                                isLowest ? 'text-green-600' : 'text-gray-900'
                              )}>
                                {formatCurrency(compPrice.price)}
                              </p>
                              {compPrice.shipping > 0 && (
                                <p className="text-xs text-gray-500">+{formatCurrency(compPrice.shipping)} ship</p>
                              )}
                              <div className="flex items-center justify-center gap-1 mt-1">
                                {!compPrice.inStock && (
                                  <span className="text-xs text-red-500">OOS</span>
                                )}
                                {diff !== 0 && (
                                  <span className={cn(
                                    'text-xs',
                                    diff > 0 ? 'text-green-600' : 'text-red-600'
                                  )}>
                                    {diff > 0 ? '-' : '+'}{formatCurrency(Math.abs(diff))}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                        )
                      })}
                      <td className="py-4 px-4 text-center">
                        <PositionBadge position={comp.pricePosition} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            title="Price Below Competitors"
            value="51%"
            description="of products are priced lower than all competitors"
            icon={<TrendingDown className="w-5 h-5" />}
            color="green"
          />
          <InsightCard
            title="Within $5 Range"
            value="32%"
            description="of products are competitively priced"
            icon={<Minus className="w-5 h-5" />}
            color="blue"
          />
          <InsightCard
            title="Price Opportunity"
            value="17%"
            description="of products could be repriced for better position"
            icon={<Target className="w-5 h-5" />}
            color="amber"
          />
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
  value: string | number
  subtitle?: string
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
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

function PositionBadge({ position }: { position: 'lowest' | 'competitive' | 'higher' }) {
  const config = {
    lowest: { label: 'Lowest', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3 h-3" /> },
    competitive: { label: 'Competitive', color: 'bg-blue-100 text-blue-700', icon: <Minus className="w-3 h-3" /> },
    higher: { label: 'Higher', color: 'bg-amber-100 text-amber-700', icon: <AlertTriangle className="w-3 h-3" /> },
  }

  const { label, color, icon } = config[position]

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full', color)}>
      {icon}
      {label}
    </span>
  )
}

function InsightCard({
  title,
  value,
  description,
  icon,
  color,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: 'green' | 'blue' | 'amber'
}) {
  const colors = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="card p-4">
      <div className="flex items-start gap-4">
        <div className={cn('p-3 rounded-xl', colors[color])}>
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="font-medium text-gray-900 mt-1">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}
