'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  MousePointer,
  Eye,
  ShoppingCart,
  LogOut,
  Clock,
  Mail,
  Zap,
  Play,
  Pause,
  Edit,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  AlertTriangle,
  Settings,
  Plus,
  BarChart3,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

type TriggerType = 'EXIT_INTENT' | 'BROWSE_ABANDON' | 'PRODUCT_VIEW' | 'CATEGORY_VIEW' | 'PRICE_DROP' | 'BACK_IN_STOCK'

interface AutomationRule {
  id: string
  name: string
  trigger: TriggerType
  isActive: boolean
  conditions: string[]
  emailSequence: { delay: string; subject: string }[]
  stats: {
    triggered: number
    emailsSent: number
    converted: number
    revenue: number
  }
}

// Mock data
const automationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Exit Intent - First Time Visitor',
    trigger: 'EXIT_INTENT',
    isActive: true,
    conditions: ['First visit', 'Viewed 2+ products', 'No cart activity'],
    emailSequence: [
      { delay: 'Immediate popup', subject: '10% Off Your First Order!' },
      { delay: '1 hour', subject: 'Still thinking about those tires?' },
    ],
    stats: { triggered: 2450, emailsSent: 1840, converted: 156, revenue: 24850 },
  },
  {
    id: '2',
    name: 'Browse Abandonment - Product Viewers',
    trigger: 'BROWSE_ABANDON',
    isActive: true,
    conditions: ['Viewed product page', 'Spent 30+ seconds', 'Did not add to cart', 'Left site'],
    emailSequence: [
      { delay: '2 hours', subject: 'Still looking for the perfect tires?' },
      { delay: '24 hours', subject: 'Your viewed tires are selling fast!' },
      { delay: '72 hours', subject: 'Last chance: Special offer inside' },
    ],
    stats: { triggered: 5680, emailsSent: 12450, converted: 342, revenue: 54680 },
  },
  {
    id: '3',
    name: 'Category Browser',
    trigger: 'CATEGORY_VIEW',
    isActive: true,
    conditions: ['Viewed category', 'Browsed 3+ products', 'No cart action', 'Registered user'],
    emailSequence: [
      { delay: '4 hours', subject: 'Top picks in {category} for your vehicle' },
    ],
    stats: { triggered: 1890, emailsSent: 1420, converted: 89, revenue: 14230 },
  },
  {
    id: '4',
    name: 'Price Drop Alert',
    trigger: 'PRICE_DROP',
    isActive: true,
    conditions: ['Previously viewed product', 'Price reduced 10%+'],
    emailSequence: [
      { delay: 'Immediate', subject: '🎉 Price Drop! {product} is now {price}' },
    ],
    stats: { triggered: 890, emailsSent: 890, converted: 178, revenue: 28450 },
  },
  {
    id: '5',
    name: 'Back in Stock',
    trigger: 'BACK_IN_STOCK',
    isActive: true,
    conditions: ['Viewed out-of-stock product', 'Item now available'],
    emailSequence: [
      { delay: 'Immediate', subject: '🔔 {product} is back in stock!' },
    ],
    stats: { triggered: 340, emailsSent: 340, converted: 98, revenue: 15680 },
  },
  {
    id: '6',
    name: 'Exit Intent - Cart Abandoners',
    trigger: 'EXIT_INTENT',
    isActive: false,
    conditions: ['Has items in cart', 'Moving to exit'],
    emailSequence: [
      { delay: 'Immediate popup', subject: 'Wait! Complete your order for free shipping' },
    ],
    stats: { triggered: 1250, emailsSent: 0, converted: 0, revenue: 0 },
  },
]

const stats = {
  totalTriggered: 12500,
  totalConverted: 863,
  conversionRate: 6.9,
  revenueRecovered: 137890,
}

const triggerConfig: Record<TriggerType, { label: string; icon: React.ReactNode; color: string; description: string }> = {
  EXIT_INTENT: {
    label: 'Exit Intent',
    icon: <LogOut className="w-4 h-4" />,
    color: 'bg-red-100 text-red-700',
    description: 'Triggered when user moves cursor to leave',
  },
  BROWSE_ABANDON: {
    label: 'Browse Abandonment',
    icon: <Eye className="w-4 h-4" />,
    color: 'bg-amber-100 text-amber-700',
    description: 'User viewed products but left without action',
  },
  PRODUCT_VIEW: {
    label: 'Product View',
    icon: <MousePointer className="w-4 h-4" />,
    color: 'bg-blue-100 text-blue-700',
    description: 'Specific product page was viewed',
  },
  CATEGORY_VIEW: {
    label: 'Category Browse',
    icon: <Eye className="w-4 h-4" />,
    color: 'bg-purple-100 text-purple-700',
    description: 'User browsed a category page',
  },
  PRICE_DROP: {
    label: 'Price Drop',
    icon: <DollarSign className="w-4 h-4" />,
    color: 'bg-green-100 text-green-700',
    description: 'Previously viewed item price decreased',
  },
  BACK_IN_STOCK: {
    label: 'Back in Stock',
    icon: <ShoppingCart className="w-4 h-4" />,
    color: 'bg-cyan-100 text-cyan-700',
    description: 'Out-of-stock item is available again',
  },
}

const recentTriggers = [
  { customer: 'john@email.com', trigger: 'BROWSE_ABANDON', product: 'Michelin Defender T+H', time: '5 min ago', status: 'email_sent' },
  { customer: 'sarah@email.com', trigger: 'EXIT_INTENT', product: null, time: '12 min ago', status: 'popup_shown' },
  { customer: 'mike@email.com', trigger: 'PRICE_DROP', product: 'Goodyear Assurance', time: '18 min ago', status: 'converted' },
  { customer: 'emily@email.com', trigger: 'BROWSE_ABANDON', product: 'Bridgestone Turanza', time: '25 min ago', status: 'email_queued' },
  { customer: 'david@email.com', trigger: 'BACK_IN_STOCK', product: 'Continental TrueContact', time: '32 min ago', status: 'email_sent' },
]

export default function BrowseAbandonmentPage() {
  const [activeTab, setActiveTab] = useState<'rules' | 'activity'>('rules')

  return (
    <div className="min-h-screen">
      <Header
        title="Browse Abandonment & Exit Intent"
        subtitle="Recover lost visitors with automated engagement"
        actions={
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Triggers (30d)"
            value={formatNumber(stats.totalTriggered)}
            icon={<Zap className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Conversions"
            value={formatNumber(stats.totalConverted)}
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Revenue Recovered"
            value={formatCurrency(stats.revenueRecovered)}
            icon={<DollarSign className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* How It Works */}
        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <WorkflowStep
              step={1}
              icon={<Eye className="w-5 h-5" />}
              title="Visitor Activity"
              description="Track page views, time on site, and exit behavior"
            />
            <WorkflowStep
              step={2}
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Trigger Detection"
              description="Identify drop-off patterns and exit intent signals"
            />
            <WorkflowStep
              step={3}
              icon={<Mail className="w-5 h-5" />}
              title="Automated Outreach"
              description="Send personalized emails based on browsing history"
            />
            <WorkflowStep
              step={4}
              icon={<DollarSign className="w-5 h-5" />}
              title="Recovery"
              description="Convert visitors into customers with targeted offers"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
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
              Automation Rules
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'activity'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Recent Activity
            </button>
          </nav>
        </div>

        {/* Automation Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <AutomationRuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Recent Triggers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Trigger</th>
                    <th>Product</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTriggers.map((trigger, index) => (
                    <tr key={index}>
                      <td className="font-medium text-gray-900">{trigger.customer}</td>
                      <td>
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
                          triggerConfig[trigger.trigger as TriggerType].color
                        )}>
                          {triggerConfig[trigger.trigger as TriggerType].icon}
                          {triggerConfig[trigger.trigger as TriggerType].label}
                        </span>
                      </td>
                      <td className="text-gray-600">{trigger.product || '-'}</td>
                      <td className="text-gray-500">{trigger.time}</td>
                      <td>
                        <StatusBadge status={trigger.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
        </div>
      </div>
    </div>
  )
}

function WorkflowStep({
  step,
  icon,
  title,
  description,
}: {
  step: number
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {step}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-400">{icon}</span>
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

function AutomationRuleCard({ rule }: { rule: AutomationRule }) {
  const trigger = triggerConfig[rule.trigger]
  const conversionRate = rule.stats.emailsSent > 0
    ? ((rule.stats.converted / rule.stats.emailsSent) * 100).toFixed(1)
    : '0'

  return (
    <div className={cn('card p-4', !rule.isActive && 'opacity-60')}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={cn('p-3 rounded-xl', trigger.color)}>
            {trigger.icon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">{rule.name}</h3>
              <span className={cn('text-xs px-2 py-1 rounded-full', trigger.color)}>
                {trigger.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{trigger.description}</p>

            {/* Conditions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {rule.conditions.map((condition, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {condition}
                </span>
              ))}
            </div>

            {/* Email Sequence */}
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-700 mb-2">Email Sequence:</p>
              <div className="flex flex-wrap gap-2">
                {rule.emailSequence.map((email, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {email.delay}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <span className="text-gray-600">
                <span className="font-medium text-gray-900">{formatNumber(rule.stats.triggered)}</span> triggered
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-gray-900">{formatNumber(rule.stats.emailsSent)}</span> emails
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-green-600">{formatNumber(rule.stats.converted)}</span> converted
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-green-600">{conversionRate}%</span> rate
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-green-600">{formatCurrency(rule.stats.revenue)}</span> revenue
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              rule.isActive
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            {rule.isActive ? (
              <>
                <Play className="w-4 h-4" />
                Active
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                Paused
              </>
            )}
          </button>
          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string }> = {
    email_sent: { label: 'Email Sent', color: 'bg-blue-100 text-blue-700' },
    email_queued: { label: 'Queued', color: 'bg-gray-100 text-gray-700' },
    popup_shown: { label: 'Popup Shown', color: 'bg-purple-100 text-purple-700' },
    converted: { label: 'Converted', color: 'bg-green-100 text-green-700' },
  }

  const { label, color } = config[status] || { label: status, color: 'bg-gray-100 text-gray-700' }

  return (
    <span className={cn('inline-flex px-2 py-1 text-xs font-medium rounded-full', color)}>
      {label}
    </span>
  )
}
