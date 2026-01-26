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
  MoreHorizontal,
  Calendar,
  MapPin,
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
    <div className="min-h-screen">
      <Header
        title="Orders"
        subtitle={`${orders.length} orders • ${formatCurrency(stats.revenue)} total revenue`}
      />

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
          <div className="card p-4 border-l-4 border-l-warning-500">
            <p className="text-2xl font-bold text-warning-600">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="card p-4 border-l-4 border-l-info-500">
            <p className="text-2xl font-bold text-info-600">{stats.processing}</p>
            <p className="text-sm text-gray-500">Processing</p>
          </div>
          <div className="card p-4 border-l-4 border-l-primary-500">
            <p className="text-2xl font-bold text-primary-600">{stats.shipped}</p>
            <p className="text-sm text-gray-500">Shipped</p>
          </div>
          <div className="card p-4 border-l-4 border-l-success-500">
            <p className="text-2xl font-bold text-success-600">{formatCurrency(stats.revenue)}</p>
            <p className="text-sm text-gray-500">Revenue</p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order #, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select w-40"
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-outline btn-md ${showFilters ? 'bg-gray-100' : ''}`}
            >
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="btn-outline btn-md">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link href="/orders/new" className="btn-primary btn-md">
              <Plus className="w-4 h-4" />
              New Order
            </Link>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="label">Date Range</label>
                <select className="select">
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <div>
                <label className="label">Payment Status</label>
                <select className="select">
                  <option value="">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
              <div>
                <label className="label">Has Installer</label>
                <select className="select">
                  <option value="">All</option>
                  <option value="yes">With Installer</option>
                  <option value="no">Ship to Customer</option>
                </select>
              </div>
              <div>
                <label className="label">Order Total</label>
                <select className="select">
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
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link
                        href={`/orders/${order.id}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {order.orderNumber}
                      </Link>
                      {order.trackingNumber && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Truck className="w-3 h-3" />
                          {order.trackingNumber}
                        </p>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/customers/${order.customer.id}`}
                        className="text-gray-900 hover:text-primary-600"
                      >
                        {order.customer.firstName} {order.customer.lastName}
                      </Link>
                      <p className="text-xs text-gray-500">{order.customer.email}</p>
                    </td>
                    <td>
                      <div className="max-w-xs">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-sm truncate">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td>
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td>
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                          {order.installer ? (
                            <p className="text-xs text-primary-600">{order.installer.name}</p>
                          ) : (
                            <p className="text-xs text-gray-500">Direct to customer</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-gray-900">{formatRelativeTime(order.createdAt)}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/orders/${order.id}`}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/orders/${order.id}/edit`}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        {(order.status === 'PROCESSING' || order.status === 'CONFIRMED') && (
                          <button
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                            title="Ship Order"
                          >
                            <Package className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredOrders.length}</span> of{' '}
              <span className="font-medium">{orders.length}</span> orders
            </p>
            <div className="flex gap-2">
              <button className="btn-outline btn-sm" disabled>
                Previous
              </button>
              <button className="btn-outline btn-sm">
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

function PaymentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'text-warning-600',
    AUTHORIZED: 'text-info-600',
    PAID: 'text-success-600',
    PARTIALLY_REFUNDED: 'text-warning-600',
    REFUNDED: 'text-gray-600',
    FAILED: 'text-danger-600',
  }

  return (
    <span className={`text-xs ${styles[status] || 'text-gray-500'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
