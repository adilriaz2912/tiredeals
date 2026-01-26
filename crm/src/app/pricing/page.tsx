'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Plus,
  Tag,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Package,
  Edit,
  Trash2,
  Copy,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Gift,
  Snowflake,
  Sun,
  Zap,
} from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

interface PromoCode {
  id: string
  code: string
  name: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: number
  minOrder: number | null
  maxDiscount: number | null
  usageLimit: number | null
  usageCount: number
  startDate: Date
  endDate: Date | null
  isActive: boolean
}

interface PriceRule {
  id: string
  name: string
  type: 'PERCENTAGE_DISCOUNT' | 'BULK_DISCOUNT' | 'TIERED_PRICING' | 'SEASONAL'
  value: number
  minQuantity: number | null
  customerTier: string | null
  seasonType: string | null
  brands: string[]
  categories: string[]
  isActive: boolean
  startDate: Date | null
  endDate: Date | null
}

// Mock data
const mockPromoCodes: PromoCode[] = [
  {
    id: '1',
    code: 'SAVE20',
    name: '20% Off Sitewide',
    type: 'PERCENTAGE',
    value: 20,
    minOrder: 200,
    maxDiscount: 100,
    usageLimit: 1000,
    usageCount: 342,
    startDate: new Date(Date.now() - 604800000),
    endDate: new Date(Date.now() + 604800000 * 2),
    isActive: true,
  },
  {
    id: '2',
    code: 'FREESHIP',
    name: 'Free Shipping',
    type: 'FREE_SHIPPING',
    value: 0,
    minOrder: 500,
    maxDiscount: null,
    usageLimit: null,
    usageCount: 856,
    startDate: new Date(Date.now() - 2592000000),
    endDate: null,
    isActive: true,
  },
  {
    id: '3',
    code: 'NEWCUSTOMER',
    name: '$50 Off First Order',
    type: 'FIXED_AMOUNT',
    value: 50,
    minOrder: 300,
    maxDiscount: null,
    usageLimit: 1,
    usageCount: 145,
    startDate: new Date(Date.now() - 2592000000),
    endDate: null,
    isActive: true,
  },
  {
    id: '4',
    code: 'WINTER25',
    name: '25% Off Winter Tires',
    type: 'PERCENTAGE',
    value: 25,
    minOrder: null,
    maxDiscount: 200,
    usageLimit: 500,
    usageCount: 500,
    startDate: new Date(Date.now() - 2592000000),
    endDate: new Date(Date.now() - 604800000),
    isActive: false,
  },
]

const mockPriceRules: PriceRule[] = [
  {
    id: '1',
    name: 'Buy 4 Get 10% Off',
    type: 'BULK_DISCOUNT',
    value: 10,
    minQuantity: 4,
    customerTier: null,
    seasonType: null,
    brands: [],
    categories: [],
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: '2',
    name: 'Gold Member Discount',
    type: 'PERCENTAGE_DISCOUNT',
    value: 15,
    minQuantity: null,
    customerTier: 'GOLD',
    seasonType: null,
    brands: [],
    categories: [],
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: '3',
    name: 'Platinum VIP Pricing',
    type: 'PERCENTAGE_DISCOUNT',
    value: 20,
    minQuantity: null,
    customerTier: 'PLATINUM',
    seasonType: null,
    brands: [],
    categories: [],
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: '4',
    name: 'Winter Tire Season',
    type: 'SEASONAL',
    value: 15,
    minQuantity: null,
    customerTier: null,
    seasonType: 'WINTER',
    brands: [],
    categories: ['Winter'],
    isActive: true,
    startDate: new Date(2024, 9, 1),
    endDate: new Date(2025, 2, 31),
  },
  {
    id: '5',
    name: 'Michelin Brand Sale',
    type: 'PERCENTAGE_DISCOUNT',
    value: 12,
    minQuantity: null,
    customerTier: null,
    seasonType: null,
    brands: ['Michelin'],
    categories: [],
    isActive: false,
    startDate: null,
    endDate: null,
  },
]

const stats = {
  activePromos: 3,
  activeRules: 4,
  totalSavings: 45680,
  avgDiscount: 18.5,
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'promos' | 'rules'>('promos')

  return (
    <div className="min-h-screen">
      <Header
        title="Price Rules Engine"
        subtitle="Manage promo codes, discounts, and pricing rules"
        actions={
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'promos' ? 'Create Promo Code' : 'Create Price Rule'}
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Active Promos"
            value={stats.activePromos}
            icon={<Tag className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Active Rules"
            value={stats.activeRules}
            icon={<Zap className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Total Savings (30d)"
            value={formatCurrency(stats.totalSavings)}
            icon={<DollarSign className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Avg. Discount"
            value={`${stats.avgDiscount}%`}
            icon={<Percent className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('promos')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'promos'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Tag className="w-4 h-4 inline mr-2" />
              Promo Codes
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'rules'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Price Rules
            </button>
          </nav>
        </div>

        {/* Promo Codes Tab */}
        {activeTab === 'promos' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Min Order</th>
                    <th>Usage</th>
                    <th>Valid Period</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {mockPromoCodes.map((promo) => (
                    <tr key={promo.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">
                            {promo.code}
                          </code>
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => navigator.clipboard.writeText(promo.code)}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="font-medium text-gray-900">{promo.name}</td>
                      <td>
                        <PromoTypeBadge type={promo.type} />
                      </td>
                      <td className="font-medium">
                        {promo.type === 'PERCENTAGE' && `${promo.value}%`}
                        {promo.type === 'FIXED_AMOUNT' && formatCurrency(promo.value)}
                        {promo.type === 'FREE_SHIPPING' && 'Free'}
                      </td>
                      <td>
                        {promo.minOrder ? formatCurrency(promo.minOrder) : '-'}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span>{promo.usageCount}</span>
                          {promo.usageLimit && (
                            <>
                              <span className="text-gray-400">/</span>
                              <span className="text-gray-500">{promo.usageLimit}</span>
                            </>
                          )}
                        </div>
                        {promo.usageLimit && (
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${Math.min((promo.usageCount / promo.usageLimit) * 100, 100)}%` }}
                            />
                          </div>
                        )}
                      </td>
                      <td className="text-sm">
                        <div>{formatDate(promo.startDate)}</div>
                        <div className="text-gray-500">
                          {promo.endDate ? `to ${formatDate(promo.endDate)}` : 'No expiry'}
                        </div>
                      </td>
                      <td>
                        <StatusToggle isActive={promo.isActive} />
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-danger-600 hover:bg-gray-100 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Price Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {mockPriceRules.map((rule) => (
              <PriceRuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        )}

        {/* Quick Create Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickCreateCard
            icon={<Gift className="w-6 h-6" />}
            title="Bulk Discount"
            description="Offer discounts when customers buy multiple tires"
            onClick={() => {}}
          />
          <QuickCreateCard
            icon={<Snowflake className="w-6 h-6" />}
            title="Seasonal Sale"
            description="Create time-limited seasonal promotions"
            onClick={() => {}}
          />
          <QuickCreateCard
            icon={<Users className="w-6 h-6" />}
            title="Loyalty Discount"
            description="Reward loyal customers with exclusive pricing"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'green' | 'blue' | 'purple' | 'amber'
}) {
  const colors = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
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
        </div>
      </div>
    </div>
  )
}

function PromoTypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    PERCENTAGE: { label: 'Percentage', color: 'bg-blue-100 text-blue-700' },
    FIXED_AMOUNT: { label: 'Fixed Amount', color: 'bg-green-100 text-green-700' },
    FREE_SHIPPING: { label: 'Free Shipping', color: 'bg-purple-100 text-purple-700' },
  }

  const { label, color } = config[type] || { label: type, color: 'bg-gray-100 text-gray-700' }

  return (
    <span className={cn('inline-flex px-2 py-1 text-xs font-medium rounded-full', color)}>
      {label}
    </span>
  )
}

function StatusToggle({ isActive }: { isActive: boolean }) {
  return (
    <button className={cn('flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
      isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
    )}>
      {isActive ? (
        <>
          <ToggleRight className="w-4 h-4" />
          Active
        </>
      ) : (
        <>
          <ToggleLeft className="w-4 h-4" />
          Inactive
        </>
      )}
    </button>
  )
}

function PriceRuleCard({ rule }: { rule: PriceRule }) {
  const typeIcons: Record<string, React.ReactNode> = {
    BULK_DISCOUNT: <Package className="w-5 h-5" />,
    PERCENTAGE_DISCOUNT: <Percent className="w-5 h-5" />,
    TIERED_PRICING: <TrendingUp className="w-5 h-5" />,
    SEASONAL: <Sun className="w-5 h-5" />,
  }

  const typeLabels: Record<string, string> = {
    BULK_DISCOUNT: 'Bulk Discount',
    PERCENTAGE_DISCOUNT: 'Percentage Discount',
    TIERED_PRICING: 'Tiered Pricing',
    SEASONAL: 'Seasonal',
  }

  return (
    <div className={cn('card p-4', !rule.isActive && 'opacity-60')}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
            {typeIcons[rule.type]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">{rule.name}</h3>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {typeLabels[rule.type]}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
              <span className="font-medium text-primary-600">{rule.value}% off</span>
              {rule.minQuantity && <span>Min qty: {rule.minQuantity}</span>}
              {rule.customerTier && <span>Tier: {rule.customerTier}</span>}
              {rule.seasonType && <span>Season: {rule.seasonType}</span>}
              {rule.brands.length > 0 && <span>Brands: {rule.brands.join(', ')}</span>}
              {rule.categories.length > 0 && <span>Categories: {rule.categories.join(', ')}</span>}
            </div>
            {(rule.startDate || rule.endDate) && (
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {rule.startDate && formatDate(rule.startDate)}
                {rule.startDate && rule.endDate && ' - '}
                {rule.endDate && formatDate(rule.endDate)}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusToggle isActive={rule.isActive} />
          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-danger-600 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function QuickCreateCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="card p-4 text-left hover:border-primary-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </button>
  )
}
