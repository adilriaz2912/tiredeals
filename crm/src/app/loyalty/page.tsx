'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Gift,
  Star,
  TrendingUp,
  Users,
  Award,
  Search,
  Plus,
  Edit,
  Settings,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data
const loyaltyStats = {
  totalMembers: 1250,
  activeMembers: 1120,
  pointsIssued: 245000,
  pointsRedeemed: 89000,
  avgPointsPerCustomer: 196,
}

const tierBreakdown = [
  { tier: 'PLATINUM', count: 45, color: 'bg-purple-500', label: 'Platinum' },
  { tier: 'GOLD', count: 180, color: 'bg-yellow-500', label: 'Gold' },
  { tier: 'SILVER', count: 425, color: 'bg-gray-400', label: 'Silver' },
  { tier: 'BRONZE', count: 600, color: 'bg-amber-600', label: 'Bronze' },
]

const rewards = [
  { id: '1', name: '$10 Off Order', pointsCost: 500, type: 'FLAT_DISCOUNT', value: 10, redemptions: 145, isActive: true },
  { id: '2', name: '$25 Off Order', pointsCost: 1000, type: 'FLAT_DISCOUNT', value: 25, redemptions: 89, isActive: true },
  { id: '3', name: 'Free Shipping', pointsCost: 300, type: 'FREE_SHIPPING', value: null, redemptions: 234, isActive: true },
  { id: '4', name: '10% Off Order', pointsCost: 750, type: 'PERCENT_DISCOUNT', value: 10, redemptions: 67, isActive: true },
  { id: '5', name: 'Free Installation (4 tires)', pointsCost: 2000, type: 'FREE_INSTALLATION', value: null, redemptions: 23, isActive: true },
]

const recentActivity = [
  { id: '1', customer: 'John Smith', action: 'Earned 89 points', description: 'Order TD-A1B2C3', date: new Date(Date.now() - 3600000) },
  { id: '2', customer: 'Sarah Johnson', action: 'Redeemed 500 points', description: '$10 Off Order', date: new Date(Date.now() - 7200000) },
  { id: '3', customer: 'Mike Wilson', action: 'Upgraded to Gold', description: 'Total spent $2,500+', date: new Date(Date.now() - 14400000) },
  { id: '4', customer: 'Emily Brown', action: 'Earned 50 points', description: 'Product Review', date: new Date(Date.now() - 28800000) },
  { id: '5', customer: 'David Lee', action: 'Redeemed 2000 points', description: 'Free Installation', date: new Date(Date.now() - 43200000) },
]

const topMembers = [
  { id: '1', name: 'Mike Wilson', tier: 'PLATINUM', points: 5600, totalSpent: 8920, orders: 15 },
  { id: '2', name: 'David Lee', tier: 'GOLD', points: 3200, totalSpent: 4250, orders: 10 },
  { id: '3', name: 'John Smith', tier: 'GOLD', points: 2450, totalSpent: 3567, orders: 8 },
  { id: '4', name: 'Sarah Johnson', tier: 'SILVER', points: 1250, totalSpent: 1890, orders: 4 },
  { id: '5', name: 'Emily Brown', tier: 'BRONZE', points: 340, totalSpent: 456, orders: 1 },
]

const tierColors: Record<string, string> = {
  BRONZE: 'bg-amber-100 text-amber-700',
  SILVER: 'bg-gray-200 text-gray-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  PLATINUM: 'bg-purple-100 text-purple-700',
}

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'members'>('overview')

  return (
    <div className="min-h-screen">
      <Header
        title="Loyalty Program"
        subtitle="Manage rewards and customer loyalty"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{loyaltyStats.totalMembers.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Members</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{loyaltyStats.activeMembers.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Active (90d)</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{loyaltyStats.pointsIssued.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Points Issued</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{loyaltyStats.pointsRedeemed.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Points Redeemed</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{loyaltyStats.avgPointsPerCustomer}</p>
                <p className="text-sm text-gray-500">Avg Points/Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`tab ${activeTab === 'rewards' ? 'tab-active' : ''}`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`tab ${activeTab === 'members' ? 'tab-active' : ''}`}
          >
            Top Members
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tier Distribution */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Tier Distribution</h3>
              </div>
              <div className="card-body space-y-4">
                {tierBreakdown.map((tier) => (
                  <div key={tier.tier}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{tier.label}</span>
                      <span className="text-sm text-gray-500">{tier.count} members</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${tier.color}`}
                        style={{ width: `${(tier.count / loyaltyStats.totalMembers) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          {activity.action.includes('Earned') ? (
                            <TrendingUp className="w-4 h-4 text-success-600" />
                          ) : activity.action.includes('Redeemed') ? (
                            <Gift className="w-4 h-4 text-purple-600" />
                          ) : (
                            <Award className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
                          <p className="text-xs text-gray-500">
                            {activity.action} • {activity.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(activity.date, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button className="btn-primary btn-md">
                <Plus className="w-4 h-4" />
                Add Reward
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="card p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <Gift className="w-5 h-5 text-primary-600" />
                    </div>
                    <button className="btn-ghost btn-sm">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{reward.name}</h4>
                  <p className="text-2xl font-bold text-primary-600 mb-3">
                    {reward.pointsCost.toLocaleString()} pts
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{reward.redemptions} redemptions</span>
                    <span className={reward.isActive ? 'text-success-600' : 'text-gray-400'}>
                      {reward.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Program Settings */}
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Program Settings</h3>
                <button className="btn-ghost btn-sm">
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Points per $1 spent</p>
                    <p className="text-xl font-bold">1 point</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Review bonus</p>
                    <p className="text-xl font-bold">50 points</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Referral bonus</p>
                    <p className="text-xl font-bold">200 points</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Points expiry</p>
                    <p className="text-xl font-bold">24 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Member</th>
                    <th>Tier</th>
                    <th>Points</th>
                    <th>Total Spent</th>
                    <th>Orders</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topMembers.map((member, index) => (
                    <tr key={member.id}>
                      <td>
                        <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <Link href={`/customers/${member.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                          {member.name}
                        </Link>
                      </td>
                      <td>
                        <span className={`badge ${tierColors[member.tier]}`}>
                          {member.tier}
                        </span>
                      </td>
                      <td className="font-bold text-primary-600">
                        {member.points.toLocaleString()}
                      </td>
                      <td className="font-medium">{formatCurrency(member.totalSpent)}</td>
                      <td>{member.orders}</td>
                      <td>
                        <Link href={`/customers/${member.id}`} className="btn-ghost btn-sm">
                          View
                        </Link>
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
