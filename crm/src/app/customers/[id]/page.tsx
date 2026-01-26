'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Car,
  ShoppingCart,
  Gift,
  Edit,
  Trash2,
  MessageSquare,
  Plus,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Star,
  MoreHorizontal,
} from 'lucide-react'
import { formatCurrency, formatDate, formatPhone, getInitials, formatRelativeTime } from '@/lib/utils'

// Mock customer data
const customer = {
  id: '1',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@email.com',
  phone: '5551234567',
  company: 'ABC Corp',
  loyaltyTier: 'GOLD',
  loyaltyPoints: 2450,
  totalSpent: 3567.89,
  marketingOptIn: true,
  smsOptIn: true,
  source: 'Google Ads',
  notes: 'Prefers morning deliveries. Fleet manager for ABC Corp.',
  tags: ['VIP', 'Fleet'],
  createdAt: '2024-03-10',
  updatedAt: '2025-01-15',
  addresses: [
    {
      id: '1',
      type: 'SHIPPING',
      isDefault: true,
      firstName: 'John',
      lastName: 'Smith',
      company: 'ABC Corp',
      street1: '123 Main Street',
      street2: 'Suite 100',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      phone: '5551234567',
    },
    {
      id: '2',
      type: 'BILLING',
      isDefault: false,
      firstName: 'John',
      lastName: 'Smith',
      company: 'ABC Corp',
      street1: '456 Business Ave',
      street2: null,
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90002',
      phone: '5551234567',
    },
  ],
  vehicles: [
    {
      id: '1',
      year: 2022,
      make: 'Toyota',
      model: 'Camry',
      trim: 'SE',
      tireSize: '215/55R17',
      nickname: 'Daily Driver',
      isPrimary: true,
    },
    {
      id: '2',
      year: 2021,
      make: 'Ford',
      model: 'F-150',
      trim: 'XLT',
      tireSize: '275/65R18',
      nickname: 'Work Truck',
      isPrimary: false,
    },
  ],
  orders: [
    {
      id: 'TD-A1B2C3',
      orderNumber: 'TD-A1B2C3',
      status: 'DELIVERED',
      total: 892.00,
      itemCount: 4,
      createdAt: '2025-01-15',
    },
    {
      id: 'TD-D4E5F6',
      orderNumber: 'TD-D4E5F6',
      status: 'SHIPPED',
      total: 1245.00,
      itemCount: 4,
      createdAt: '2025-01-10',
    },
    {
      id: 'TD-G7H8I9',
      orderNumber: 'TD-G7H8I9',
      status: 'COMPLETED',
      total: 678.89,
      itemCount: 4,
      createdAt: '2024-11-20',
    },
  ],
  communications: [
    {
      id: '1',
      type: 'EMAIL',
      subject: 'Order Confirmation',
      status: 'DELIVERED',
      sentAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      type: 'SMS',
      subject: 'Shipping Update',
      status: 'DELIVERED',
      sentAt: new Date(Date.now() - 172800000),
    },
    {
      id: '3',
      type: 'EMAIL',
      subject: 'Review Request',
      status: 'READ',
      sentAt: new Date(Date.now() - 604800000),
    },
  ],
  loyaltyHistory: [
    { id: '1', type: 'EARNED_PURCHASE', points: 89, description: 'Order TD-A1B2C3', createdAt: '2025-01-15' },
    { id: '2', type: 'EARNED_PURCHASE', points: 124, description: 'Order TD-D4E5F6', createdAt: '2025-01-10' },
    { id: '3', type: 'SPENT_REDEMPTION', points: -500, description: '$50 discount applied', createdAt: '2024-11-20' },
    { id: '4', type: 'EARNED_REVIEW', points: 50, description: 'Left product review', createdAt: '2024-11-22' },
  ],
}

const loyaltyColors: Record<string, string> = {
  BRONZE: 'bg-amber-100 text-amber-700 border-amber-200',
  SILVER: 'bg-gray-200 text-gray-700 border-gray-300',
  GOLD: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  PLATINUM: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'vehicles' | 'communications' | 'loyalty'>('overview')

  return (
    <div className="min-h-screen">
      <Header
        title={`${customer.firstName} ${customer.lastName}`}
        subtitle={customer.company || customer.email}
      />

      <div className="p-6">
        {/* Back Button */}
        <Link href="/customers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Customer Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="card p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="avatar w-16 h-16 text-xl bg-primary-100 text-primary-600">
                    {getInitials(customer.firstName, customer.lastName)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {customer.firstName} {customer.lastName}
                    </h2>
                    {customer.company && (
                      <p className="text-gray-500">{customer.company}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {customer.tags.map(tag => (
                        <span key={tag} className="badge badge-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/customers/${customer.id}/edit`} className="btn-ghost btn-sm">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button className="btn-ghost btn-sm text-danger-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${customer.email}`} className="text-primary-600 hover:underline">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${customer.phone}`} className="text-gray-900">
                    {formatPhone(customer.phone)}
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-6">
                <button className="btn-primary btn-sm flex-1">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button className="btn-outline btn-sm flex-1">
                  <MessageSquare className="w-4 h-4" />
                  SMS
                </button>
              </div>
            </div>

            {/* Loyalty Card */}
            <div className={`card p-6 border-2 ${loyaltyColors[customer.loyaltyTier]}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  <span className="font-semibold">{customer.loyaltyTier} Member</span>
                </div>
                <Star className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {customer.loyaltyPoints.toLocaleString()}
              </div>
              <p className="text-sm opacity-75">Available Points</p>
              <div className="mt-4 pt-4 border-t border-current/20">
                <p className="text-sm">
                  Total Spent: <span className="font-semibold">{formatCurrency(customer.totalSpent)}</span>
                </p>
              </div>
            </div>

            {/* Addresses */}
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Addresses</h3>
                <button className="btn-ghost btn-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="card-body space-y-4">
                {customer.addresses.map((address) => (
                  <div key={address.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge badge-gray">{address.type}</span>
                      {address.isDefault && (
                        <span className="text-xs text-primary-600 font-medium">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900">
                      {address.firstName} {address.lastName}
                    </p>
                    {address.company && (
                      <p className="text-sm text-gray-600">{address.company}</p>
                    )}
                    <p className="text-sm text-gray-600">{address.street1}</p>
                    {address.street2 && (
                      <p className="text-sm text-gray-600">{address.street2}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {customer.notes && (
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                <p className="text-sm text-gray-600">{customer.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="tabs mb-6">
              {(['overview', 'orders', 'vehicles', 'communications', 'loyalty'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="card p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{customer.orders.length}</p>
                        <p className="text-xs text-gray-500">Total Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="card p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{formatCurrency(customer.totalSpent)}</p>
                        <p className="text-xs text-gray-500">Total Spent</p>
                      </div>
                    </div>
                  </div>
                  <div className="card p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{customer.vehicles.length}</p>
                        <p className="text-xs text-gray-500">Vehicles</p>
                      </div>
                    </div>
                  </div>
                  <div className="card p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Gift className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{customer.loyaltyPoints}</p>
                        <p className="text-xs text-gray-500">Points</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                  <div className="card-header flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                    <Link href={`/orders?customer=${customer.id}`} className="text-sm text-primary-600 hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.orders.slice(0, 5).map((order) => (
                          <tr key={order.id}>
                            <td>
                              <Link href={`/orders/${order.id}`} className="font-medium text-primary-600 hover:underline">
                                {order.orderNumber}
                              </Link>
                            </td>
                            <td>{order.itemCount} tires</td>
                            <td className="font-medium">{formatCurrency(order.total)}</td>
                            <td>
                              <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="text-gray-500">{formatDate(order.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Vehicles */}
                <div className="card">
                  <div className="card-header flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Vehicles</h3>
                    <button className="btn-ghost btn-sm">
                      <Plus className="w-4 h-4" />
                      Add Vehicle
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {customer.vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded-lg">
                                <Car className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {vehicle.year} {vehicle.make} {vehicle.model}
                                </p>
                                {vehicle.trim && (
                                  <p className="text-sm text-gray-500">{vehicle.trim}</p>
                                )}
                                {vehicle.nickname && (
                                  <p className="text-xs text-primary-600 mt-1">"{vehicle.nickname}"</p>
                                )}
                              </div>
                            </div>
                            {vehicle.isPrimary && (
                              <span className="badge badge-primary">Primary</span>
                            )}
                          </div>
                          {vehicle.tireSize && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm text-gray-600">
                                Tire Size: <span className="font-medium text-gray-900">{vehicle.tireSize}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="card">
                <div className="card-header flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Order History</h3>
                  <Link href={`/orders/new?customer=${customer.id}`} className="btn-primary btn-sm">
                    <Plus className="w-4 h-4" />
                    New Order
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <Link href={`/orders/${order.id}`} className="font-medium text-primary-600 hover:underline">
                              {order.orderNumber}
                            </Link>
                          </td>
                          <td>{order.itemCount} tires</td>
                          <td className="font-medium">{formatCurrency(order.total)}</td>
                          <td>
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="text-gray-500">{formatDate(order.createdAt)}</td>
                          <td>
                            <Link href={`/orders/${order.id}`} className="btn-ghost btn-sm">
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

            {activeTab === 'vehicles' && (
              <div className="card">
                <div className="card-header flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Vehicles</h3>
                  <button className="btn-primary btn-sm">
                    <Plus className="w-4 h-4" />
                    Add Vehicle
                  </button>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {customer.vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              <Car className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">
                                  {vehicle.year} {vehicle.make} {vehicle.model}
                                </h4>
                                {vehicle.isPrimary && (
                                  <span className="badge badge-primary">Primary</span>
                                )}
                              </div>
                              {vehicle.trim && (
                                <p className="text-sm text-gray-500">{vehicle.trim}</p>
                              )}
                              {vehicle.nickname && (
                                <p className="text-sm text-primary-600">"{vehicle.nickname}"</p>
                              )}
                              <p className="text-sm text-gray-600 mt-2">
                                Tire Size: <span className="font-medium">{vehicle.tireSize || 'Not set'}</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="btn-ghost btn-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="btn-ghost btn-sm text-danger-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'communications' && (
              <div className="card">
                <div className="card-header flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Communication History</h3>
                  <div className="flex gap-2">
                    <button className="btn-outline btn-sm">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                    <button className="btn-outline btn-sm">
                      <MessageSquare className="w-4 h-4" />
                      Send SMS
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {customer.communications.map((comm) => (
                      <div key={comm.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg ${comm.type === 'EMAIL' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {comm.type === 'EMAIL' ? (
                            <Mail className={`w-4 h-4 ${comm.type === 'EMAIL' ? 'text-blue-600' : 'text-green-600'}`} />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{comm.subject}</p>
                            <span className="badge badge-success">{comm.status}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {comm.type} • {formatRelativeTime(comm.sentAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-6">
                {/* Loyalty Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="card p-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">{customer.loyaltyPoints}</p>
                    <p className="text-sm text-gray-500">Available Points</p>
                  </div>
                  <div className="card p-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">{customer.loyaltyTier}</p>
                    <p className="text-sm text-gray-500">Current Tier</p>
                  </div>
                  <div className="card p-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                    <p className="text-sm text-gray-500">Lifetime Value</p>
                  </div>
                </div>

                {/* Points History */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="font-semibold text-gray-900">Points History</h3>
                  </div>
                  <div className="card-body">
                    <div className="space-y-3">
                      {customer.loyaltyHistory.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                          </div>
                          <span className={`text-lg font-bold ${transaction.points > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                            {transaction.points > 0 ? '+' : ''}{transaction.points}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'badge-warning',
    CONFIRMED: 'badge-info',
    PROCESSING: 'badge-info',
    SHIPPED: 'badge-primary',
    OUT_FOR_DELIVERY: 'badge-primary',
    DELIVERED: 'badge-success',
    INSTALLED: 'badge-success',
    COMPLETED: 'badge-success',
    CANCELLED: 'badge-danger',
    REFUNDED: 'badge-gray',
  }

  return (
    <span className={styles[status] || 'badge-gray'}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
