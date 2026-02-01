'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Truck,
  Package,
  Download,
  MapPin,
  TrendingUp,
} from 'lucide-react'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'

// Mock data
const orders = [
  {
    id: 'TD-A1B2C3',
    orderNumber: 'TD-A1B2C3',
    customer: { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@email.com' },
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    items: [
      { name: 'Michelin Defender T+H 215/55R17', quantity: 4, price: 149.99 },
    ],
    subtotal: 599.96,
    shippingCost: 0,
    taxAmount: 48.00,
    total: 647.96,
    shippingAddress: { city: 'Los Angeles', state: 'CA', zipCode: '90001' },
    installer: { name: 'ABC Tire Shop' },
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: 'TD-D4E5F6',
    orderNumber: 'TD-D4E5F6',
    customer: { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com' },
    status: 'SHIPPED',
    paymentStatus: 'PAID',
    items: [
      { name: 'Goodyear Assurance 225/65R17', quantity: 4, price: 129.99 },
    ],
    subtotal: 519.96,
    shippingCost: 0,
    taxAmount: 41.60,
    total: 561.56,
    shippingAddress: { city: 'San Diego', state: 'CA', zipCode: '92101' },
    installer: null,
    trackingNumber: '1Z999AA10123456784',
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'TD-G7H8I9',
    orderNumber: 'TD-G7H8I9',
    customer: { id: '3', firstName: 'Mike', lastName: 'Wilson', email: 'mike@email.com' },
    status: 'PENDING',
    paymentStatus: 'PENDING',
    items: [
      { name: 'Bridgestone Turanza 235/45R18', quantity: 4, price: 189.99 },
    ],
    subtotal: 759.96,
    shippingCost: 0,
    taxAmount: 60.80,
    total: 820.76,
    shippingAddress: { city: 'Phoenix', state: 'AZ', zipCode: '85001' },
    installer: { name: 'Quick Tire Service' },
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: 'TD-J1K2L3',
    orderNumber: 'TD-J1K2L3',
    customer: { id: '4', firstName: 'Emily', lastName: 'Brown', email: 'emily@email.com' },
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    items: [
      { name: 'Continental TrueContact 205/55R16', quantity: 4, price: 119.99 },
    ],
    subtotal: 479.96,
    shippingCost: 0,
    taxAmount: 38.40,
    total: 518.36,
    shippingAddress: { city: 'Denver', state: 'CO', zipCode: '80202' },
    installer: null,
    trackingNumber: '1Z999AA10123456785',
    createdAt: new Date(Date.now() - 432000000),
  },
  {
    id: 'TD-M4N5O6',
    orderNumber: 'TD-M4N5O6',
    customer: { id: '5', firstName: 'David', lastName: 'Lee', email: 'david@email.com' },
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    items: [
      { name: 'Pirelli P4 Four Seasons 215/60R16', quantity: 4, price: 139.99 },
    ],
    subtotal: 559.96,
    shippingCost: 0,
    taxAmount: 44.80,
    total: 604.76,
    shippingAddress: { city: 'Seattle', state: 'WA', zipCode: '98101' },
    installer: { name: 'Premium Tire Center' },
    createdAt: new Date(Date.now() - 864000000),
  },
]

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'INSTALLED', label: 'Installed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !selectedStatus || order.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Calculate summary stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    processing: orders.filter(o => o.status === 'PROCESSING').length,
    shipped: orders.filter(o => o.status === 'SHIPPED').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  }

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Orders"
        subtitle={`${orders.length} orders • ${formatCurrency(stats.revenue)} total revenue`}
      />

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-4">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-neutral-400">Total Orders</p>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 border-l-4 border-l-amber-500 p-4">
            <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
            <p className="text-sm text-neutral-400">Pending</p>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 border-l-4 border-l-blue-500 p-4">
            <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
            <p className="text-sm text-neutral-400">Processing</p>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 border-l-4 border-l-green-500 p-4">
            <p className="text-2xl font-bold text-green-400">{stats.shipped}</p>
            <p className="text-sm text-neutral-400">Shipped</p>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 border-l-4 border-l-green-500 p-4">
            <p className="text-2xl font-bold text-green-400">{formatCurrency(stats.revenue)}</p>
            <p className="text-sm text-neutral-400">Revenue</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by order #, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-800 transition-colors ${showFilters ? 'bg-neutral-800' : ''}`}
            >
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-3 border border-neutral-700 rounded-xl text-neutral-300 hover:bg-neutral-800 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link href="/orders/new" className="flex items-center gap-2 px-4 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors">
              <Plus className="w-4 h-4" />
              New Order
            </Link>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Date Range</label>
                <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white">
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Payment Status</label>
                <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white">
                  <option value="">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Has Installer</label>
                <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white">
                  <option value="">All</option>
                  <option value="yes">With Installer</option>
                  <option value="no">Ship to Customer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Order Total</label>
                <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white">
                  <option value="">Any Amount</option>
                  <option value="0-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000+">$1,000+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Destination</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/orders/${order.id}`}
                        className="font-medium text-green-400 hover:text-green-300"
                      >
                        {order.orderNumber}
                      </Link>
                      {order.trackingNumber && (
                        <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                          <Truck className="w-3 h-3" />
                          {order.trackingNumber}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/customers/${order.customer.id}`}
                        className="text-white hover:text-green-400"
                      >
                        {order.customer.firstName} {order.customer.lastName}
                      </Link>
                      <p className="text-xs text-neutral-500">{order.customer.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-sm text-neutral-300 truncate">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{formatCurrency(order.total)}</p>
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-neutral-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-neutral-300">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                          {order.installer ? (
                            <p className="text-xs text-green-400">{order.installer.name}</p>
                          ) : (
                            <p className="text-xs text-neutral-500">Direct to customer</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-300">{formatRelativeTime(order.createdAt)}</p>
                      <p className="text-xs text-neutral-500">{formatDate(order.createdAt)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              Showing <span className="font-medium text-white">{filteredOrders.length}</span> of{' '}
              <span className="font-medium text-white">{orders.length}</span> orders
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-neutral-700 rounded-lg text-neutral-400 hover:bg-neutral-800 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 border border-neutral-700 rounded-lg text-neutral-400 hover:bg-neutral-800">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    CONFIRMED: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    PROCESSING: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    SHIPPED: 'bg-green-500/20 text-green-400 border border-green-500/30',
    OUT_FOR_DELIVERY: 'bg-green-500/20 text-green-400 border border-green-500/30',
    DELIVERED: 'bg-green-500/20 text-green-400 border border-green-500/30',
    INSTALLED: 'bg-green-500/20 text-green-400 border border-green-500/30',
    COMPLETED: 'bg-green-500/20 text-green-400 border border-green-500/30',
    CANCELLED: 'bg-red-500/20 text-red-400 border border-red-500/30',
    REFUNDED: 'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[status] || 'bg-neutral-500/20 text-neutral-400'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'text-amber-400',
    AUTHORIZED: 'text-blue-400',
    PAID: 'text-green-400',
    PARTIALLY_REFUNDED: 'text-amber-400',
    REFUNDED: 'text-neutral-400',
    FAILED: 'text-red-400',
  }

  return (
    <span className={`text-xs ${styles[status] || 'text-neutral-500'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
