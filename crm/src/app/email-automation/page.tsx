'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Plus,
  Mail,
  Send,
  Clock,
  CheckCircle,
  Pause,
  Play,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Zap,
  ShoppingCart,
  Truck,
  Package,
  Star,
  Gift,
  AlertTriangle,
  Users,
  TrendingUp,
  MousePointer,
} from 'lucide-react'
import { cn, formatDate, formatNumber } from '@/lib/utils'

type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'PAUSED'
type EmailTrigger = 'ORDER_PLACED' | 'ORDER_SHIPPED' | 'ORDER_DELIVERED' | 'CART_ABANDONED' | 'WARRANTY_EXPIRING' | 'REVIEW_REQUEST' | 'LOYALTY_TIER_CHANGE'

interface Campaign {
  id: string
  name: string
  type: string
  status: CampaignStatus
  subject: string
  scheduledAt: Date | null
  sentAt: Date | null
  stats: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
  }
}

interface AutomationRule {
  id: string
  name: string
  trigger: EmailTrigger
  isActive: boolean
  delayMinutes: number
  subject: string
  stats: {
    sent: number
    opened: number
    clicked: number
  }
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Winter Tire Sale 2024',
    type: 'PROMOTIONAL',
    status: 'SENT',
    subject: '❄️ Winter is Coming - 25% Off All Winter Tires!',
    scheduledAt: new Date(Date.now() - 604800000),
    sentAt: new Date(Date.now() - 604800000),
    stats: { sent: 5420, delivered: 5280, opened: 2112, clicked: 845, bounced: 140 },
  },
  {
    id: '2',
    name: 'Monthly Newsletter - January',
    type: 'NEWSLETTER',
    status: 'SCHEDULED',
    subject: 'TireDeals Monthly: New Arrivals & Expert Tips',
    scheduledAt: new Date(Date.now() + 172800000),
    sentAt: null,
    stats: { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0 },
  },
  {
    id: '3',
    name: 'Black Friday Preview',
    type: 'PROMOTIONAL',
    status: 'DRAFT',
    subject: 'Early Access: Black Friday Deals Start Now!',
    scheduledAt: null,
    sentAt: null,
    stats: { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0 },
  },
  {
    id: '4',
    name: 'Loyalty Member Exclusive',
    type: 'LOYALTY',
    status: 'SENT',
    subject: '🎁 Gold Member Exclusive: Extra 10% Off This Weekend',
    scheduledAt: new Date(Date.now() - 259200000),
    sentAt: new Date(Date.now() - 259200000),
    stats: { sent: 1250, delivered: 1220, opened: 732, clicked: 366, bounced: 30 },
  },
]

const mockAutomations: AutomationRule[] = [
  {
    id: '1',
    name: 'Order Confirmation',
    trigger: 'ORDER_PLACED',
    isActive: true,
    delayMinutes: 0,
    subject: 'Order Confirmed: #{orderNumber}',
    stats: { sent: 3420, opened: 2850, clicked: 1425 },
  },
  {
    id: '2',
    name: 'Shipping Notification',
    trigger: 'ORDER_SHIPPED',
    isActive: true,
    delayMinutes: 0,
    subject: 'Your Order is On Its Way! 🚚',
    stats: { sent: 3180, opened: 2862, clicked: 1908 },
  },
  {
    id: '3',
    name: 'Delivery Confirmation',
    trigger: 'ORDER_DELIVERED',
    isActive: true,
    delayMinutes: 0,
    subject: 'Your Tires Have Been Delivered!',
    stats: { sent: 2950, opened: 2360, clicked: 885 },
  },
  {
    id: '4',
    name: 'Abandoned Cart - First Reminder',
    trigger: 'CART_ABANDONED',
    isActive: true,
    delayMinutes: 60,
    subject: 'Did you forget something? 🛒',
    stats: { sent: 856, opened: 428, clicked: 214 },
  },
  {
    id: '5',
    name: 'Review Request',
    trigger: 'REVIEW_REQUEST',
    isActive: true,
    delayMinutes: 10080, // 7 days
    subject: 'How are your new tires? Leave a review!',
    stats: { sent: 2450, opened: 1225, clicked: 490 },
  },
  {
    id: '6',
    name: 'Warranty Expiration Notice',
    trigger: 'WARRANTY_EXPIRING',
    isActive: true,
    delayMinutes: 0,
    subject: '⚠️ Your Tire Warranty Expires Soon',
    stats: { sent: 320, opened: 224, clicked: 112 },
  },
]

const stats = {
  totalSent: 15680,
  avgOpenRate: 42.5,
  avgClickRate: 18.2,
  activeAutomations: 6,
}

const triggerConfig: Record<EmailTrigger, { label: string; icon: React.ReactNode; color: string }> = {
  ORDER_PLACED: { label: 'Order Placed', icon: <ShoppingCart className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
  ORDER_SHIPPED: { label: 'Order Shipped', icon: <Truck className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
  ORDER_DELIVERED: { label: 'Delivered', icon: <Package className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700' },
  CART_ABANDONED: { label: 'Cart Abandoned', icon: <AlertTriangle className="w-4 h-4" />, color: 'bg-amber-100 text-amber-700' },
  WARRANTY_EXPIRING: { label: 'Warranty Expiring', icon: <Clock className="w-4 h-4" />, color: 'bg-red-100 text-red-700' },
  REVIEW_REQUEST: { label: 'Review Request', icon: <Star className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-700' },
  LOYALTY_TIER_CHANGE: { label: 'Loyalty Change', icon: <Gift className="w-4 h-4" />, color: 'bg-pink-100 text-pink-700' },
}

const statusConfig: Record<CampaignStatus, { label: string; color: string; icon: React.ReactNode }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: <Edit className="w-3 h-3" /> },
  SCHEDULED: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700', icon: <Clock className="w-3 h-3" /> },
  SENDING: { label: 'Sending', color: 'bg-amber-100 text-amber-700', icon: <Send className="w-3 h-3" /> },
  SENT: { label: 'Sent', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3 h-3" /> },
  PAUSED: { label: 'Paused', color: 'bg-red-100 text-red-700', icon: <Pause className="w-3 h-3" /> },
}

export default function EmailAutomationPage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'automations'>('automations')

  return (
    <div className="min-h-screen">
      <Header
        title="Email Automation"
        subtitle="Manage automated emails and marketing campaigns"
        actions={
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'campaigns' ? 'New Campaign' : 'New Automation'}
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Emails Sent (30d)"
            value={formatNumber(stats.totalSent)}
            icon={<Send className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Avg. Open Rate"
            value={`${stats.avgOpenRate}%`}
            icon={<Mail className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Avg. Click Rate"
            value={`${stats.avgClickRate}%`}
            icon={<MousePointer className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Active Automations"
            value={stats.activeAutomations}
            icon={<Zap className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('automations')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'automations'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Automated Emails
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'campaigns'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Campaigns
            </button>
          </nav>
        </div>

        {/* Automations Tab */}
        {activeTab === 'automations' && (
          <div className="space-y-4">
            {mockAutomations.map((automation) => (
              <AutomationCard key={automation.id} automation={automation} />
            ))}
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Sent</th>
                    <th>Open Rate</th>
                    <th>Click Rate</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((campaign) => {
                    const openRate = campaign.stats.delivered > 0
                      ? ((campaign.stats.opened / campaign.stats.delivered) * 100).toFixed(1)
                      : '0'
                    const clickRate = campaign.stats.opened > 0
                      ? ((campaign.stats.clicked / campaign.stats.opened) * 100).toFixed(1)
                      : '0'

                    return (
                      <tr key={campaign.id}>
                        <td>
                          <div>
                            <p className="font-medium text-gray-900">{campaign.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">{campaign.subject}</p>
                          </div>
                        </td>
                        <td>
                          <span className="text-sm capitalize">{campaign.type.toLowerCase()}</span>
                        </td>
                        <td>
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
                            statusConfig[campaign.status].color
                          )}>
                            {statusConfig[campaign.status].icon}
                            {statusConfig[campaign.status].label}
                          </span>
                        </td>
                        <td>{formatNumber(campaign.stats.sent)}</td>
                        <td>
                          {campaign.stats.sent > 0 ? (
                            <div className="flex items-center gap-2">
                              <span>{openRate}%</span>
                              <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${Math.min(parseFloat(openRate), 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : '-'}
                        </td>
                        <td>
                          {campaign.stats.sent > 0 ? (
                            <div className="flex items-center gap-2">
                              <span>{clickRate}%</span>
                              <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${Math.min(parseFloat(clickRate), 100)}%` }}
                                />
                              </div>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="text-sm text-gray-500">
                          {campaign.sentAt
                            ? formatDate(campaign.sentAt)
                            : campaign.scheduledAt
                            ? `Scheduled: ${formatDate(campaign.scheduledAt)}`
                            : '-'}
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
                              <BarChart3 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-danger-600 hover:bg-gray-100 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Email Templates Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TemplateCard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Order Confirmation"
            description="Sent immediately after order placement"
            stats={{ sent: 3420, rate: 83.3 }}
          />
          <TemplateCard
            icon={<Truck className="w-6 h-6" />}
            title="Shipping Updates"
            description="Track package journey to customer"
            stats={{ sent: 3180, rate: 89.9 }}
          />
          <TemplateCard
            icon={<AlertTriangle className="w-6 h-6" />}
            title="Abandoned Cart"
            description="Recover lost sales with reminders"
            stats={{ sent: 856, rate: 25.0 }}
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

function AutomationCard({ automation }: { automation: AutomationRule }) {
  const trigger = triggerConfig[automation.trigger]
  const openRate = automation.stats.sent > 0
    ? ((automation.stats.opened / automation.stats.sent) * 100).toFixed(1)
    : '0'
  const clickRate = automation.stats.opened > 0
    ? ((automation.stats.clicked / automation.stats.opened) * 100).toFixed(1)
    : '0'

  const formatDelay = (minutes: number) => {
    if (minutes === 0) return 'Immediately'
    if (minutes < 60) return `${minutes} minutes`
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`
    return `${Math.floor(minutes / 1440)} days`
  }

  return (
    <div className={cn('card p-4', !automation.isActive && 'opacity-60')}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={cn('p-3 rounded-xl', trigger.color)}>
            {trigger.icon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">{automation.name}</h3>
              <span className={cn('text-xs px-2 py-1 rounded-full', trigger.color)}>
                {trigger.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{automation.subject}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDelay(automation.delayMinutes)}
              </span>
              <span>{formatNumber(automation.stats.sent)} sent</span>
              <span>{openRate}% opened</span>
              <span>{clickRate}% clicked</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              automation.isActive
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            {automation.isActive ? (
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
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({
  icon,
  title,
  description,
  stats,
}: {
  icon: React.ReactNode
  title: string
  description: string
  stats: { sent: number; rate: number }
}) {
  return (
    <div className="card p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="text-gray-600">{formatNumber(stats.sent)} sent</span>
            <span className="text-green-600">{stats.rate}% open rate</span>
          </div>
        </div>
      </div>
    </div>
  )
}
