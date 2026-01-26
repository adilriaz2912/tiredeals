'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  ShoppingBag,
  Mail,
  MessageSquare,
  Clock,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Send,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { formatCurrency, formatRelativeTime, formatDate } from '@/lib/utils'

// Mock data
const abandonedCarts = [
  {
    id: '1',
    customer: { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@email.com', phone: '5551234567' },
    cartValue: 599.96,
    itemCount: 4,
    items: [{ name: 'Michelin Defender T+H 215/55R17', quantity: 4, price: 149.99 }],
    status: 'ABANDONED',
    emailsSent: 0,
    smsSent: 0,
    abandonedAt: new Date(Date.now() - 7200000),
    discountCode: null,
  },
  {
    id: '2',
    customer: { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', phone: '5559876543' },
    cartValue: 519.96,
    itemCount: 4,
    items: [{ name: 'Goodyear Assurance 225/65R17', quantity: 4, price: 129.99 }],
    status: 'EMAIL_SENT',
    emailsSent: 1,
    smsSent: 0,
    lastEmailAt: new Date(Date.now() - 14400000),
    abandonedAt: new Date(Date.now() - 86400000),
    discountCode: 'SAVE10',
  },
  {
    id: '3',
    customer: { id: '3', firstName: 'Mike', lastName: 'Wilson', email: 'mike@email.com', phone: '5555551234' },
    cartValue: 759.96,
    itemCount: 4,
    items: [{ name: 'Bridgestone Turanza 235/45R18', quantity: 4, price: 189.99 }],
    status: 'EMAIL_SENT',
    emailsSent: 2,
    smsSent: 1,
    lastEmailAt: new Date(Date.now() - 43200000),
    lastSmsAt: new Date(Date.now() - 28800000),
    abandonedAt: new Date(Date.now() - 172800000),
    discountCode: 'COMEBACK15',
  },
  {
    id: '4',
    customer: { id: '4', firstName: 'Emily', lastName: 'Brown', email: 'emily@email.com', phone: '5552223333' },
    cartValue: 479.96,
    itemCount: 4,
    items: [{ name: 'Continental TrueContact 205/55R16', quantity: 4, price: 119.99 }],
    status: 'RECOVERED',
    emailsSent: 1,
    smsSent: 0,
    abandonedAt: new Date(Date.now() - 259200000),
    recoveredAt: new Date(Date.now() - 172800000),
    recoveredOrderId: 'TD-RECOV1',
    discountCode: 'SAVE10',
  },
  {
    id: '5',
    customer: { id: '5', firstName: 'David', lastName: 'Lee', email: 'david@email.com', phone: '5554445555' },
    cartValue: 559.96,
    itemCount: 4,
    items: [{ name: 'Pirelli P4 Four Seasons 215/60R16', quantity: 4, price: 139.99 }],
    status: 'EXPIRED',
    emailsSent: 3,
    smsSent: 1,
    abandonedAt: new Date(Date.now() - 604800000),
    discountCode: 'LASTCHANCE20',
  },
]

const stats = {
  totalAbandoned: 28,
  totalValue: 15670.50,
  recovered: 8,
  recoveredValue: 4250.00,
  recoveryRate: 28.6,
  avgCartValue: 560.00,
}

const statusConfig: Record<string, { badge: string; label: string }> = {
  ABANDONED: { badge: 'badge-warning', label: 'Abandoned' },
  EMAIL_SENT: { badge: 'badge-info', label: 'Email Sent' },
  RECOVERED: { badge: 'badge-success', label: 'Recovered' },
  EXPIRED: { badge: 'badge-gray', label: 'Expired' },
  UNSUBSCRIBED: { badge: 'badge-danger', label: 'Unsubscribed' },
}

export default function AbandonedCartsPage() {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedCarts, setSelectedCarts] = useState<string[]>([])

  const filteredCarts = abandonedCarts.filter(cart => {
    return !selectedStatus || cart.status === selectedStatus
  })

  const toggleSelectCart = (id: string) => {
    setSelectedCarts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Abandoned Cart Recovery"
        subtitle="Recover lost sales with automated follow-ups"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-50 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalAbandoned}</p>
                <p className="text-sm text-gray-500">Abandoned</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
                <p className="text-sm text-gray-500">At Risk</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.recovered}</p>
                <p className="text-sm text-gray-500">Recovered</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(stats.recoveredValue)}</p>
                <p className="text-sm text-gray-500">Recovered $</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.recoveryRate}%</p>
                <p className="text-sm text-gray-500">Recovery Rate</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(stats.avgCartValue)}</p>
                <p className="text-sm text-gray-500">Avg Cart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select w-44"
          >
            <option value="">All Status</option>
            <option value="ABANDONED">Abandoned</option>
            <option value="EMAIL_SENT">Email Sent</option>
            <option value="RECOVERED">Recovered</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <div className="flex-1" />

          {selectedCarts.length > 0 && (
            <div className="flex gap-2">
              <button className="btn-outline btn-md">
                <Mail className="w-4 h-4" />
                Email ({selectedCarts.length})
              </button>
              <button className="btn-outline btn-md">
                <MessageSquare className="w-4 h-4" />
                SMS ({selectedCarts.length})
              </button>
            </div>
          )}
        </div>

        {/* Carts List */}
        <div className="space-y-4">
          {filteredCarts.map((cart) => (
            <div key={cart.id} className="card p-4">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                {cart.status !== 'RECOVERED' && cart.status !== 'EXPIRED' && (
                  <input
                    type="checkbox"
                    checked={selectedCarts.includes(cart.id)}
                    onChange={() => toggleSelectCart(cart.id)}
                    className="w-4 h-4 mt-1 text-primary-600 rounded"
                  />
                )}

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <Link href={`/customers/${cart.customer.id}`} className="font-semibold text-gray-900 hover:text-primary-600">
                          {cart.customer.firstName} {cart.customer.lastName}
                        </Link>
                        <span className={statusConfig[cart.status].badge}>
                          {statusConfig[cart.status].label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {cart.customer.email} • {cart.customer.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(cart.cartValue)}</p>
                      <p className="text-sm text-gray-500">{cart.itemCount} items</p>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    {cart.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">{formatCurrency(item.quantity * item.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Timeline & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Abandoned {formatRelativeTime(cart.abandonedAt)}
                      </span>
                      {cart.emailsSent > 0 && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {cart.emailsSent} email{cart.emailsSent > 1 ? 's' : ''} sent
                        </span>
                      )}
                      {cart.smsSent > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {cart.smsSent} SMS sent
                        </span>
                      )}
                      {cart.discountCode && (
                        <span className="badge badge-primary">
                          Code: {cart.discountCode}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {cart.status === 'RECOVERED' && cart.recoveredOrderId && (
                        <Link href={`/orders/${cart.recoveredOrderId}`} className="btn-success btn-sm">
                          <CheckCircle className="w-4 h-4" />
                          View Order
                        </Link>
                      )}
                      {(cart.status === 'ABANDONED' || cart.status === 'EMAIL_SENT') && (
                        <>
                          <button className="btn-outline btn-sm">
                            <Mail className="w-4 h-4" />
                            Send Email
                          </button>
                          <button className="btn-outline btn-sm">
                            <MessageSquare className="w-4 h-4" />
                            Send SMS
                          </button>
                        </>
                      )}
                      <Link href={`/customers/${cart.customer.id}`} className="btn-ghost btn-sm">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recovery Automation Settings */}
        <div className="card mt-6">
          <div className="card-header">
            <h3 className="font-semibold text-gray-900">Automation Settings</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">Email #1</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Reminder email sent after 1 hour</p>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">Email #2</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Discount offer after 24 hours (10% off)</p>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium">SMS</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Final reminder after 48 hours</p>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
