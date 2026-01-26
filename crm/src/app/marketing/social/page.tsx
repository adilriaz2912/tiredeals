'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Plus,
  Calendar,
  Clock,
  Image as ImageIcon,
  Video,
  Link2,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Send,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Users,
} from 'lucide-react'
import { cn, formatNumber, formatDate } from '@/lib/utils'

type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube'
type PostStatus = 'published' | 'scheduled' | 'draft' | 'failed'

interface SocialAccount {
  platform: Platform
  name: string
  handle: string
  followers: number
  connected: boolean
  lastPost: Date | null
}

interface SocialPost {
  id: string
  platforms: Platform[]
  content: string
  media?: { type: 'image' | 'video'; url: string }[]
  status: PostStatus
  scheduledAt?: Date
  publishedAt?: Date
  stats?: {
    likes: number
    comments: number
    shares: number
    reach: number
  }
}

// Mock data
const accounts: SocialAccount[] = [
  { platform: 'facebook', name: 'TireDeals', handle: '@tiredeals', followers: 12500, connected: true, lastPost: new Date(Date.now() - 86400000) },
  { platform: 'instagram', name: 'TireDeals', handle: '@tiredeals', followers: 8900, connected: true, lastPost: new Date(Date.now() - 172800000) },
  { platform: 'twitter', name: 'TireDeals', handle: '@tiredeals', followers: 5200, connected: true, lastPost: new Date(Date.now() - 43200000) },
  { platform: 'linkedin', name: 'TireDeals Inc', handle: 'tiredeals', followers: 2100, connected: true, lastPost: new Date(Date.now() - 604800000) },
  { platform: 'youtube', name: 'TireDeals', handle: '@tiredeals', followers: 1850, connected: false, lastPost: null },
]

const posts: SocialPost[] = [
  {
    id: '1',
    platforms: ['facebook', 'instagram'],
    content: '❄️ Winter is coming! Get your vehicle ready with our premium winter tires. Now 25% off all winter tire brands! #WinterTires #TireDeals #SafeDriving',
    media: [{ type: 'image', url: '/posts/winter-tires.jpg' }],
    status: 'published',
    publishedAt: new Date(Date.now() - 86400000),
    stats: { likes: 245, comments: 32, shares: 18, reach: 12500 },
  },
  {
    id: '2',
    platforms: ['facebook', 'instagram', 'twitter'],
    content: '🚗 Did you know? Properly inflated tires can improve your fuel efficiency by up to 3%! Check your tire pressure monthly for optimal performance.',
    status: 'published',
    publishedAt: new Date(Date.now() - 172800000),
    stats: { likes: 189, comments: 15, shares: 42, reach: 9800 },
  },
  {
    id: '3',
    platforms: ['facebook', 'instagram'],
    content: '🎉 Flash Sale Alert! This weekend only - FREE installation with any set of 4 tires. Use code: FREEINSTALL. Limited time offer!',
    media: [{ type: 'image', url: '/posts/flash-sale.jpg' }],
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 86400000),
  },
  {
    id: '4',
    platforms: ['linkedin'],
    content: 'We\'re proud to announce our partnership with 500+ local installers nationwide! This means faster, more convenient tire installation for our customers. 🤝',
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 172800000),
  },
  {
    id: '5',
    platforms: ['twitter'],
    content: '⚡ Quick tip: Rotate your tires every 5,000-7,500 miles for even wear and longer tire life! #TireCare #CarMaintenance',
    status: 'draft',
  },
]

const platformConfig: Record<Platform, { icon: React.ReactNode; color: string; bgColor: string; name: string }> = {
  facebook: { icon: <Facebook className="w-4 h-4" />, color: 'text-blue-600', bgColor: 'bg-blue-100', name: 'Facebook' },
  instagram: { icon: <Instagram className="w-4 h-4" />, color: 'text-pink-600', bgColor: 'bg-pink-100', name: 'Instagram' },
  twitter: { icon: <Twitter className="w-4 h-4" />, color: 'text-sky-500', bgColor: 'bg-sky-100', name: 'Twitter' },
  linkedin: { icon: <Linkedin className="w-4 h-4" />, color: 'text-blue-700', bgColor: 'bg-blue-100', name: 'LinkedIn' },
  youtube: { icon: <Youtube className="w-4 h-4" />, color: 'text-red-600', bgColor: 'bg-red-100', name: 'YouTube' },
}

const stats = {
  totalFollowers: 30550,
  totalEngagement: 4.2,
  postsThisMonth: 24,
  scheduledPosts: 5,
}

const topPosts = [
  { content: 'Winter tire sale announcement', likes: 456, reach: 18500 },
  { content: 'Customer testimonial video', likes: 389, reach: 15200 },
  { content: 'Tire care tips infographic', likes: 312, reach: 12800 },
]

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'calendar' | 'analytics'>('posts')
  const [showComposer, setShowComposer] = useState(false)

  return (
    <div className="min-h-screen">
      <Header
        title="Social Media Hub"
        subtitle="Manage all your social media accounts in one place"
        actions={
          <button onClick={() => setShowComposer(true)} className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Connected Accounts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {accounts.map((account) => (
            <AccountCard key={account.platform} account={account} />
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Followers"
            value={formatNumber(stats.totalFollowers)}
            icon={<Users className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Avg. Engagement"
            value={`${stats.totalEngagement}%`}
            icon={<Heart className="w-5 h-5" />}
            color="pink"
          />
          <StatCard
            title="Posts This Month"
            value={stats.postsThisMonth}
            icon={<Send className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Scheduled Posts"
            value={stats.scheduledPosts}
            icon={<Calendar className="w-5 h-5" />}
            color="purple"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'posts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'calendar'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={cn(
                'py-4 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'analytics'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
          </nav>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-gray-900">Top Performing Posts</h3>
                </div>
                <div className="card-body space-y-3">
                  {topPosts.map((post, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.content}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {formatNumber(post.reach)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Times to Post */}
              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-gray-900">Best Times to Post</h3>
                </div>
                <div className="card-body space-y-2">
                  <TimeSlot day="Monday" time="9:00 AM" engagement="High" />
                  <TimeSlot day="Wednesday" time="12:00 PM" engagement="High" />
                  <TimeSlot day="Friday" time="3:00 PM" engagement="Medium" />
                  <TimeSlot day="Saturday" time="10:00 AM" engagement="High" />
                </div>
              </div>

              {/* Content Ideas */}
              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-gray-900">Content Ideas</h3>
                </div>
                <div className="card-body space-y-2">
                  <ContentIdea title="Customer Spotlight" description="Feature a happy customer review" />
                  <ContentIdea title="Behind the Scenes" description="Show your warehouse or team" />
                  <ContentIdea title="Tire Tips Tuesday" description="Weekly tire care tips" />
                  <ContentIdea title="Weekend Sale" description="Promote upcoming deals" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="card p-6">
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Content Calendar</h3>
              <p className="text-gray-500 mt-2">Drag and drop posts to schedule them on specific dates</p>
              <button className="btn btn-primary mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Post
              </button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Followers Growth</h3>
              </div>
              <div className="card-body">
                <div className="h-48 flex items-end justify-between gap-4">
                  {['Oct', 'Nov', 'Dec', 'Jan'].map((month, index) => {
                    const heights = [60, 70, 85, 100]
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary-500 rounded-t"
                          style={{ height: `${heights[index]}%` }}
                        />
                        <span className="text-xs text-gray-500">{month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Engagement by Platform</h3>
              </div>
              <div className="card-body space-y-4">
                {accounts.filter(a => a.connected).map((account) => (
                  <div key={account.platform} className="flex items-center gap-4">
                    <div className={cn('p-2 rounded-lg', platformConfig[account.platform].bgColor, platformConfig[account.platform].color)}>
                      {platformConfig[account.platform].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{platformConfig[account.platform].name}</span>
                        <span className="text-sm text-gray-600">{(Math.random() * 5 + 2).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className={cn('h-full rounded-full', account.platform === 'facebook' ? 'bg-blue-500' : account.platform === 'instagram' ? 'bg-pink-500' : account.platform === 'twitter' ? 'bg-sky-500' : 'bg-blue-700')}
                          style={{ width: `${Math.random() * 40 + 40}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Post Composer Modal */}
        {showComposer && (
          <PostComposer onClose={() => setShowComposer(false)} accounts={accounts} />
        )}
      </div>
    </div>
  )
}

function AccountCard({ account }: { account: SocialAccount }) {
  const config = platformConfig[account.platform]

  return (
    <div className={cn('card p-4', !account.connected && 'opacity-50')}>
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', config.bgColor, config.color)}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{account.name}</p>
          <p className="text-xs text-gray-500">{formatNumber(account.followers)} followers</p>
        </div>
        {account.connected ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <button className="text-xs text-primary-600 hover:text-primary-700">Connect</button>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: 'blue' | 'pink' | 'green' | 'purple' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
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

function PostCard({ post }: { post: SocialPost }) {
  const statusConfig: Record<PostStatus, { label: string; color: string; icon: React.ReactNode }> = {
    published: { label: 'Published', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3 h-3" /> },
    scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700', icon: <Clock className="w-3 h-3" /> },
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: <Edit className="w-3 h-3" /> },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: <AlertCircle className="w-3 h-3" /> },
  }

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {post.platforms.map((platform) => (
            <span key={platform} className={cn('p-1.5 rounded', platformConfig[platform].bgColor, platformConfig[platform].color)}>
              {platformConfig[platform].icon}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full', statusConfig[post.status].color)}>
            {statusConfig[post.status].icon}
            {statusConfig[post.status].label}
          </span>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 whitespace-pre-wrap">{post.content}</p>

      {post.media && post.media.length > 0 && (
        <div className="mt-3 flex gap-2">
          {post.media.map((media, index) => (
            <div key={index} className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              {media.type === 'image' ? (
                <ImageIcon className="w-6 h-6 text-gray-400" />
              ) : (
                <Video className="w-6 h-6 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
        {post.status === 'published' && post.stats ? (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {formatNumber(post.stats.likes)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post.stats.comments}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-3 h-3" />
              {post.stats.shares}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatNumber(post.stats.reach)} reach
            </span>
          </div>
        ) : post.status === 'scheduled' ? (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Scheduled for {formatDate(post.scheduledAt!)}
          </span>
        ) : (
          <span>Draft</span>
        )}

        {post.publishedAt && (
          <span>{formatDate(post.publishedAt)}</span>
        )}
      </div>
    </div>
  )
}

function TimeSlot({ day, time, engagement }: { day: string; time: string; engagement: string }) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <div>
        <p className="text-sm font-medium text-gray-900">{day}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <span className={cn(
        'text-xs px-2 py-1 rounded-full',
        engagement === 'High' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      )}>
        {engagement}
      </span>
    </div>
  )
}

function ContentIdea({ title, description }: { title: string; description: string }) {
  return (
    <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </button>
  )
}

function PostComposer({ onClose, accounts }: { onClose: () => void; accounts: SocialAccount[] }) {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['facebook', 'instagram'])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="p-4">
          {/* Platform Selection */}
          <div className="flex flex-wrap gap-2 mb-4">
            {accounts.filter(a => a.connected).map((account) => (
              <button
                key={account.platform}
                onClick={() => {
                  setSelectedPlatforms(prev =>
                    prev.includes(account.platform)
                      ? prev.filter(p => p !== account.platform)
                      : [...prev, account.platform]
                  )
                }}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors',
                  selectedPlatforms.includes(account.platform)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className={platformConfig[account.platform].color}>
                  {platformConfig[account.platform].icon}
                </span>
                <span className="text-sm font-medium">{platformConfig[account.platform].name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          {/* Media Buttons */}
          <div className="flex items-center gap-2 mt-3">
            <button className="btn btn-secondary text-sm">
              <ImageIcon className="w-4 h-4 mr-2" />
              Photo
            </button>
            <button className="btn btn-secondary text-sm">
              <Video className="w-4 h-4 mr-2" />
              Video
            </button>
            <button className="btn btn-secondary text-sm">
              <Link2 className="w-4 h-4 mr-2" />
              Link
            </button>
          </div>

          {/* Character Count */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>{content.length} characters</span>
            {selectedPlatforms.includes('twitter') && content.length > 280 && (
              <span className="text-red-500">Twitter limit: 280 characters</span>
            )}
          </div>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <button className="btn btn-secondary">
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn btn-secondary">
              Save Draft
            </button>
            <button className="btn btn-primary" disabled={!content || selectedPlatforms.length === 0}>
              <Send className="w-4 h-4 mr-2" />
              Post Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
