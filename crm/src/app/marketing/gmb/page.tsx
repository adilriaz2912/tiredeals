'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  MapPin,
  Phone,
  Globe,
  Navigation,
  Star,
  MessageSquare,
  Eye,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Camera,
  Clock,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Image as ImageIcon,
  ThumbsUp,
  Reply,
} from 'lucide-react'
import { cn, formatNumber, formatDate } from '@/lib/utils'

interface Review {
  id: string
  author: string
  rating: number
  date: Date
  text: string
  reply?: string
  replyDate?: Date
}

interface InsightMetric {
  label: string
  value: number
  previousValue: number
  change: number
}

// Mock data
const businessInfo = {
  name: 'TireDeals',
  address: '123 Main Street, New York, NY 10001',
  phone: '(555) 123-4567',
  website: 'https://tiredeals.com',
  category: 'Tire Shop',
  rating: 4.7,
  totalReviews: 342,
  verified: true,
  lastUpdated: new Date(Date.now() - 86400000),
}

const insights: InsightMetric[] = [
  { label: 'Total Views', value: 15420, previousValue: 12850, change: 20.0 },
  { label: 'Search Views', value: 12340, previousValue: 10200, change: 21.0 },
  { label: 'Maps Views', value: 3080, previousValue: 2650, change: 16.2 },
  { label: 'Website Clicks', value: 2450, previousValue: 2100, change: 16.7 },
  { label: 'Direction Requests', value: 890, previousValue: 780, change: 14.1 },
  { label: 'Phone Calls', value: 345, previousValue: 290, change: 19.0 },
]

const searchQueries = [
  { query: 'tire shop near me', impressions: 4520, percentage: 29 },
  { query: 'tiredeals', impressions: 3200, percentage: 21 },
  { query: 'buy tires new york', impressions: 2100, percentage: 14 },
  { query: 'winter tires nyc', impressions: 1800, percentage: 12 },
  { query: 'tire installation', impressions: 1450, percentage: 9 },
  { query: 'cheap tires near me', impressions: 1200, percentage: 8 },
  { query: 'michelin tires new york', impressions: 1150, percentage: 7 },
]

const recentReviews: Review[] = [
  {
    id: '1',
    author: 'John Smith',
    rating: 5,
    date: new Date(Date.now() - 86400000),
    text: 'Great selection of tires and excellent customer service! The team helped me find the perfect tires for my SUV at a great price. Will definitely come back.',
    reply: 'Thank you John! We appreciate your business and look forward to seeing you again.',
    replyDate: new Date(Date.now() - 43200000),
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    rating: 5,
    date: new Date(Date.now() - 172800000),
    text: 'Fast shipping and easy ordering process. The tires were exactly as described. Very happy with my purchase!',
  },
  {
    id: '3',
    author: 'Mike Wilson',
    rating: 4,
    date: new Date(Date.now() - 345600000),
    text: 'Good prices and quality tires. Shipping took a bit longer than expected but overall satisfied.',
    reply: 'Thanks for the feedback Mike! We\'re working on improving our shipping times.',
    replyDate: new Date(Date.now() - 259200000),
  },
  {
    id: '4',
    author: 'Emily Brown',
    rating: 5,
    date: new Date(Date.now() - 432000000),
    text: 'Best tire deals I\'ve found online. The installation coordination with local shops was seamless. Highly recommend!',
  },
  {
    id: '5',
    author: 'David Lee',
    rating: 3,
    date: new Date(Date.now() - 518400000),
    text: 'Product was good but had some issues with the website. Customer service resolved it quickly though.',
  },
]

const ratingDistribution = [
  { stars: 5, count: 245, percentage: 72 },
  { stars: 4, count: 62, percentage: 18 },
  { stars: 3, count: 20, percentage: 6 },
  { stars: 2, count: 10, percentage: 3 },
  { stars: 1, count: 5, percentage: 1 },
]

const weeklyActivity = [
  { day: 'Mon', views: 2100, actions: 450 },
  { day: 'Tue', views: 2350, actions: 520 },
  { day: 'Wed', views: 2200, actions: 480 },
  { day: 'Thu', views: 2450, actions: 540 },
  { day: 'Fri', views: 2680, actions: 620 },
  { day: 'Sat', views: 2150, actions: 470 },
  { day: 'Sun', views: 1490, actions: 340 },
]

export default function GMBAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="min-h-screen">
      <Header
        title="Google My Business"
        subtitle="Local presence and reputation management"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input w-40"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open GMB
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Business Profile Card */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                TD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{businessInfo.name}</h2>
                  {businessInfo.verified && (
                    <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {businessInfo.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {businessInfo.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-gray-900">{businessInfo.rating}</span>
                    <span className="text-gray-500">({businessInfo.totalReviews} reviews)</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    Last updated: {formatDate(businessInfo.lastUpdated)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary">
                <Camera className="w-4 h-4 mr-2" />
                Add Photos
              </button>
              <button className="btn btn-secondary">
                <MessageSquare className="w-4 h-4 mr-2" />
                Post Update
              </button>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {insights.map((metric) => (
            <InsightCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Weekly Activity</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Views
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Actions
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="h-48 flex items-end justify-between gap-4">
                {weeklyActivity.map((day) => {
                  const maxViews = Math.max(...weeklyActivity.map(d => d.views))

                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="text-xs text-gray-600 font-medium">{day.views}</div>
                      <div className="w-full flex gap-1 items-end" style={{ height: '120px' }}>
                        <div
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{ height: `${(day.views / maxViews) * 100}%` }}
                        />
                        <div
                          className="flex-1 bg-green-500 rounded-t"
                          style={{ height: `${(day.actions / maxViews) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">{day.day}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Rating Distribution</h3>
            </div>
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-gray-900">{businessInfo.rating}</div>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'w-5 h-5',
                          star <= Math.floor(businessInfo.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{businessInfo.totalReviews} reviews</p>
                </div>
              </div>
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="w-3 text-xs text-gray-600">{item.stars}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-xs text-gray-500 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Queries */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Top Search Queries</h3>
              <p className="text-sm text-gray-500">How customers find your business</p>
            </div>
            <div className="card-body space-y-3">
              {searchQueries.map((query, index) => (
                <div key={query.query} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{query.query}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${query.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{formatNumber(query.impressions)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
                <p className="text-sm text-gray-500">Respond to build trust</p>
              </div>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                {recentReviews.filter(r => !r.reply).length} need reply
              </span>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {recentReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Optimization Suggestions</h3>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-3 gap-4">
            <SuggestionCard
              icon={<ImageIcon className="w-5 h-5" />}
              title="Add More Photos"
              description="Businesses with photos get 42% more requests for directions"
              action="Upload Photos"
              color="blue"
            />
            <SuggestionCard
              icon={<MessageSquare className="w-5 h-5" />}
              title="Reply to Reviews"
              description="You have 2 reviews without responses"
              action="Respond Now"
              color="amber"
            />
            <SuggestionCard
              icon={<Clock className="w-5 h-5" />}
              title="Update Hours"
              description="Confirm your business hours are up to date"
              action="Review Hours"
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightCard({ metric }: { metric: InsightMetric }) {
  const isPositive = metric.change >= 0

  return (
    <div className="card p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wider">{metric.label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{formatNumber(metric.value)}</p>
      <div className={cn(
        'flex items-center gap-1 text-xs mt-1',
        isPositive ? 'text-green-600' : 'text-red-600'
      )}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {Math.abs(metric.change).toFixed(1)}%
      </div>
    </div>
  )
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            {review.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.author}</p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'w-3 h-3',
                      star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
            </div>
          </div>
        </div>
        {!review.reply && (
          <button className="btn btn-secondary text-xs">
            <Reply className="w-3 h-3 mr-1" />
            Reply
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2">{review.text}</p>
      {review.reply && (
        <div className="mt-3 pl-4 border-l-2 border-gray-200">
          <p className="text-xs font-medium text-gray-900">Your response • {formatDate(review.replyDate!)}</p>
          <p className="text-sm text-gray-600 mt-1">{review.reply}</p>
        </div>
      )}
    </div>
  )
}

function SuggestionCard({
  icon,
  title,
  description,
  action,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  color: 'blue' | 'amber' | 'green'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
  }

  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', colors[color])}>
        {icon}
      </div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <button className="btn btn-secondary text-sm mt-3">{action}</button>
    </div>
  )
}
