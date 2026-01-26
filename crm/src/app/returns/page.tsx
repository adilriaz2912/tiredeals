'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Search,
  Filter,
  Plus,
  Package,
  RotateCcw,
  RefreshCw,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Truck,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

type ReturnStatus = 'REQUESTED' | 'APPROVED' | 'LABEL_SENT' | 'IN_TRANSIT' | 'RECEIVED' | 'INSPECTING' | 'COMPLETED' | 'DENIED'

interface Return {
  id: string
  returnNumber: string
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  status: ReturnStatus
  type: 'RETURN' | 'EXCHANGE' | 'WARRANTY_CLAIM'
  reason: string
  items: { name: string; qty: number; price: number }[]
  totalValue: number
  refundAmount: number | null
  createdAt: Date
  updatedAt: Date
}

// Mock data
const mockReturns: Return[] = [
  {
    id: '1',
    returnNumber: 'RET-001',
    orderId: 'ord-1',
    orderNumber: 'TD-A1B2C3',
    customerName: 'John Smith',
    customerEmail: 'john@email.com',
    status: 'REQUESTED',
    type: 'RETURN',
    reason: 'Wrong tire size ordered',
    items: [{ name: 'Michelin Defender T+H 225/65R17', qty: 4, price: 149.99 }],
    totalValue: 599.96,
    refundAmount: null,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    returnNumber: 'RET-002',
    orderId: 'ord-2',
    orderNumber: 'TD-D4E5F6',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@email.com',
    status: 'IN_TRANSIT',
    type: 'EXCHANGE',
    reason: 'Defective tire - sidewall bulge',
    items: [{ name: 'Goodyear Assurance 215/55R17', qty: 1, price: 119.99 }],
    totalValue: 119.99,
    refundAmount: null,
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    id: '3',
    returnNumber: 'RET-003',
    orderId: 'ord-3',
    orderNumber: 'TD-G7H8I9',
    customerName: 'Mike Wilson',
    customerEmail: 'mike@email.com',
    status: 'COMPLETED',
    type: 'RETURN',
    reason: 'Changed mind - no longer need',
    items: [{ name: 'Bridgestone Turanza 225/60R16', qty: 2, price: 159.99 }],
    totalValue: 319.98,
    refundAmount: 287.98,
    createdAt: new Date(Date.now() - 604800000),
    updatedAt: new Date(Date.now() - 259200000),
  },
  {
    id: '4',
    returnNumber: 'RET-004',
    orderId: 'ord-4',
    orderNumber: 'TD-J1K2L3',
    customerName: 'Emily Brown',
    customerEmail: 'emily@email.com',
    status: 'INSPECTING',
    type: 'WARRANTY_CLAIM',
    reason: 'Premature tread wear',
    items: [{ name: 'Continental TrueContact 205/55R16', qty: 4, price: 129.99 }],
    totalValue: 519.96,
    refundAmount: null,
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '5',
    returnNumber: 'RET-005',
    orderId: 'ord-5',
    orderNumber: 'TD-M4N5O6',
    customerName: 'David Lee',
    customerEmail: 'david@email.com',
    status: 'DENIED',
    type: 'RETURN',
    reason: 'Tires already mounted and used',
    items: [{ name: 'Pirelli P4 Four Seasons 225/65R17', qty: 4, price: 139.99 }],
    totalValue: 559.96,
    refundAmount: 0,
    createdAt: new Date(Date.now() - 864000000),
    updatedAt: new Date(Date.now() - 691200000),
  },
]

const stats = {
  pending: 12,
  inProgress: 8,
  completed: 145,
  totalRefunded: 18650,
}

const statusConfig: Record<ReturnStatus, { label: string; color: string; icon: React.ReactNode }> = {
  REQUESTED: { label: 'Requested', color: 'badge-warning', icon: <Clock className="w-3 h-3" /> },
  APPROVED: { label: 'Approved', color: 'badge-info', icon: <CheckCircle className="w-3 h-3" /> },
  LABEL_SENT: { label: 'Label Sent', color: 'badge-info', icon: <Package className="w-3 h-3" /> },
  IN_TRANSIT: { label: 'In Transit', color: 'badge-primary', icon: <Truck className="w-3 h-3" /> },
  RECEIVED: { label: 'Received', color: 'badge-info', icon: <Package className="w-3 h-3" /> },
  INSPECTING: { label: 'Inspecting', color: 'badge-warning', icon: <AlertTriangle className="w-3 h-3" /> },
  COMPLETED: { label: 'Completed', color: 'badge-success', icon: <CheckCircle className="w-3 h-3" /> },
  DENIED: { label: 'Denied', color: 'badge-danger', icon: <XCircle className="w-3 h-3" /> },
}

const typeLabels: Record<string, { label: string; color: string }> = {
  RETURN: { label: 'Return', color: 'bg-blue-100 text-blue-700' },
  EXCHANGE: { label: 'Exchange', color: 'bg-purple-100 text-purple-700' },
  WARRANTY_CLAIM: { label: 'Warranty', color: 'bg-amber-100 text-amber-700' },
}

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredReturns = mockReturns.filter(ret => {
    const matchesSearch = ret.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ret.status === statusFilter
    const matchesType = typeFilter === 'all' || ret.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen">
      <Header
        title="Returns & Refunds"
        subtitle="Manage product returns, exchanges, and refund requests"
        actions={
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Return
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Pending Returns"
            value={stats.pending}
            icon={<Clock className="w-5 h-5" />}
            color="amber"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={<RefreshCw className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Completed (30d)"
            value={stats.completed}
            icon={<CheckCircle className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Total Refunded (30d)"
            value={formatCurrency(stats.totalRefunded)}
            icon={<DollarSign className="w-5 h-5" />}
            color="purple"
          />
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by return #, order #, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-full md:w-48"
            >
              <option value="all">All Statuses</option>
              <option value="REQUESTED">Requested</option>
              <option value="APPROVED">Approved</option>
              <option value="LABEL_SENT">Label Sent</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="RECEIVED">Received</option>
              <option value="INSPECTING">Inspecting</option>
              <option value="COMPLETED">Completed</option>
              <option value="DENIED">Denied</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input w-full md:w-40"
            >
              <option value="all">All Types</option>
              <option value="RETURN">Return</option>
              <option value="EXCHANGE">Exchange</option>
              <option value="WARRANTY_CLAIM">Warranty</option>
            </select>
          </div>
        </div>

        {/* Returns Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Return #</th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredReturns.map((ret) => (
                  <tr key={ret.id}>
                    <td>
                      <Link href={`/returns/${ret.id}`} className="font-medium text-primary-600 hover:text-primary-700">
                        {ret.returnNumber}
                      </Link>
                    </td>
                    <td>
                      <Link href={`/orders/${ret.orderId}`} className="text-gray-600 hover:text-primary-600">
                        {ret.orderNumber}
                      </Link>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{ret.customerName}</p>
                        <p className="text-sm text-gray-500">{ret.customerEmail}</p>
                      </div>
                    </td>
                    <td>
                      <span className={cn('inline-flex px-2 py-1 text-xs font-medium rounded-full', typeLabels[ret.type].color)}>
                        {typeLabels[ret.type].label}
                      </span>
                    </td>
                    <td className="max-w-xs truncate" title={ret.reason}>
                      {ret.reason}
                    </td>
                    <td className="font-medium">{formatCurrency(ret.totalValue)}</td>
                    <td>
                      <span className={cn('inline-flex items-center gap-1', statusConfig[ret.status].color)}>
                        {statusConfig[ret.status].icon}
                        {statusConfig[ret.status].label}
                      </span>
                    </td>
                    <td className="text-gray-500">{formatDate(ret.createdAt)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/returns/${ret.id}`}
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Return Policy Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PolicyCard
            icon={<RotateCcw className="w-6 h-6" />}
            title="30-Day Returns"
            description="Unmounted tires can be returned within 30 days for a full refund."
          />
          <PolicyCard
            icon={<RefreshCw className="w-6 h-6" />}
            title="Easy Exchanges"
            description="Exchange for a different size or model at no additional shipping cost."
          />
          <PolicyCard
            icon={<DollarSign className="w-6 h-6" />}
            title="Restocking Fee"
            description="10% restocking fee for returns without defects after 14 days."
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
  color: 'amber' | 'blue' | 'green' | 'purple'
}) {
  const colors = {
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
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

function PolicyCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="card p-4">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}
